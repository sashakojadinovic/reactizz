import QuestionNavigation from './components/QuestionNavigation';
import QuestionContainer from './components/QuestionContainer';
import {QContextProvider } from './QContext';
import './App.css';
function App() {
  console.log("APP RENDERED");

  return (
    <div className="container">
      <QContextProvider>
        <QuestionContainer />
        <QuestionNavigation />
      </QContextProvider>
    </div>

  )



}

export default App;