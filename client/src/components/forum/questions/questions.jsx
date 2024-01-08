import React, { useState, useEffect } from 'react';
import QuestionCard from './question_card';
import AskQuestionForm from './askQuestion';
// import Data from "./dummyData.json";
import Answers from '../answers/answers';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Questions = () => {
    const [allQuestions, setAllQuestions] = useState([]);
    const [filter, setFilter] = useState("0");
    const [Data, setData] = useState([]);
    
    const fetchData = () => {
        axios
            .get(`http://localhost:8000/api/v1/forum/getQuestions/${filter}`)
            .then((response) => {
                // console.log(response.d)
                setData(response.data.Data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchData();
    }, [filter]);    

    useEffect(() => {
        setAllQuestions([...Array(Data.length)].map((_, index) =>
        ({
            id: index + 1, card:
                <QuestionCard comments={Data[index].answers.length} fetch={fetchData} id={Data[index]._id} title={Data[index].questionTitle} description={Data[index].questionDescription} tags={Data[index].questionTag} index={index} likes={Data[index].likes} dislikes={Data[index].dislikes} user={Data[index].userId} date={Data[index].date.split('T')[0]} />
        })));
    }, [Data]);

    return (
        <div className="forum-wrapper">
            <div className='intro'>
                <div className='intro_left'>
                    <p className='welcome'>Welcome To NITW Forum</p>
                    <select onChange={(e) => {
                        setFilter(e.target.value)
                    }}>
                        <option value="0">Filter By Tag:</option>
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="EEE">EEE</option>
                        <option value="BT">BT</option>
                    </select>
                </div>
                <div className='intro_right'>
                    <Link to="/students/forum/ask_question">
                        <button>Ask Question</button>
                    </Link>
                </div>
            </div>

            <div className='questions scroller'>
                {allQuestions.map((question, index) => (
                    <div className="individual_question" key={index}>{question.card}</div>
                ))}
            </div>
        </div>
    );
};

export default Questions;
