import React from 'react';
import Answer from './Answer';
import { QContext } from '../../QContext';
function MultipleChoice() {
    console.log("MultipleChoice Question RENDERED");
    //const loadedQuestion = props.question ? props.question.answers : [];

    function getCorrectAnswers(question){
        const correctAnswers =[];
        question.answers.forEach((a)=>{
            if(a.points>0){ correctAnswers.push(a.text)}
        })
        return correctAnswers;
    }

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
                                {       qContext.stopped === 2 ?<>
                                        <p className="correct-answer">Odgovori koji se boduju: <span>{getCorrectAnswers(currentQuestion).join(', ')}</span></p>
                                        <p className="correct-answer">Broj osvojenih poena na pitanju: <span> {qContext.score.scoreArray[qContext.qNumber]}</span></p>
                                        </>
                                        : ''}
                            </>
                        )
                    })

                }

            </QContext.Consumer>
        </div>

    );
};
export default MultipleChoice;