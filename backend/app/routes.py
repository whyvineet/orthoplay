"""API routes for the Orthoplay game."""

from fastapi import APIRouter, HTTPException, Depends
from app.models import *
from app.auth_models import UserCreate, UserLogin, Token
from app.auth_utils import get_current_user
from app.services import (
    GameService,
    hash_password,
    create_access_token,
    authenticate_user,
    fake_users_db,
)

router = APIRouter()
game_service = GameService()

# ======================
# Root & Health Check
# ======================

@router.get("/")
async def root():
    return {"message": "Welcome to Orthoplay API!"}


@router.get("/health")
async def health_check():
    return {"status": "healthy", "message": "API is running"}


# ======================
# Game Routes (Secured)
# ======================

@router.post("/game/start", response_model=GameStartResponse)
async def start_game(
    request: GameStartRequest,
    user_email: str = Depends(get_current_user)
):
    """Start a new game session."""
    try:
        game_data = game_service.start_game()
        word_data = game_data["word_data"]
        length_options = game_service.generate_length_options(len(game_data["word"]))

        return GameStartResponse(
            word_id=game_data["session_id"],
            word=game_data["word"],
            description=word_data["description"],
            length_options=length_options
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to start game: {str(e)}")


@router.post("/game/guess-length", response_model=GuessLengthResponse)
async def guess_length(
    request: GuessLengthRequest,
    user_email: str = Depends(get_current_user)
):
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
async def submit_spelling(
    request: SpellingGuessRequest,
    user_email: str = Depends(get_current_user)
):
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
                "message": f"Excellent! You got it right in {session['attempts']} attempts!"
            })
        else:
            response_data["message"] = f"Keep trying! Attempt #{session['attempts']}"

        return SpellingGuessResponse(**response_data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process spelling guess: {str(e)}")


@router.post("/game/reveal-answer", response_model=RevealAnswerResponse)
async def reveal_answer(
    request: RevealAnswerRequest,
    user_email: str = Depends(get_current_user)
):
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
async def get_game_stats(
    word_id: str,
    user_email: str = Depends(get_current_user)
):
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


# ======================
# Authentication Routes
# ======================

@router.post("/auth/signup")
def signup(user: UserCreate):
    """Register a new user."""
    if user.email in fake_users_db:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_pw = hash_password(user.password)
    fake_users_db[user.email] = {"email": user.email, "password": hashed_pw}

    return {"message": "User created successfully"}


@router.post("/auth/login", response_model=Token)
def login(user: UserLogin):
    """Authenticate a user and return a JWT token."""
    authenticate_user(user.email, user.password)
    token = create_access_token(data={"sub": user.email})
    return {
        "access_token": token,
        "token_type": "bearer",
        "message": "Login successful"
    }
