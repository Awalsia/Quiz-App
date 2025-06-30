import React, { useState } from "react";
import Settings from "./components/Settings";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import "./App.css";
import BackgroundVideo from "./components/BackgroundVideo";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  return (
    <>
      <BackgroundVideo />
      <div className="container">
        <h1>Quiz App</h1>
        {!quizStarted && !showResult && (
          <Settings
            setQuizStarted={setQuizStarted}
            setQuestions={setQuestions}
          />
        )}
        {quizStarted && !showResult && (
          <Quiz
            questions={questions}
            setScore={setScore}
            setShowResult={setShowResult}
            setQuizStarted={setQuizStarted}
          />
        )}
        {showResult && (
          <Result
            score={score}
            total={questions.length}
            setQuizStarted={setQuizStarted}
            setShowResult={setShowResult}
            setScore={setScore}
          />
        )}
      </div>
    </>
  );
}

export default App;
