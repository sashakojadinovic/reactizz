function Answer(props){
    function answerChanged(){
        props.updateResponses(props.id);
    }
    var additionalClasses =''
    if(props.finished && props.answer.points>0){
        additionalClasses = 'green';
    }
    if(props.finished && props.answer.points<0 && props.answer.answered){
        additionalClasses += 'red';
    }
    return ( 
        <div className="col2">
            {props.finished && props.answer.points>0 && props.answer.answered?<p className="answer-points">+{props.answer.points}</p>:''}
            {props.finished && props.answer.points<0 && props.answer.answered?<p className="answer-points">{props.answer.points}</p>:''}
           
            <button onClick={answerChanged} className={`btn answer-btn block ${props.answer.answered?"answer-selected":""} ${additionalClasses} animate`}>{props.answer.text}</button>
        </div>
    );
};

export default Answer;
