import {useState}  from 'react';
import Answer from './Answer';
import Modal from './Modal';
import Swipe from './Swipe';
import Clock from './Clock';
import {ArrowLeftCircleFill, ArrowRightCircleFill} from 'react-bootstrap-icons';
function Question(props) {
    console.log("Question RENDERED");
    const [modal, setModal] =  useState(false);
    const loadedQuestion = props.question ? props.question.answers : [];  

    function closeModal(confirmed){
        setModal(false);
        if(confirmed){
            props.finish();
        }
    }
    Swipe(document.querySelector('#root'), props.changeQuestion);
    return (

        <div className="question-container">
            {modal?<Modal closeModal={closeModal} message={"Da li želiš da završiš test i pošalješ svoje odgovore?"} />:''}
            <div>
                <h2 className="question-number center">{props.questionNumber}/{props.lastQuestion}</h2>
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
                <button disabled={props.questionNumber<2} onClick={() => props.changeQuestion(-1)}
                    className="btn nav-btn block"><ArrowLeftCircleFill className="question-nav-icon" /></button>
                <button onClick={()=>setModal(true)} className={`btn finish-btn ${props.score?"green score-btn":"yellow"}`} >{props.score?props.score:<Clock />}</button>
                <button disabled={props.questionNumber>props.lastQuestion-1} onClick={() => props.changeQuestion(1)} className="btn nav-btn block"> <ArrowRightCircleFill className="question-nav-icon" /></button>
            </div>

        </div>



    );
};
export default Question;