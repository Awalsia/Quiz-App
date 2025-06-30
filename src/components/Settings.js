import React, { useState, useEffect } from "react";

function Settings({ setQuizStarted, setQuestions }) {
  const [amount, setAmount] = useState(5);
  const [category, setCategory] = useState("9"); // General Knowledge
  const [difficulty, setDifficulty] = useState("easy");

  const fetchQuestions = async () => {
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
    const res = await fetch(url);
    const data = await res.json();

    const formatted = data.results.map((q) => {
      const answers = [...q.incorrect_answers];
      const rand = Math.floor(Math.random() * 4);
      answers.splice(rand, 0, q.correct_answer);

      return {
        question: q.question,
        answers,
        correct: q.correct_answer,
      };
    });

    setQuestions(formatted);
    setQuizStarted(true);
  };

  return (
    <div className="settings-container">
      <h2>Quiz Settings</h2>
      <div className="settings-form">
        <label>
          Number of Questions
          <input
            type="number"
            min="1"
            max="50"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label>
          Category
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="9">General Knowledge</option>
            <option value="18">Science: Computers</option>
            <option value="23">History</option>
            <option value="21">Sports</option>
          </select>
        </label>
        <label>
          Difficulty
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <button onClick={fetchQuestions}>Start Quiz</button>
      </div>
    </div>
  );
}

export default Settings;
