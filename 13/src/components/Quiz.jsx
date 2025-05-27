import { useState } from 'react';
import QUESTIONS from '../questions';
import { shuffle } from '../lib/shuffle';
import quizCompleteImg from '../assets/quiz-complete.png';
import QuestionTimeOut from './QuestionTimeOut';

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false); // ✅ new

  const shuffledAnswer = shuffle([...QUESTIONS[currentQuestion].answers]);
  const isQuizComplete = userAnswer.length === QUESTIONS.length;

  function handleAnswer(selectedAnswer) {
    if (isAnswered) return; // prevent double clicks
    setIsAnswered(true); // ✅ mark as answered
    setUserAnswer(prev => [...prev, selectedAnswer]);

    setTimeout(() => {
      setCurrentQuestion(prev => prev + 1);
      setIsAnswered(false); // reset for next question
    }, 300); // small delay to show feedback if needed
  }

  function handleTimeout() {
    if (isAnswered) return; // ✅ prevent duplicate increment
    setIsAnswered(true); // mark as handled
    setUserAnswer(prev => [...prev, null]); // treat as no answer
    setCurrentQuestion(prev => prev + 1);
    setIsAnswered(false); // reset on next render
  }

  if (isQuizComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimeOut
          time={7000}
          onTimeout={handleTimeout}
          currentQuestion={currentQuestion}
        />
        <h2>{QUESTIONS[currentQuestion].text}</h2>
        <ul id="answers">
          {shuffledAnswer.map(ans => (
            <li key={ans} className="answer">
              <button onClick={() => handleAnswer(ans)} disabled={isAnswered}>
                {ans}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
