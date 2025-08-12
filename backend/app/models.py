"""Pydantic models for the Orthoplay API."""

from pydantic import BaseModel, Field, validator
from typing import List, Optional
from datetime import datetime


class GameStartRequest(BaseModel):
    difficulty: Optional[str] = "medium"
    mode: Optional[str] = "playing"


class GameStartResponse(BaseModel):
    word_id: str
    word: str
    description: str
    length_options: List[int]
    hint1: str
    hint2: str
    hint3: str


class GuessLengthRequest(BaseModel):
    word_id: str
    guessed_length: int


class GuessLengthResponse(BaseModel):
    is_correct: bool
    word_length: Optional[int] = None
    placeholders: Optional[List[str]] = None
    message: str


class SpellingGuessRequest(BaseModel):
    word_id: str
    guess: str


class SpellingGuessResponse(BaseModel):
    feedback: List[str]
    is_correct: bool
    correct_word: Optional[str] = None
    example_sentence: Optional[str] = None
    word_length: int
    message: str


class RevealAnswerRequest(BaseModel):
    word_id: str


class RevealAnswerResponse(BaseModel):
    correct_word: str
    example_sentence: str
    message: str


# Leaderboard Models
class LeaderboardEntry(BaseModel):
    username: str = Field(..., min_length=3, max_length=20)
    word: str
    score: int = Field(..., ge=0)
    attempts: int = Field(..., ge=1)
    hints_used: int = Field(..., ge=0, le=3)
    completion_time: float = Field(..., gt=0)
    timestamp: datetime
    word_length: int = Field(..., ge=3)

    @validator('username')
    def validate_username(cls, v):
        if not v.replace('_', '').isalnum():
            raise ValueError('Username must contain only letters, numbers, and underscores')
        return v.lower()


class SubmitScoreRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=20)
    word_id: str
    completion_time: float = Field(..., gt=0)

    @validator('username')
    def validate_username(cls, v):
        if not v.replace('_', '').isalnum():
            raise ValueError('Username must contain only letters, numbers, and underscores')
        return v.lower()


class SubmitScoreResponse(BaseModel):
    success: bool
    score: int
    rank: Optional[int] = None
    message: str


class LeaderboardResponse(BaseModel):
    entries: List[LeaderboardEntry]
    total_entries: int
    user_rank: Optional[int] = None
    user_best_score: Optional[int] = None


class UserStatsResponse(BaseModel):
    username: str
    total_games: int
    best_score: int
    average_score: float
    total_words_completed: int
    average_attempts: float
    average_completion_time: float
