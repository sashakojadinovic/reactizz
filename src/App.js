
import React, { useState, useEffect } from 'react';
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Question from './components/Question';
import './App.css';
function App() {

  const [questionData, setQuestions] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);

  //const [responses, setResponses] = useState([]);
  //Ne treba ti responses, ubaci u questionData info da li je odgovor selektovan ili nije

  /*   const initResponses=()=>{
      if(!questionData){
        return;
      }
      const updatedResponses = questionData.map(
        (element, index)=>{
          return null;
        }
      );
      setResponses(updatedResponses);
    } 
    const updateResponses = (questionResponse)=>{
      //console.log("Response updated with a value of " + questionResponse);
      const temp = responses.map((responseItem,index)=>{
        return questionNumber!==index? responseItem: questionResponse;
      });
      setResponses(temp);
      
    };*/
  function updateResponses(questionResponse) {
    console.log(questionData);
    const updatedQuestionData = questionData.map((question, index) => {
      return questionNumber !== index ? question : {...question, answers:question.answers.map((answer,i)=>{
        console.log("answered:" + answer.anwered);
        return i===questionResponse?{...answer, answered:answer.answered?false:true}:answer;

      })};
  });

setQuestions(updatedQuestionData);
console.log(updatedQuestionData)
  }

useEffect(() => {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      setQuestions(data);
      console.log("questionData Received");
    });
}, []);

useEffect(() => {
  console.log("questionData Updated!!!");
  //initResponses();
}, [questionData]);
function changeQuestion(step) {
  if (questionNumber + step >= 0 && questionNumber + step < questionData.length) {
    setQuestionNumber(questionNumber + step);
  }

}

if (questionData) {
  return (
    <SwitchTransition>
      <CSSTransition key={questionNumber} timeout={500} classNames="fade" >



        <div className="container">
          <Question question={questionData[questionNumber]}
            changeQuestion={changeQuestion}
            updateResponses={updateResponses} />

        </div>
      </CSSTransition>
    </SwitchTransition>
  )
}
else {
  return ('Loading...')
}

}

export default App;