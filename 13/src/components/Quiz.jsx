import { useState } from 'react';
import QUESTIONS from '../questions';
import { shuffle } from '../lib/shuffle';
import quizCompleteImg from '../assets/quiz-complete.png';

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const shuffledAnswer = shuffle([...QUESTIONS[activeQuestion].answers]);
  const isQuizComplete = userAnswer.length === QUESTIONS.length;

  function handleAnswer(selectedAnswer) {
    setUserAnswer(prevUserAnswer => [...prevUserAnswer, selectedAnswer]);
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
        <h2>{QUESTIONS[activeQuestion].text}</h2>
        <ul id="answers">
          {shuffledAnswer.map(ans => (
            <li key={ans} className="answer">
              <button onClick={() => handleAnswer(ans)}>{ans}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
