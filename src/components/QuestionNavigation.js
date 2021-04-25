import { ArrowLeftCircleFill, ArrowRightCircleFill, ArrowCounterclockwise } from 'react-bootstrap-icons';
import React, { useState } from 'react';
import Clock from './Clock';
import Results from './Results.js'
import Modal from './Modal';
import {QContext} from '../QContext';
//import Swipe from './Swipe';
function QuestionNavigation(props) {
    const qContext = React.useContext(QContext);
    const [modal, showModal] = useState(false);
    const [finalScore, setFinalScore] = useState(null);

    function finishQuiz(confirm){
        qContext.stopQuiz(0);
        showModal(false);
        if(!confirm){
            return;
        }
        let score = 0;
        qContext.questions.forEach(question =>{
            if(question.type==="multipleChoice"){
                question.answers.forEach(answer=>{
                if(answer.answered && answer.points){
                    score += answer.points;
                }
            })
            }
            else if(question.type==="shortAnswer"){
                question.answers.forEach(answer=>{
                    if(question.answered===answer){
                        score += question.points;
                    }
                })
            }
            else if(question.type ==="trueOrFalse"){
                if(question.answered===question.answer){
                    score+=question.points;
                }
                else {
                    score =question.wrong_answer_points;
                }
            }
            
        });
        setFinalScore(score);
        qContext.stopQuiz(2);

    }
    function restartQuiz(confirm){
        if(!confirm){
            qContext.stopQuiz(2);
            showModal(false);
        }
        else{
            console.log("Quiz is restarted");
            setFinalScore(null);
            showModal(false);
            qContext.stopQuiz(0);
            resetQuestionsToDefault();
        }
    }
    function resetQuestionsToDefault(){ //Delete answers
       const updatedQuestionData = qContext.questions.map((q=>{
           if(q.type==="trueOrFalse" || q.type==="shortAnswer"){
               return ({...q, answered:null});
           }
           else if(q.type==="multipleChoice"){

               const updatedAnswers= q.answers.map((a=>{
                return ({...a, answered:false});
               }));
               return ({...q, answers:updatedAnswers});

           }
           else {
               return q;
           }
           
       }));
       qContext.setQuestions(updatedQuestionData);
       console.log(updatedQuestionData);
    }
    function confirmationDialog(){
        if(qContext.stopped===0){ //Quiz in progress
           // showModal(true); 
            //qContext.stopQuiz(1);
            return [finishQuiz,'Da li želiš da završiš test i pošalješ svoje odgovore?'];
        }
        else if(qContext.stopped===2){ //Quiz ended and result is displayed

            return [restartQuiz, 'Da li želiš da završiš pregled rezltata i igraš ponovo?'];
        }
        else {
            return 0;
        }
      }
 
    
    if(qContext.questions){
        return (
        
            <div className="row question-nav">

                {qContext.stopped===2?<Results score={finalScore} />:''}
                {modal? <Modal fn={confirmationDialog()[0]} message={confirmationDialog()[1]} /> : ''}
    
                <button disabled={qContext.qNumber < 1} onClick={() => qContext.setqNumber(qContext.qNumber-1)}
                    className="btn nav-btn block"><ArrowLeftCircleFill className="question-nav-icon" /></button>
               
                <button  onClick={()=>showModal(true)} className={`btn finish-btn ${finalScore ? "green score-btn" : "yellow"}`} >
                    {finalScore!==null ? <ArrowCounterclockwise className="reload" /> : <Clock stopped={qContext.stopped} />}
                </button>
                <button disabled={qContext.qNumber+1 >=qContext.questions.length} onClick={() => qContext.setqNumber(qContext.qNumber+1)} className="btn nav-btn block"> <ArrowRightCircleFill className="question-nav-icon" /></button>
            </div>
        );
    }
    else {
        return('Loading...');
    }   
};
export default QuestionNavigation;
