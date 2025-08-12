"""API routes for the Orthoplay game."""

from fastapi import *
from app.models import *
from pydantic import BaseModel
from google.generativeai import GenerativeModel, configure

from app.services import GameService
from app.leaderboard_service import LeaderboardDataService
from datetime import datetime

router = APIRouter()
game_service = GameService()
leaderboard_service = LeaderboardDataService()

import os
import json
import time
import requests
from fastapi.responses import JSONResponse



CONTRIBUTORS_CACHE_PATH = "contributors.json"
GITHUB_REPO_API = "https://api.github.com/repos/whyvineet/orthoplay/contributors"
CACHE_DURATION_SECONDS = 3600  # 1 hour -> to sustain the cache for a max of one hour.



@router.get("/project/contributors")
def get_contributors():
    # Look for the cache file that contains stored data.
    if os.path.exists(CONTRIBUTORS_CACHE_PATH):
        with open(CONTRIBUTORS_CACHE_PATH, "r") as f:
            cached_data = json.load(f)
        
        last_fetched = cached_data.get("fetched_at", 0)
        current_time = time.time()

        # Check if cached data is fresh (not older than 1 hour)
        if current_time - last_fetched < CACHE_DURATION_SECONDS:
            return JSONResponse(content=cached_data["data"])

    # Fetch fresh data from GitHub API
    try:
        response = requests.get(GITHUB_REPO_API)
        if response.status_code != 200:
            raise Exception(f"GitHub API failed with status {response.status_code}")

        contributors = response.json()

        # Save to cache
        with open(CONTRIBUTORS_CACHE_PATH, "w") as f:
            json.dump({
                "fetched_at": time.time(),
                "data": contributors
            }, f, indent=2)

        return JSONResponse(content=contributors)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch contributors: {str(e)}")


@router.get("/")
async def root():
    return {"message": "Welcome to Orthoplay API!"}


@router.get("/health")
async def health_check():
    return {"status": "healthy", "message": "API is running"}


@router.post("/game/start", response_model=GameStartResponse)
async def start_game(request: GameStartRequest):
    """Start a new game session."""
    try:
        mode = request.mode
        game_data = game_service.start_game(mode=mode)
        word_data = game_data["word_data"]
        
        length_options = game_service.generate_length_options(len(game_data["word"]))
# Removed unnecessary commented-out debug print statements.
        return GameStartResponse(
            word_id=game_data["session_id"],
            word=game_data["word"],
            description=word_data["description"],
            hint1=word_data["hint1"],
            hint2=word_data["hint2"],
            hint3=word_data["hint3"],
            length_options=length_options
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to start game: {str(e)}")


@router.post("/game/guess-length", response_model=GuessLengthResponse)
async def guess_length(request: GuessLengthRequest):
    """Check if the guessed word length is correct."""
    try:
        session = game_service.get_session(request.word_id)
        if not session:
            raise HTTPException(status_code=404, detail="Game session not found")
        
        correct_word = session["word"]
        
        if request.guessed_length == len(correct_word):
            placeholders = ["_"] * len(correct_word)
            return GuessLengthResponse(
                is_correct=True,
                word_length=len(correct_word),
                placeholders=placeholders,
                message="Correct! Now spell the word."
            )
        else:
            return GuessLengthResponse(
                is_correct=False,
                message=f"Try again! The word is not {request.guessed_length} letters long."
            )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process length guess: {str(e)}")


@router.post("/game/submit-spelling", response_model=SpellingGuessResponse)
async def submit_spelling(request: SpellingGuessRequest):
    """Check the spelling guess and provide feedback."""
    try:
        session = game_service.get_session(request.word_id)
        if not session:
            raise HTTPException(status_code=404, detail="Game session not found")
        
        correct_word = session["word"]
        session["attempts"] += 1
        
        feedback = game_service.get_feedback(request.guess, correct_word)
        is_correct = request.guess.lower().strip() == correct_word.lower()
        
        response_data = {
            "feedback": feedback,
            "is_correct": is_correct,
            "word_length": len(correct_word),
            "message": ""
        }
        
        if is_correct:
            session["completed"] = True
            word_data = game_service.word_service.get_word_data(correct_word)
            response_data.update({
                "correct_word": correct_word,
                "example_sentence": word_data["sentence"],
                "message": f"🎉 Excellent! You got it right in {session['attempts']} attempts!"
            })
        else:
            response_data["message"] = f"Keep trying! Attempt #{session['attempts']}"
        
        return SpellingGuessResponse(**response_data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process spelling guess: {str(e)}")


@router.post("/game/reveal-answer", response_model=RevealAnswerResponse)
async def reveal_answer(request: RevealAnswerRequest):
    """Reveal the correct answer and provide example sentence."""
    try:
        session = game_service.get_session(request.word_id)
        if not session:
            raise HTTPException(status_code=404, detail="Game session not found")
        
        correct_word = session["word"]
        word_data = game_service.word_service.get_word_data(correct_word)
        
        session["completed"] = True
        
        return RevealAnswerResponse(
            correct_word=correct_word,
            example_sentence=word_data["sentence"],
            message=f"The correct word was '{correct_word}'. Better luck next time!"
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to reveal answer: {str(e)}")


@router.get("/game/stats/{word_id}")
async def get_game_stats(word_id: str):
    """Get game statistics."""
    try:
        session = game_service.get_session(word_id)
        if not session:
            raise HTTPException(status_code=404, detail="Game session not found")
        
        return {
            "attempts": session["attempts"],
            "completed": session["completed"],
            "word": session["word"] if session["completed"] else None
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get game stats: {str(e)}")

configure(api_key=os.getenv("GEMINI_API_KEY"))

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
async def chat_with_gemini(request: ChatRequest):
    try:
        model = GenerativeModel("gemini-2.0-flash")
        result = model.generate_content(request.message)
        return {"reply": result.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate response: {str(e)}")

@router.post("/game/use-hint")
async def use_hint(request: dict):
    """Track when a hint is used."""
    try:
        word_id = request.get("word_id")
        if not word_id:
            raise HTTPException(status_code=400, detail="word_id is required")

        session = game_service.get_session(word_id)
        if not session:
            raise HTTPException(status_code=404, detail="Game session not found")

        # Increment hints used
        session["hints_used"] = session.get("hints_used", 0) + 1

        return {"success": True, "hints_used": session["hints_used"]}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to track hint usage: {str(e)}")


# Leaderboard endpoints
@router.post("/leaderboard/submit", response_model=SubmitScoreResponse)
async def submit_score(request: SubmitScoreRequest):
    """Submit a score to the leaderboard."""
    try:
        # Get game session data
        session = game_service.get_session(request.word_id)
        if not session:
            raise HTTPException(status_code=404, detail="Game session not found")
        
        if session.get("mode") == "demo":
            raise HTTPException(status_code=400, detail="Demo games cannot submit scores")

        if not session.get("completed", False):
            raise HTTPException(status_code=400, detail="Game not completed yet")

        # Get completion data and calculate score
        completion_data = game_service.get_game_completion_data(request.word_id)
        if not completion_data:
            raise HTTPException(status_code=400, detail="Unable to calculate score")

        # Create leaderboard entry
        entry = LeaderboardEntry(
            username=request.username,
            word=completion_data["word"],
            score=completion_data["score"],
            attempts=completion_data["attempts"],
            hints_used=completion_data["hints_used"],
            completion_time=request.completion_time,
            timestamp=datetime.now(),
            word_length=completion_data["word_length"]
        )

        # Add to leaderboard
        success = leaderboard_service.add_entry(entry)
        if not success:
            raise HTTPException(status_code=500, detail="Failed to save score")

        # Get user rank
        rank = leaderboard_service.get_user_rank(request.username, completion_data["score"])

        return SubmitScoreResponse(
            success=True,
            score=completion_data["score"],
            rank=rank,
            message=f"Score submitted successfully! You scored {completion_data['score']} points."
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to submit score: {str(e)}")


@router.get("/leaderboard", response_model=LeaderboardResponse)
async def get_leaderboard(
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    username: Optional[str] = Query(None),
    time_filter: Optional[str] = Query("all", regex="^(daily|weekly|monthly|all)$"),
    sort_by: Optional[str] = Query("score", regex="^(score|attempts|completion_time|timestamp)$"),
    sort_order: Optional[str] = Query("desc", regex="^(asc|desc)$")
):
    """Get leaderboard entries with optional user information."""
    try:
        entries = leaderboard_service.get_leaderboard(
            limit=limit,
            offset=offset,
            time_filter=time_filter,
            sort_by=sort_by,
            sort_order=sort_order
        )
        total_entries = leaderboard_service.get_total_entries(time_filter=time_filter)

        # Convert to LeaderboardEntry objects
        leaderboard_entries = []
        for entry in entries:
            leaderboard_entries.append(LeaderboardEntry(**entry))

        # Get user-specific data if username provided
        user_rank = None
        user_best_score = None
        if username:
            user_stats = leaderboard_service.get_user_stats(username)
            if user_stats.get("total_games", 0) > 0:
                user_best_score = user_stats["best_score"]
                user_rank = leaderboard_service.get_user_rank(username, user_best_score)

        return LeaderboardResponse(
            entries=leaderboard_entries,
            total_entries=total_entries,
            user_rank=user_rank,
            user_best_score=user_best_score
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get leaderboard: {str(e)}")


@router.get("/leaderboard/user/{username}", response_model=UserStatsResponse)
async def get_user_stats(username: str):
    """Get statistics for a specific user."""
    try:
        stats = leaderboard_service.get_user_stats(username)
        if not stats:
            raise HTTPException(status_code=404, detail="User not found")

        return UserStatsResponse(**stats)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get user stats: {str(e)}")



@router.get("/app/stats")
async def get_app_stats():
    """Get application-wide statistics."""
    try:
        # Get total unique users from leaderboard
        total_entries = leaderboard_service.get_total_entries()
        unique_users = leaderboard_service.get_unique_users_count()

        # Get total words available
        word_service = GameService().word_service
        total_words = len(word_service.words)

        # Get total games played
        total_games = leaderboard_service.get_total_games()

        # Calculate community satisfaction (based on completion rate)
        completion_stats = leaderboard_service.get_completion_stats()
        community_love = completion_stats.get("satisfaction_rate", 95)

        return {
            "active_learners": unique_users,
            "words_available": total_words,
            "total_games_played": total_games,
            "community_love": community_love,
            "open_source": 100  # Always 100% as it's open source
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get app stats: {str(e)}")
