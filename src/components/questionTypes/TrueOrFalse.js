import React from 'react';
import { QContext } from '../../QContext';
function TrueOrFalse() {
    function updateResponse(response, qContext) {
        const updatedQuestionData = qContext.questions.map((question, index) => {
            return qContext.qNumber !== index ? question : { ...question, answered: question.answered===response?null:response};
        });
        qContext.setQuestions(updatedQuestionData);

    }
    function switchButtons(question, button) {
        if (question.answered !== null) {
            if (button === true) {
                return (question.answered ? 'yellow-border' : '');
            }
            else {
                return (question.answered ? '' : 'yellow-border');
            }
        }
        else {
            return '';
        }
    }
    function getCorrectAnswerClass(correct, qContext) {
        if (qContext.stopped===2) {
            return (correct === qContext.questions[qContext.qNumber].answer?'green':'red');
        }
        else {
            return null;
        }

    }
    return (
        <div className="question-container">
            <div>
                <QContext.Consumer>
                    {
                        qContext => {
                            const question = qContext.questions[qContext.qNumber];
                            return (
                                <>
                                    <h2 className="question-number center">{qContext.qNumber + 1}/{qContext.questions.length}</h2>
                                    <p className="question-text">{question.question_text}</p>
                                    <div className="row">
                                        <div className="col2">
                                            <button disabled={qContext.stopped} onClick={() => updateResponse(true, qContext)} className={`btn block true-or-false-btn ${getCorrectAnswerClass(true, qContext)} ${switchButtons(question, true)}`}>TAČNO</button>
                                        </div>
                                        <div className="col2">
                                            <button disabled={qContext.stopped} onClick={() => updateResponse(false, qContext)} className={`btn block true-or-false-btn  ${getCorrectAnswerClass(false, qContext)} ${switchButtons(question, false)}`} >NETAČNO</button>
                                        </div>

                                    </div>
                                </>
                            )
                        }
                    }

                </QContext.Consumer>
            </div>
        </div>
    );
}

export default TrueOrFalse;
