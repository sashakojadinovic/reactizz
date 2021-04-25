import React from 'react';
import MultipleChoice from './questionTypes/MultipleChoice';
import ShortAnswer from './questionTypes/ShortAnswer';
import {QContext} from '../QContext';
import TrueOrFalse from './questionTypes/TrueOrFalse';
//import { SwitchTransition, CSSTransition } from "react-transition-group";
function QuestionContainer(props) {
    //const questions = React.useContext(QContext);
    function detectQType(question){
        if(question.type==="multipleChoice"){
            return <MultipleChoice />
        }
        else if(question.type==="shortAnswer"){
            return <ShortAnswer />
        }
        else if(question.type==="trueOrFalse"){
            return <TrueOrFalse />
        }
        
    }
    
    return (
            <QContext.Consumer>
            {qContext=>{
                if(qContext.questions){
                    return detectQType(qContext.questions[qContext.qNumber]);
                }
                else{
                    console.log('loading questions...')
                }
            }}
            </QContext.Consumer>
    );
}

export default QuestionContainer;
