import React, {useState, useEffect, createContext} from 'react';
import CyrToLat from './components/CyrToLat';
export const QContext = createContext();
export function QContextProvider(props) {
    const [questions, setQuestions] = useState(null);
    const [qNumber, setqNumber] = useState(0);
    const [score, setScore] = useState({totalScore:0,scoreArray:[]});
    const [stopped, stopQuiz] = useState(0); // 0 for active 1 for paused 2 for finished
    const [gUser, setGuser]= useState({name:'Anonimni posetilac'});
    function shuffle(arr) {
        for (var i = arr.length-1; i >=0 ; i--) {
            var j= Math.round(Math.random()*i);
            let temp = arr[i];       
            arr[i] = arr[j];
            arr[j] = temp;        
        }
        return arr;
    };
    function radnomizeSomeAnswers(data){
        setQuestions(data.map((q,index)=>{
            if(q.type!=="ordering") return q;
            else{
                const rndAnswers = shuffle([...q.answers]);
                return {...q, randomized_answers:shuffle(rndAnswers)}
            }
        }))
    }
    useEffect(() => {
        fetch('http://localhost/react2/public/getset.php',{mode:'cors'})
        //fetch('http://addreactizz.svethemije.com/getset.php',{mode:'cors'})
        .then(res =>res.json())
        .then(data=>radnomizeSomeAnswers(data));


    }, []);


    function checkShortAnswer(qNumber){
        if (stopped === 2) {
            let correct = false;
            questions[qNumber].answers.forEach((a, index) => {
                //trebalo bi proveriti i case sensitivity
                if(questions[qNumber].caseSensitive){
                    if (CyrToLat(questions[qNumber].answered) === CyrToLat(a) ) {
                        correct = true;                   
                    }
                }
                else{
                    if (CyrToLat(questions[qNumber].answered).toLowerCase() === CyrToLat(a).toLowerCase() ) {
                        correct = true;                   
                    }
                }
                
            });
            return correct;
        }
    }
    return (
        <QContext.Provider value={{questions, qNumber, setqNumber, setQuestions, stopped, stopQuiz, checkShortAnswer,gUser, setGuser, score, setScore }}>
           {props.children} 
        </QContext.Provider>
    )
}


