function Answer(props){
    function answerChanged(){
        props.updateResponses(props.id);
    }
    return (
        <div className="col2">
            <button onClick={answerChanged} className={`btn answer-btn block ${props.question.answered?"answer-selected":""}  animate`}>{props.question.text}</button>
        </div>
    );
};

export default Answer;
