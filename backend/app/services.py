"""Business logic and services for the Orthoplay API."""

import json
import os
import random
from typing import Dict, List


class WordService:
    """Service for managing word data."""
    
    def __init__(self):
        self.words = self._load_words()
    
    def _load_words(self) -> Dict:
        """Load words from JSON file."""
        words_file = os.path.join(os.path.dirname(__file__), "..", "data", "words.json")
        with open(words_file, 'r') as f:
            return json.load(f)
    
    def get_random_word(self) -> str:
        """Get a random word from the database."""
        return random.choice(list(self.words.keys()))
    
    def get_word_data(self, word: str) -> Dict:
        """Get word data including description and sentence."""
        return self.words.get(word, {})

    def get_random_word_by_difficulty(self, difficulty):
        filtered = [word for word, data in self.words.items() if data.get('difficulty') == difficulty]
        if not filtered:
            raise Exception(f"No words found for difficulty: {difficulty}")
        return random.choice(filtered)


class GameService:
    """Service for game logic."""
    
    def __init__(self):
        self.word_service = WordService()
        self.game_sessions = {}
    
    def start_game(self, difficulty='medium'):
        """Start a new game session."""
        word = self.word_service.get_random_word_by_difficulty(difficulty)
        session_id = f"game_{random.randint(1000, 9999)}"
        
        self.game_sessions[session_id] = {
            "word": word,
            "attempts": 0,
            "completed": False
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
