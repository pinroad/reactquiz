import React, { useState } from 'react';
import { fetchQuizQuestions } from "./API"
// Components
import QuizCard from "./components/QuizCard"
// Types
import { QuestionsState, Difficulty } from "./API";


type answerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<answerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions)

  const startTrivia = async () =>{
    setLoading(true);
    setGameOver(false);

    const newQuestion = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestion);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //users answer
      const answer = e.currentTarget.value;
      // check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add scroe if answer is correct
      if(correct) setScore(prev => prev + 1);
      // save answer in the array 
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers(prev => [...prev, answerObject])
    }
  }
  
  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQuestion = number + 1;

    if(nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }

  return (
    <div className="App">
      <h1>React Quiz</h1>
      { gameOver || userAnswers.length === TOTAL_QUESTIONS ?
      (     <button className="start" onClick={startTrivia}>
        start
      </button>
      ) : null }
      {!gameOver ?       <p className="score">Score:</p> : null}
      {loading?       <p>Loading Questions...</p> : null}
      {!loading && !gameOver && (
        <QuizCard 
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answer}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
        />
      )}
      {!gameOver && !loading && userAnswers.length === number +1 
      && number !== TOTAL_QUESTIONS -1 ? (
        <button className="next" onClick={nextQuestion}>
        Next
        </button>
      ) : null}
    </div>
  );
}

export default App;
