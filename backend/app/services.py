"""Business logic and services for the Orthoplay API."""

import json
import os
import random
import time
from typing import Dict, List
from datetime import datetime


class WordService:
    """Service for managing word data."""
    
    def __init__(self):
        self.words = self._load_words()
    
    def _load_words(self) -> Dict:
        """Load words from JSON file."""
        words_file = os.path.join(os.path.dirname(__file__), "..", "data", "words_with_hint.json")
        with open(words_file, 'r') as f:
            return json.load(f)
    
    def get_random_word(self) -> str:
        """Get a random word from the database."""
        return random.choice(list(self.words.keys()))
    
    def get_word_data(self, word: str) -> Dict:
        """Get word data including description and sentence."""
        return self.words.get(word, {})


class GameService:
    """Service for game logic."""

    def __init__(self):
        self.word_service = WordService()
        self.game_sessions = {}

    def start_game(self, mode="playing") -> Dict:
        """Start a new game session."""
        word = self.word_service.get_random_word()
        session_id = f"game_{random.randint(1000, 9999)}"

        if mode == "playing":
            self.game_sessions[session_id] = {
                "word": word,
                "attempts": 0,
                "completed": False,
                "hints_used": 0,
                "start_time": time.time()
            }

        return {
            "session_id": session_id,
            "word": word,
            "word_data": self.word_service.get_word_data(word)
        }
    
    def get_session(self, session_id: str) -> Dict:
        """Get game session data."""
        return self.game_sessions.get(session_id)
    
    def update_session(self, session_id: str, data: Dict):
        """Update game session data."""
        if session_id in self.game_sessions:
            self.game_sessions[session_id].update(data)
    
    def generate_length_options(self, correct_length: int) -> List[int]:
        """Generate multiple choice options for word length."""
        options = [correct_length]
        
        while len(options) < 3:
            option = random.randint(3, 10)
            if option not in options:
                options.append(option)
        
        return sorted(options)
    
    def get_feedback(self, guess: str, correct_word: str) -> List[str]:
        """Generate Wordle-style feedback."""
        guess = guess.lower().strip()
        correct_word = correct_word.lower()
        
        if len(guess) != len(correct_word):
            return ["⬛"] * len(correct_word)
        
        feedback = []
        correct_letters = list(correct_word)
        
        # First pass: mark correct positions
        for i, letter in enumerate(guess):
            if letter == correct_word[i]:
                feedback.append("🟩")
                correct_letters[i] = None
            else:
                feedback.append("⬛")
        
        # Second pass: mark wrong positions
        for i, letter in enumerate(guess):
            if feedback[i] == "⬛":
                if letter in correct_letters:
                    feedback[i] = "🟨"
                    correct_letters[correct_letters.index(letter)] = None
        
        return feedback

    def calculate_score(self, attempts: int, hints_used: int, completion_time: float, word_length: int) -> int:
        """Calculate score based on game performance."""
        # Base score
        base_score = 1000

        # Word length bonus (longer words are harder)
        length_bonus = (word_length - 3) * 50  # 50 points per letter above 3

        # Attempt penalty (first attempt is free)
        attempt_penalty = max(0, (attempts - 1) * 50)

        # Hint penalty
        hint_penalty = hints_used * 100

        # Time bonus (bonus for completing under 60 seconds)
        time_bonus = 0
        if completion_time <= 60:
            time_bonus = int((60 - completion_time) * 10)  # 10 points per second under 60

        # Calculate final score
        final_score = base_score + length_bonus + time_bonus - attempt_penalty - hint_penalty

        # Ensure minimum score of 100
        return max(100, final_score)

    def get_game_completion_data(self, session_id: str) -> Dict:
        """Get completion data for score calculation."""
        session = self.get_session(session_id)
        if not session:
            return {}

        completion_time = time.time() - session["start_time"]
        word_length = len(session["word"])

        return {
            "word": session["word"],
            "attempts": session["attempts"],
            "hints_used": session["hints_used"],
            "completion_time": completion_time,
            "word_length": word_length,
            "score": self.calculate_score(
                session["attempts"],
                session["hints_used"],
                completion_time,
                word_length
            )
        }
