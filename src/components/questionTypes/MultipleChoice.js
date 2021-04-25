import React from 'react';
import Answer from './Answer';
import { QContext } from '../../QContext';
function MultipleChoice() {
    console.log("MultipleChoice Question RENDERED");
    //const loadedQuestion = props.question ? props.question.answers : [];



    return (
        <div className="question-container">
            <QContext.Consumer>
                {
                    (qContext => {
                        const currentQuestion = qContext.questions[qContext.qNumber];
                        return (
                            <>
                                <div>
                                    <h2 className="question-number center">{qContext.qNumber + 1}/{qContext.questions.length}</h2>
                                    <p className="question-text">{currentQuestion.question_text}</p>
                                </div>
                                <div className="row">
                                    {currentQuestion.answers.map((a, index) => <Answer
                                        answer={a}
                                        key={index}
                                        id={index}
                                    />)}
                                </div>
                            </>
                        )
                    })

                }

            </QContext.Consumer>
        </div>

    );
};
export default MultipleChoice;