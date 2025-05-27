import { useEffect, useState, useRef } from 'react';

const QuestionTimeOut = ({ time, onTimeout, currentQuestion }) => {
  const [remainingTime, setRemainingTime] = useState(time);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Reset timer when currentQuestion changes
    setRemainingTime(time);

    // Clear previous timer
    clearInterval(intervalRef.current);

    // Start new timer
    intervalRef.current = setInterval(() => {
      console.log('running');
      setRemainingTime(prev => {
        if (prev <= 1000) {
          clearInterval(intervalRef.current);
          onTimeout();
          return 0;
        }

        return prev - 1000;
      });
    }, 1000);

    // Cleanup when component unmounts or currentQuestion changes
    return () => clearInterval(intervalRef.current);
  }, [currentQuestion, time, onTimeout]);

  return (
    <progress
      id="question-time"
      max={time}
      value={remainingTime}
      className="w-full"
    />
  );
};

export default QuestionTimeOut;
