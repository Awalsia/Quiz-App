import React, { useState, useEffect, useRef } from "react";
import QuestionCard from "./QuestionCard";


function Quiz({ questions, setScore, setShowResult }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [timer, setTimer] = useState(15);
  const TIMER_DURATION = 15;

  const [animateQuestion, setAnimateQuestion] = useState(false);
  const alarmRef = useRef(null);
  const hasPlayedRef = useRef(false); // per evitare loop

  useEffect(() => {
    setAnimateQuestion(true);
    const timeout = setTimeout(() => setAnimateQuestion(false), 500);
    return () => clearTimeout(timeout);
  }, [currentQ]);

  const handleAnswer = (correct) => {
    if (correct) setScore((prev) => prev + 1);

    const next = currentQ + 1;
    if (next < questions.length) {
      setCurrentQ(next);
      setTimer(TIMER_DURATION);
      hasPlayedRef.current = false;
      if (alarmRef.current) alarmRef.current.pause();
    } else {
      setShowResult(true);
    }
  };

  useEffect(() => {
    alarmRef.current = new Audio("/alarm.mp3");

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          if (alarmRef.current) alarmRef.current.pause();
          handleAnswer(null);
          clearInterval(countdown);
          return TIMER_DURATION;
        }

        // Play sound at 5s
        if (prev === 5 && !hasPlayedRef.current) {
          alarmRef.current.play();
          hasPlayedRef.current = true;
        }

        // Stop sound below 2s
        if (prev === 1 && hasPlayedRef.current) {
          alarmRef.current.pause();
          alarmRef.current.currentTime = 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentQ]);

  return (
    <>
      <div className={`question-wrapper ${animateQuestion ? "animate" : ""}`}>
        <QuestionCard
          question={questions[currentQ]}
          onAnswer={handleAnswer}
          questionIndex={currentQ}
          totalQuestions={questions.length}
        />
      </div>

      <div className={`timer-container ${timer <= 3 ? "blink" : ""}`}>
        <div
          className={`timer-bar ${
            timer > 9 ? "green" : timer > 4 ? "yellow" : "red"
          }`}
          style={{ width: `${(timer / TIMER_DURATION) * 100}%` }}
        ></div>
        <span className="timer-text">{timer}s</span>
      </div>
    </>
  );
}

export default Quiz;
