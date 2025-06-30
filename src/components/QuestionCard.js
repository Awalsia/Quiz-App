import React from "react";

function QuestionCard({ question, onAnswer, questionIndex, totalQuestions }) {
  const decode = (str) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  };

  return (
    <div className="question-card">
      <h3>
        Question {questionIndex + 1} of {totalQuestions}
      </h3>
      <p>{decode(question.question)}</p>
      <div className="options">
        {question.answers.map((a, i) => (
          <button key={i} onClick={() => onAnswer(a === question.correct)}>
            {decode(a)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
