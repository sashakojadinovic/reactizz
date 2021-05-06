import React, { useState } from 'react';
import QuestionNavigation from './components/QuestionNavigation';
import QuestionContainer from './components/QuestionContainer';
import { QContextProvider } from './QContext';
import Login from './components/Login';
import './App.css';
function App() {
  const [logged, setLogged] = useState();
  console.log("APP RENDERED");
  function logIn(isLogged, gUser) {
    if (isLogged) {
      setLogged(true);

    }

  }

  return (
    <div className="container">
      <QContextProvider>
        {logged ?
          <><QuestionContainer />
            <QuestionNavigation /></>
          : <Login login={logIn} />}
      </QContextProvider>

    </div>

  )



}

export default App;