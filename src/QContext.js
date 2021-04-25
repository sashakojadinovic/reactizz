import React, {useState, useEffect, createContext} from 'react';

export const QContext = createContext();
export function QContextProvider(props) {
    const [questions, setQuestions] = useState(null);
    const [qNumber, setqNumber] = useState(0);
    // const [qScore, setScore] = useState(0); moved to QuestionNavigation
    const [stopped, stopQuiz] = useState(0); // 0 for active 1 for paused 2 for finished
    useEffect(() => {
        fetch('data.json')
        .then(res =>res.json())
        .then(data=>setQuestions(data));

    }, []);
    function checkShortAnswer(qNumber){
        if (stopped === 2) {
            let correct = false;
            questions[qNumber].answers.forEach((a, index) => {
                if (questions[qNumber].answered === a) {
                    correct = true;                   
                }
            });
            return correct;
        }
    }
    return (
        <QContext.Provider value={{questions, qNumber, setqNumber, setQuestions, stopped, stopQuiz, checkShortAnswer}}>
           {props.children} 
        </QContext.Provider>
    )
}


