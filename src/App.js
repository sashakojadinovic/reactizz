
import React, { useState, useEffect } from 'react';
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Question from './components/Question';
import './App.css';
function App() {

  const [questionData, setQuestions] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(false);

  function updateResponses(questionResponse) {
    const updatedQuestionData = questionData.map((question, index) => {
      return questionNumber !== index ? question : {
        ...question, answers: question.answers.map((answer, i) => {
          return i === questionResponse ? { ...answer, answered: answer.answered ? false : true } : answer;

        })
      };
    });

    setQuestions(updatedQuestionData);
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
  function finish() {
    let score = 0;
    questionData.forEach(element => {
      element.answers.forEach((answer) => {
        if (answer.answered === true && answer.points) {
          score += answer.points;
          //console.log(score)
        }
      })

    });
    setScore(score);
    console.log(score);

  }
  if (questionData) {
    return (
      <SwitchTransition>
        <CSSTransition key={questionNumber} timeout={333} classNames="fade" >



          <div className="container">
            <Question question={questionData[questionNumber]}
              changeQuestion={changeQuestion}
              updateResponses={updateResponses}
              score={score}
              finish={finish} />

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