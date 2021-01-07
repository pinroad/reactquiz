import React from 'react';
//Types
import { answerObject } from "../App"
import { Wrapper, ButtonWrapper} from "./QuizCard.styles"

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: answerObject | undefined;
  questionNr : number;
  totalQuestions: number;
}

const QuizCard: React.FC<Props> = ({ 
  question, answers, callback, userAnswer, questionNr, totalQuestions
}) => (
    <Wrapper>
      {console.log("QUIZ", answers)}
     <p className="number">
       Question : {questionNr} / {totalQuestions}
     </p>
     <p dangerouslySetInnerHTML={{ __html: question }} />
     <div>
      {answers.map(answer => (
        <ButtonWrapper 
          key={answer}
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}
        >
          <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </ButtonWrapper>
      ))}
     </div>
    </Wrapper>
  );


export default QuizCard;