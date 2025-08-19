import QUESTIONS from "../../questions";
import { useEffect, useState } from "react";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState(null); // 'anwered', 'timeout'
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  // Она принимает ответ и меняет состояние на все ответы + новые ответы,, когда выбираем ответ - записывается в state
  function handleSelectAnswer(selectedAnswer) {
    setAnswerState("answered");
    sessionStorageelectedAnswer(selectedAnswer);

    //задержка перед переходом к след.вопросу
    setTimeout(() => {
      setUserAnswers((prev) => [...prev, answer]); //отправляем ответ в список ответов
      setAnswerState(null); //обнуляем состояние ответа
      setSelectedAnswer(null); //обнуляем сам ответ
    }, 1500);
  }

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg}></img>
        <h2>Quiz is complete</h2>
      </div>
    );
  }
  // когда время подошло к 0
  function handleTimeout() {
    setAnswerState("timeout");
    setSelectedAnswer(null);

    // Задержка перед переходом к следующему вопросу
    setTimeout(() => {
      setUserAnswers((prev) => [...prev, null]);
      setAnswerState(null);
    }, 1500);
  }

  const currentQuestion = QUESTIONS[activeQuestionIndex];
  const correctAnswer = currentQuestion.answers[0];

  useEffect(() => {
    const shuffled = [...currentQuestion.answers].sort(
      () => Math.random() - 0.5
    );
    setShuffledAnswers(shuffled);
  }, [activeQuestionIndex]);

  return (
    <div id="quiz">
      <div id="questions">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={5000}
          onTimeout={handleTimeout}
        />
        <p>{QUESTIONS[activeQuestionIndex].text}</p>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            let className = "answer";
            if (answerState && answer === correctAnswer) {
              className += " correct";
            } else if (
              answerState === "answered" &&
              answer === selectedAnswer &&
              selectedAnswer != correctAnswer
            ) {
              className += " wrong";
            }

            return (
              <li className={className}>
                <button
                  disabled={answerState !== null}
                  onClick={() => handleSelectAnswer(answer)}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
