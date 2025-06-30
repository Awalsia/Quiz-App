import React from "react";

function Result({ score, total, setQuizStarted, setShowResult, setScore }) {
  const restart = () => {
    setQuizStarted(false);
    setShowResult(false);
    setScore(0);
  };

  return (
    <div className="result-container">
      <h2>Quiz Completed!</h2>
      <p>You scored {score} out of {total}</p>
      <button onClick={restart}>Play Again</button>
    </div>
  );
}

export default Result;
