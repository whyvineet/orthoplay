"""API routes for the Orthoplay game."""

from fastapi import APIRouter, HTTPException
from app.models import *
from app.services import GameService

router = APIRouter()
game_service = GameService()

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
        game_data = game_service.start_game()
        word_data = game_data["word_data"]
        
        length_options = game_service.generate_length_options(len(game_data["word"]))
        # print("--------------------------------")
        # print(word_data)
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
