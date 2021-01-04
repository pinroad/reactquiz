import React from 'react';

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNr : number;
  totalQuestions: number;
}

const QuizCard: React.FC<Props> = ({ 
  question, answers, callback, userAnswer, questionNr, totalQuestions
}) => (
    <div>
      {console.log("QUIZ", answers)}
     <p className="number">
       Question : {questionNr} / {totalQuestions}
     </p>
     <p dangerouslySetInnerHTML={{ __html: question }} />
     <div>
      {answers.map(answer => (
        <div key={answer}>
          <button disabled={userAnswer} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </div>
      ))}
     </div>
    </div>
  );


export default QuizCard;