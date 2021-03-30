import Answer from './Answer';
function Question(props) {
    const loadedQuestion = props.question ? props.question.answers : [];
    return (

        <div>
            <div>
                <p className="question-text">{props.question.question_text}</p></div>

            <div className="row">
                {loadedQuestion.map((q, index) => <Answer id={index} question={q} updateResponses={props.updateResponses} key={index} />)}


            </div>
            <div className="row question-nav">
                <button onClick={() => props.changeQuestion(-1)}
                    className="btn nav-btn block">Previous</button><button onClick={() => props.changeQuestion(1)} className="btn nav-btn block">Next</button>
            </div>

        </div>



    );
};
export default Question;