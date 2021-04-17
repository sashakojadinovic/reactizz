import React from 'react';
import MultipleChoice from './MultipleChoice';
import ShortAnswer from './ShortAnswer';
import { SwitchTransition, CSSTransition } from "react-transition-group";
function QuestionContent(props) {
    return (
        <SwitchTransition>
            <CSSTransition key={props.questionNumber} timeout={250} classNames="fade" >
        
            {props.question.type==="multipleChoice"? 
            <MultipleChoice question={props.question}
              questionNumber = {props.questionNumber}
              lastQuestion ={props.lastQuestion}
              updateResponses={props.updateResponses}
              score={props.score}
              stopped = {props.stopped}              
              />:<ShortAnswer question={props.question}
              questionNumber = {props.questionNumber}
              lastQuestion ={props.lastQuestion} /> }  
            </CSSTransition>
        </SwitchTransition>
    );
}

export default QuestionContent;
