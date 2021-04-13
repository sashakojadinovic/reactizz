import Answer from './Answer';
import { SwitchTransition, CSSTransition } from "react-transition-group";
function Question(props) {
    console.log("Question RENDERED");
    const loadedQuestion = props.question ? props.question.answers : [];

    

    return (
        <SwitchTransition>
            <CSSTransition key={props.questionNumber} timeout={250} classNames="fade" >
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
                        />)}
                    </div>
                </div>
            </CSSTransition>
        </SwitchTransition>
    );
};
export default Question;