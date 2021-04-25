import React from 'react';
import { QContext } from '../../QContext';
function Answer(props) {
    const qContext = React.useContext(QContext); 
    function updateResponses(questionResponse) {
        const updatedQuestionData = qContext.questions.map((question,index)=>{
            return qContext.qNumber!==index? question: {
                ...question, answers:question.answers.map((answer, i)=>{
                    return i===questionResponse ? {...answer, answered:answer.answered?false:true}: answer;
                })
            }
        })

        qContext.setQuestions(updatedQuestionData);
    }
    let additionalClasses = '';
    if(qContext.stopped===2 && props.answer.points>0){
        additionalClasses = 'green ';
    }
    if(qContext.stopped===2 && props.answer.points<0 && props.answer.answered){
        additionalClasses += 'red ';
    }
    return (
        <div className="col2">  
            {/* Yellow border and points on game  over  */}
            {qContext.stopped===2 && props.answer.answered?<p className="answer-points">{props.answer.points>0?'+'+props.answer.points:props.answer.points}</p>:''}
            <button onClick={() => updateResponses(props.id)} disabled={qContext.stopped}
            className={`btn answer-btn block ${props.answer.answered?"answer-selected":""} ${additionalClasses} animate`}  >{props.answer.text}</button>
        </div>
    );
};

export default Answer;
