import React, { useState, useEffect } from 'react';
import AnswerCard from "./answer_card";
import QuestionCard from '../questions/question_card';
import "./answers.css";
import axios from 'axios';

const Answers = ({  qCard, fetch, id, ans, hideAnswers, Data  }) => {
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
            <div className="individual_question">{qCard}</div>

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
    
