import React from 'react';
import Answer from './Answer';
function MultipleChoice(props) {
    console.log("Question RENDERED");
    const loadedQuestion = props.question ? props.question.answers : [];



    return (
        <div className="question-container">
            <div>
                <h2 className="question-number center">{props.questionNumber}/{props.lastQuestion}</h2>
                <p className="question-text">{props.question.question_text}</p></div>

            <div className="row">
                {loadedQuestion.map((a, index) => <Answer
                    id={index}
                    answer={a}
                    updateResponses={props.updateResponses}
                    finished={props.score ? true : false}
                    key={index}
                    stopped={props.stopped}
                />)}
            </div>
        </div>

    );
};
export default MultipleChoice;