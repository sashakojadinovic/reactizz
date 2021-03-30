const Answer = (props) => {
    const answerChanged = ()=>{
        props.updateResponses(props.id);
    }
    return (
        <div className="col2">
            <button onClick={answerChanged} className={`btn answer-btn block ${props.question.correct?"answer-selected":""}  animate`}>{props.question.text}</button>
        </div>
    );
};

export default Answer;
