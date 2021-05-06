import { ArrowLeftCircleFill, ArrowRightCircleFill, ArrowCounterclockwise } from 'react-bootstrap-icons';
import React, { useState } from 'react';
import Clock from './Clock';
import Results from './Results.js'
import Modal from './Modal';
import { QContext } from '../QContext';
//import Swipe from './Swipe';
function QuestionNavigation(props) {
    const qContext = React.useContext(QContext);
    const [modal, showModal] = useState(false);

    function finishQuiz(confirm) {
        qContext.stopQuiz(0);
        showModal(false);
        if (!confirm) {
            return;
        }
        const score = {totalScore:0, scoreArray:[]};
        qContext.questions.forEach(question => {
  
            if (question.type === "multipleChoice") {
                let points=0;
                question.answers.forEach(answer => {
                    if (answer.answered && answer.points) {
                        points+=answer.points;
                    }
                });
                score.scoreArray.push(points);
            }
            else if (question.type === "shortAnswer") {
                let points=0;
                question.answers.forEach(answer => {
                    if (question.answered === answer) {
                        points+=question.points;
                    }
                })
                score.scoreArray.push(points);
            }
            else if (question.type === "trueOrFalse") { // BUG BUG BUG
                let points=0;
                if(question.answered){
                    if (question.answered === question.answer) {
                    points += question.points;
                }
                else {
                    points += question.wrong_answer_points;
                }
                }
                
                
                score.scoreArray.push(points);
            }
            else if (question.type === "ordering") {
                let points =0;
                if (question.answers.toString() === question.randomized_answers.toString()) {
                    points += question.points;
                }
                score.scoreArray.push(points)
            }

        });
        console.log(score);
        for(var i=0; i<score.scoreArray; i++){
            score.totalScore += score.scoreArray[i];
        }
        qContext.setScore(score );
        //setFinalScore(score);
        qContext.stopQuiz(2);
    }

    function restartQuiz(confirm) {
        if (!confirm) {
            qContext.stopQuiz(2);
            showModal(false);
        }
        else {
            console.log("Quiz is restarted");
            //setFinalScore(null);
            showModal(false);
            qContext.stopQuiz(0);
            resetQuestionsToDefault();
        }
    }
    function resetQuestionsToDefault() { //Delete answers
        const updatedQuestionData = qContext.questions.map((q => {
            if (q.type === "trueOrFalse" || q.type === "shortAnswer") {
                return ({ ...q, answered: null });
            }
            else if (q.type === "multipleChoice") {

                const updatedAnswers = q.answers.map((a => {
                    return ({ ...a, answered: false });
                }));
                return ({ ...q, answers: updatedAnswers });

            }
            else if(q.type==="ordering"){
                return ({...q, answered_order:[]});
            }
            else {
                return q;
            }

        }));
        qContext.setQuestions(updatedQuestionData);
        console.log(updatedQuestionData);
    }
    function confirmationDialog() {
        if (qContext.stopped === 0) { //Quiz in progress
            // showModal(true); 
            //qContext.stopQuiz(1);
            return [finishQuiz, 'Da li želiš da završiš test i pošalješ svoje odgovore?'];
        }
        else if (qContext.stopped === 2) { //Quiz ended and result is displayed

            return [restartQuiz, 'Da li želiš da završiš pregled rezltata i igraš ponovo?'];
        }
        else {
            return 0;
        }
    }


    if (qContext.questions) {
        return (

            <div className="row question-nav">
                <div className="user">{qContext.gUser.imageUrl ? <img src={qContext.gUser.imageUrl} /> : ''}<span>{qContext.gUser.name}</span></div>

                {qContext.stopped === 2 ? <Results score={qContext.score.totalScore} /> : ''}
                {modal ? <Modal fn={confirmationDialog()[0]} message={confirmationDialog()[1]} /> : ''}

                <button disabled={qContext.qNumber < 1} onClick={() => qContext.setqNumber(qContext.qNumber - 1)}
                    className="btn nav-btn block"><ArrowLeftCircleFill className="question-nav-icon" /></button>

                <button onClick={() => showModal(true)} className={`btn finish-btn ${qContext.stopped===2  ? "green score-btn" : "yellow"}`} >
                    {qContext.stopped===2 ? <ArrowCounterclockwise className="reload" /> : <Clock stopped={qContext.stopped} />}
                </button>
                <button disabled={qContext.qNumber + 1 >= qContext.questions.length} onClick={() => qContext.setqNumber(qContext.qNumber + 1)} className="btn nav-btn block"> <ArrowRightCircleFill className="question-nav-icon" /></button>
            </div>
        );
    }
    else {
        return ('Loading...');
    }
};
export default QuestionNavigation;
