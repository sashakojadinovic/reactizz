import Answer from './Answer';
import {ArrowLeftCircleFill, ArrowRightCircleFill} from 'react-bootstrap-icons';
function Question(props) {
    const loadedQuestion = props.question ? props.question.answers : [];
    return (

        <div>
            <div>
                <p className="question-text">{props.question.question_text}</p></div>

            <div className="row">
                {loadedQuestion.map((a, index) => <Answer 
                id={index} 
                answer={a} 
                updateResponses={props.updateResponses} 
                finished={props.score?true:false}
                key={index} 
                />)}


            </div>
            <div className="row question-nav">
                <button onClick={() => props.changeQuestion(-1)}
                    className="btn nav-btn block"><ArrowLeftCircleFill className="question-nav-icon" /></button>
                <button onClick={props.finish} className={`btn finish-btn ${props.score?"green score-btn":"red"}`} >{props.score?props.score:'Finish'}</button>
                <button onClick={() => props.changeQuestion(1)} className="btn nav-btn block"> <ArrowRightCircleFill className="question-nav-icon" /></button>
            </div>

        </div>



    );
};
export default Question;