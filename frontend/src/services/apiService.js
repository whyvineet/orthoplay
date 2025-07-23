const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    async makeRequest(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    async fetchContributors() {
        try {
            const response = await this.makeRequest('/project/contributors');
            return response
        } catch (error) {
            console.error('Failed to get the contributors', error);
            return {error: "Failed to fetch the contributors", response: null};
        }
    }

    async checkHealth() {
        try {
            const response = await this.makeRequest('/health');
            return response.status === 'healthy';
        } catch (error) {
            console.error('Health check failed:', error);
            return false;
        }
    }

    async startGame(difficulty = 'medium') {
        try {
            const response = await this.makeRequest('/game/start', {
                method: 'POST',
                body: JSON.stringify({ difficulty }),
            });
            return response;
        } catch (error) {
            console.error('Failed to start game:', error);
            throw new Error('Failed to start game. Please try again.');
        }
    }

    async guessLength(wordId, guessedLength) {
        try {
            const response = await this.makeRequest('/game/guess-length', {
                method: 'POST',
                body: JSON.stringify({
                    word_id: wordId,
                    guessed_length: guessedLength,
                }),
            });
            return response;
        } catch (error) {
            console.error('Failed to guess length:', error);
            throw new Error('Failed to submit length guess. Please try again.');
        }
    }

    async submitSpelling(wordId, guess) {
        try {
            const response = await this.makeRequest('/game/submit-spelling', {
                method: 'POST',
                body: JSON.stringify({
                    word_id: wordId,
                    guess: guess,
                }),
            });
            return response;
        } catch (error) {
            console.error('Failed to submit spelling:', error);
            throw new Error('Failed to submit spelling. Please try again.');
        }
    }

    async revealAnswer(wordId) {
        try {
            const response = await this.makeRequest('/game/reveal-answer', {
                method: 'POST',
                body: JSON.stringify({
                    word_id: wordId,
                }),
            });
            return response;
        } catch (error) {
            console.error('Failed to reveal answer:', error);
            throw new Error('Failed to reveal answer. Please try again.');
        }
    }
}

export const apiService = new ApiService();
