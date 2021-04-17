import React from 'react';


function ShortAnswer(props) {
    return (
        <div className="question-container">
            <div>
                <h2 className="question-number center">{props.questionNumber}/{props.lastQuestion}</h2>
                <p className="question-text">{props.question.question_text}</p>
                <div className="short-answer-input-container">
                    <label htmlFor="short-answer-input">Odgovor:</label>
                    <input id="short-answer-input" type="text" />
                </div>


            </div>
        </div>

    )
}

export default ShortAnswer
