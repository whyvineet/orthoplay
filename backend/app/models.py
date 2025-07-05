"""Pydantic models for the Orthoplay API."""

from pydantic import BaseModel
from typing import List, Optional


class GameStartRequest(BaseModel):
    difficulty: Optional[str] = "medium"


class GameStartResponse(BaseModel):
    word_id: str
    audio_data: str
    description: str
    length_options: List[int]


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
    correct_word_audio: Optional[str] = None
    word_length: int
    message: str


class RevealAnswerRequest(BaseModel):
    word_id: str


class RevealAnswerResponse(BaseModel):
    correct_word: str
    correct_word_audio: str
    example_sentence: str
    message: str
