import {useState}  from 'react';
import Answer from './Answer';
import Modal from './Modal';
import {ArrowLeftCircleFill, ArrowRightCircleFill} from 'react-bootstrap-icons';
function Question(props) {
    const [modal, setModal] =  useState(false);
    const loadedQuestion = props.question ? props.question.answers : [];
    function closeModal(confirmed){
        setModal(false);
        if(confirmed){
            props.finish();
        }
        
        

    }
    return (

        <div className="question-container">
            {modal?<Modal closeModal={closeModal} message={"Da li želiš da završiš test i pošalješ svoje odgovore?"} />:''}
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
                <button onClick={()=>setModal(true)} className={`btn finish-btn ${props.score?"green score-btn":"yellow"}`} >{props.score?props.score:'Završi'}</button>
                <button onClick={() => props.changeQuestion(1)} className="btn nav-btn block"> <ArrowRightCircleFill className="question-nav-icon" /></button>
            </div>

        </div>



    );
};
export default Question;