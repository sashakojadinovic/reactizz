import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { QContext } from '../../QContext';

function Ordering(props) {

    const qContext = React.useContext(QContext);
    const question = qContext.questions[qContext.qNumber];

    function handleDragEnd(result) {
         if (!result.destination) return;
        const items = Array.from(question.randomized_answers);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        qContext.setQuestions(qContext.questions.map((q,index)=>{
            if(index!==qContext.qNumber) return q ;
            else{
                return {...question, randomized_answers:items}
            }
        }));
    }
    return (
        <div className="question-container">
            <div>
                <QContext.Consumer>
                    {
                        qContext => {
                              return (
                                <>
                                    <h2 className="question-number center">{qContext.qNumber + 1}/{qContext.questions.length}</h2>
                                    <p className="question-text">{question.question_text}</p>
                                        <DragDropContext onDragEnd={handleDragEnd}>
                                            <Droppable droppableId="order-items">
                                                {provided => (
                                                    <ul className="row ordering-items" {...provided.droppableProps} ref={provided.innerRef} >
                                                        {question.randomized_answers.map((a, index) => (
                                                            <Draggable isDragDisabled={qContext.stopped===2?true:false} key={index.toString()} draggableId={index.toString()} index={index}>
                                                                {provided => (
                                                                    <li className=" ordering-item" {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                                                                        {a}
                                                                    </li>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </ul>
                                                )}

                                            </Droppable>

                                        </DragDropContext>
                                    {qContext.stopped === 2 ?<>
                                        <p className="correct-answer">Ispravan redosled: <span> {question.answers.join(', ')}</span></p>
                                        <p className="correct-answer">Broj osvojenih poena na pitanju: <span> {qContext.score.scoreArray[qContext.qNumber]}</span></p>
                                        </>
                                        : ''}

                                </>
                            )


                        }


                    }

                </QContext.Consumer>
            </div>
        </div>

    )
}

export default Ordering;
