import React, { useState, useEffect } from 'react';
import QuestionNavigation from './components/QuestionNavigation';
import QuestionContent from './components/QuestionContent';
import './App.css';
function App() {
  console.log("APP RENDERED");
  const [questionData, setQuestions] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(false);
  const [stopped, stopQuiz] = useState(false);


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
        //console.log("questionData Received");
      });
  }, []);

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
    stopQuiz(true);
  }

  if (questionData) {
    return (

      <div className="container">

        <QuestionContent questionNumber = {questionNumber+1}
          question = {questionData[questionNumber]}
          score={score}
          stopped={stopped}
          lastQuestion={questionData.length}
          updateResponses = {updateResponses}
           />
        <QuestionNavigation questionNumber={questionNumber + 1}
          lastQuestion={questionData.length}
          changeQuestion={changeQuestion}
          finish={finish}
          score={score}
          stopped={stopped}
        />

      </div>

    )
  }
  else {
    return ('Loading...')
  }

}

export default App;