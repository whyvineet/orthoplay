import { useState, useEffect, useCallback } from "react";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import CompletePage from "./pages/CompletePage";
import ErrorMessage from "./components/ErrorMessage";
import { apiService } from "./services/apiService";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContributorsPage from "./pages/ContributorsPage";
import HowToPlay from "./pages/HowToPlay";
import AboutPage from "./pages/AboutPage";

const OrthoplayGame = () => {
  const [gameState, setGameState] = useState("start"); // 'start', 'playing', 'complete'
  const [gamePhase, setGamePhase] = useState("length"); // 'length', 'spelling'
  const [isLoading, setIsLoading] = useState(false);
  const [currentGame, setCurrentGame] = useState({
    wordId: "",
    word: "",
    description: "",
    hint1: "",
    hint2: "",
    hint3: "",
    lengthOptions: [],
  });

  const [lengthFeedback, setLengthFeedback] = useState(null);
  const [currentGuess, setCurrentGuess] = useState("");
  const [spellingHistory, setSpellingHistory] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [numberOfHints, setNumberOfHints] = useState(0);
  const [lastMessage, setLastMessage] = useState("");
  const [correctWord, setCorrectWord] = useState("");
  const [exampleSentence, setExampleSentence] = useState("");
  const [isWinner, setIsWinner] = useState(false);
  const [apiStatus, setApiStatus] = useState("unknown");
  const [errorMessage, setErrorMessage] = useState("");
  const [wordLength, setWordLength] = useState(0);

  const correctAudio = new Audio("/sounds/correct.mp3");

  const checkApiStatus = useCallback(async () => {
    try {
      const status = await apiService.checkHealth();
      setApiStatus(status ? "connected" : "disconnected");
    } catch (error) {
      setApiStatus("disconnected");
      console.error("API connection failed:", error);
    }
  }, []);

  useEffect(() => {
    checkApiStatus();
  }, [checkApiStatus]);

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), 10000);
  };

  const startGame = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const data = await apiService.startGame();
      setCurrentGame({
        wordId: data.word_id,
        word: data.word,
        description: data.description,
        lengthOptions: data.length_options,
        hint1: data.hint1,
        hint2: data.hint2,
        hint3: data.hint3,
      });

      setGameState("playing");
      setGamePhase("length");
      resetGameData();
    } catch (error) {
      console.error("Error starting game:", error);
      showError(`Failed to start game: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const guessLength = async (length) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const data = await apiService.guessLength(currentGame.wordId, length);
      setLengthFeedback({
        correct: data.is_correct,
        message: data.message,
      });

      if (data.is_correct) {
        setWordLength(data.word_length);
        setGamePhase("spelling");
        setCurrentGuess("");
      }
    } catch (error) {
      console.error("Error guessing length:", error);
      showError(`Failed to guess length: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const submitSpelling = async () => {
    if (!currentGuess.trim()) {
      showError("Please enter a guess");
      return;
    }

    if (currentGuess.length !== wordLength) {
      showError(`Word must be ${wordLength} letters long`);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const data = await apiService.submitSpelling(
        currentGame.wordId,
        currentGuess
      );
      setSpellingHistory((prev) => [
        ...prev,
        {
          guess: currentGuess,
          feedback: data.feedback,
        },
      ]);

      setAttempts((prev) => prev + 1);
      setLastMessage(data.message);

      if (data.is_correct) {
        setCorrectWord(data.correct_word);
        setExampleSentence(data.example_sentence);
        setIsWinner(true);
        setGameState("complete");

        correctAudio
          .play()
          .catch((err) => console.error("Correct sound error:", err));
      }

      setCurrentGuess("");
    } catch (error) {
      console.error("Error submitting spelling:", error);
      showError(`Failed to submit spelling: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const revealAnswer = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const data = await apiService.revealAnswer(currentGame.wordId);
      setCorrectWord(data.correct_word);
      setExampleSentence(data.example_sentence);
      setIsWinner(false);
      setLastMessage(data.message);
      setGameState("complete");
    } catch (error) {
      console.error("Error revealing answer:", error);
      showError(`Failed to reveal answer: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const resetGame = () => {
    setGameState("start");
    setGamePhase("length");
    resetGameData();
    resetCurrentGame();
  };

  const resetGameData = () => {
    setLengthFeedback(null);
    setCurrentGuess("");
    setSpellingHistory([]);
    setAttempts(0);
    setLastMessage("");
    setCorrectWord("");
    setExampleSentence("");
    setIsWinner(false);
    setWordLength(0);
    setNumberOfHints(0);
  };

  const resetCurrentGame = () => {
    setCurrentGame({
      wordId: "",
      word: "",
      description: "",
      lengthOptions: [],
    });
  };

  const gameProps = {
    gameState,
    gamePhase,
    isLoading,
    currentGame,
    lengthFeedback,
    currentGuess,
    setCurrentGuess,
    spellingHistory,
    attempts,
    numberOfHints,
    lastMessage,
    correctWord,
    exampleSentence,
    isWinner,
    apiStatus,
    wordLength,
    startGame,
    guessLength,
    submitSpelling,
    revealAnswer,
    resetGame,
    setNumberOfHints,
  };

  return (
    <BrowserRouter>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}

      <Navigation apiStatus={apiStatus} />

      <main className="min-h-screen">
        <Routes>
          <Route path="/our-contributors" element={<ContributorsPage />} />
          <Route path="/how-to-play" element={<HowToPlay />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/"
            element={
              gameState === "start" ? (
                <StartPage {...gameProps} />
              ) : gameState === "playing" ? (
                <GamePage {...gameProps} />
              ) : gameState === "complete" ? (
                <CompletePage {...gameProps} />
              ) : null
            }
          />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
};

export default OrthoplayGame;
