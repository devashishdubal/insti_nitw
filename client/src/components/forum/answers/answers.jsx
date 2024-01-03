import React, { useState, useEffect } from 'react';
import AnswerCard from "./answer_card";
import "./answers.css";
import axios from 'axios';

const Answers = ({fetch, id, ans, hideAnswers, Data}) => {
    const [answers, setAllAnswers] = useState([]);
    const [answerDescription, setDesc] = useState("");
    // const [postFlag, setPostFlag] = useState(0);
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            answerDescription
        };
        axios
            .put(`http://localhost:8000/api/v1/forum/reply/${id}`, data)
            .then(() => {
                setDesc("");
                fetch();
            })
            .catch((error) => {
                console.log(error)
                alert("Error! Please check input fields");
            });
    };

    useEffect(() => {
        //console.log(Data)
        setAllAnswers([...Array(ans.length)].map((_, index) => ({ id: index + 1, card: <AnswerCard answer={ans[index]}/> })));
    }, [ans]);

    return(
        <div className="All">
            <div className="Header">
                <div className="header_top">
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
                <textarea value={answerDescription} onChange={(e) => setDesc(e.target.value)} placeholder="Enter your Answer. Please refrain from profanity."></textarea>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}
    
export default Answers
    
