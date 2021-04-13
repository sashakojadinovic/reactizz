import { ArrowLeftCircleFill, ArrowRightCircleFill } from 'react-bootstrap-icons';
import { useState } from 'react';
import Clock from './Clock';
import Modal from './Modal';
//import Swipe from './Swipe';

function QuestionNavigation(props) {
    const [modal, setModal] = useState(false);
    function closeModal(confirmed) {
        setModal(false);
        if (confirmed) {
            props.finish();
        }
    }
    //Swipe(document.querySelector('#root'), props.changeQuestion);
    return (
        <div className="row question-nav">
            {modal ? <Modal closeModal={closeModal} message={"Da li želiš da završiš test i pošalješ svoje odgovore?"} /> : ''}

            <button disabled={props.questionNumber < 2} onClick={() => props.changeQuestion(-1)}
                className="btn nav-btn block"><ArrowLeftCircleFill className="question-nav-icon" /></button>
            <button onClick={() => setModal(true)} className={`btn finish-btn ${props.score ? "green score-btn" : "yellow"}`} >{props.score ? props.score : <Clock stopped={props.stopped} />}</button>
            <button disabled={props.questionNumber > props.lastQuestion - 1} onClick={() => props.changeQuestion(1)} className="btn nav-btn block"> <ArrowRightCircleFill className="question-nav-icon" /></button>
        </div>
    );
};

export default QuestionNavigation;
