import React from 'react';
import { QContext } from '../../QContext';

function ShortAnswer(props) {

    const qContext = React.useContext(QContext);
    const question = qContext.questions[qContext.qNumber];
    function updateShortAnswer(e) {
        const updatedQuestionData = qContext.questions.map((q, index) => {
            if (q === question) { return ({ ...q, answered: e.target.value }) }
            else return q;
        });

        qContext.setQuestions(updatedQuestionData);
    }
/*     function getCorrectAnswers(question){
        const correctAnswers = [];
        question.answers.forEach(a => {
            if()
        });
    } */
    let additionalClasses = '';
    console.log("shortAnswer question rendered");
    if (qContext.stopped === 2) {
        additionalClasses +=' yellow-border';
        if (qContext.checkShortAnswer(qContext.qNumber)) { //answer is correct
            additionalClasses += ' green';
        }
        else {
            additionalClasses += ' red';
        }
    }
    return (
        <div className="question-container">
            <div>
                <QContext.Consumer>
                    {
                        qContext => {

                            return (
                                <>
                                    <h2 className="question-number center">{qContext.qNumber + 1}/{qContext.questions.length}</h2>
                                    <p className="question-text">{question.question_text}</p>
                                    <div className="short-answer-input-container">
                                        {qContext.stopped === 2 ? <p className="answer-points">{qContext.checkShortAnswer(qContext.qNumber)? '+' + question.points:'0'}</p> : ''}

                                        <input placeholder="Upiši svoj odgovor" onChange={updateShortAnswer} disabled={qContext.stopped}
                                            className={'short-answer-input ' + additionalClasses}
                                            value={question.answered ? question.answered : ''} type="text"
                                        />
                                    </div>
                                    {qContext.stopped === 2 ?<>
                                        <p className="correct-answer">Odgovori koji se prihvataju: <span> {question.answers.join(', ')}</span></p>
                                        <p className="correct-answer">Broj osvojenih poena na pitanju: <span> {qContext.score.scoreArray[qContext.qNumber]}</span></p>
                                        </>
                                        : ''}

                                </>
                            )


                        }


                    }

                </QContext.Consumer>
            </div>
        </div>

    )
}

export default ShortAnswer
