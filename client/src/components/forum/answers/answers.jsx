import React, { useState, useEffect } from 'react';
import AnswerCard from "./answer_card";
import "./answers.css"

const Answers = ({hideAnswers, Data}) => {
    const [answers, setAllAnswers] = useState([]);

    useEffect(() => {
        //console.log(Data)
        setAllAnswers([...Array(7)].map((_, index) => ({ id: index + 1, card: <AnswerCard/> })));
    }, []);

    return(
        <div className="All">
            <div className="Header-answer">
                <div className="header_top_answer">
                    <button id = "Back" onClick={hideAnswers}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg> </button>
                    <h3 id = "qn">{Data.title}</h3>
                    <a href='#yourAnswer'>Give your answer</a>
                </div>
                <p>{Data.description}</p>
                <p>Asked by: <i>u/username</i></p>
            </div>

            <div className="Section">
            {answers.map((answer, index) => (
                <div key={index} className='each_answer'>{answer.card}</div>
            ))}
            </div>

            <div className="Input" id='yourAnswer'>
                <textarea placeholder="Enter your Answer. Please refrain from profanity."></textarea>
                <button>Submit</button>
            </div>
        </div>
    );
}
    
export default Answers
    
