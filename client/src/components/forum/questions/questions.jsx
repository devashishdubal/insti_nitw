import React, { useState, useEffect } from 'react';
import QuestionCard from './question_card';
import AskQuestionForm from './askQuestion';
// import Data from "./dummyData.json";
import Answers from '../answers/answers';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Questions = () => {
    const [allQuestions, setAllQuestions] = useState([]);
    const [ask, setAsk] = useState(false);
    const [answer, setAnswer] = useState(false);
    const [index, setIndex] = useState(null);
    const [filter, setFilter] = useState("0");
    //
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

    const showAnswersPage = (index) => {
        setAsk(false);
        setAnswer(true);
        setIndex(index)
        console.log(allQuestions[index])
    };

    const hideAnswerPage = () => {
        setAnswer(false);
    }

    useEffect(() => {
        //console.log(Data)
        setAllQuestions([...Array(Data.length)].map((_, index) =>
            ({ id: index + 1, card: 
                <QuestionCard comments={Data[index].answers.length} fetch={fetchData} id={Data[index]._id} title={Data[index].questionTitle} description={Data[index].questionDescription} tags={Data[index].questionTag} showAnswers={showAnswersPage} index={index} likes={Data[index].likes} dislikes={Data[index].dislikes} user={Data[index].userId} date={Data[index].date.split('T')[0]} />})));
    }, [Data]);

    const changeContents = (choice) => {
        if (choice) {
            console.log(ask);
            setAsk(!ask);
            console.log(ask);
            setAnswer(false);
        }
        else {
            setAsk(false);
            setAnswer(!answer);
        }
    };

    return (
        <div className="forum-wrapper">
            <div className='intro'>
                <div className='intro_left'>
                    {answer ? (
                        <b><p className='intro_text'>Comments</p></b>
                    ) : (
                        <b><p className='welcome'>Welcome To NITW Forum</p></b>
                    )}
                    {(answer) && (
                        <div class="ans-top">
                            <button onClick={() => changeContents(0)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M19 12H6M12 5l-7 7 7 7" />
                                </svg>
                            </button>
                            <a href='#yourAnswer'>Give Your Reply</a>
                        </div>
                    )}
                    {answer ? (null) : ask ? null : (
                        <select onChange={(e) => {
                            // console.log(e.target.value);
                            setFilter(e.target.value)
                        }}>
                            <option value="0">Filter By Tag:</option>
                            <option value="CSE">CSE</option>
                            <option value="ECE">ECE</option>
                            <option value="EEE">EEE</option>
                            <option value="BT">BT</option>
                        </select>
                    )}
                </div>
                <div className='intro_right'>
                    {answer ? (null) : ask ? null : (
                        <Link to="/students/forum/ask_question">
                            <button>Ask Question</button>
                        </Link>
                    )}
                </div>
            </div>
            {answer ? (
                    <Answers fetch={fetchData} id={Data[index]._id} ans={Data[index].answers} hideAnswers={hideAnswerPage} Data={Data[index]} qCard={<QuestionCard comments={Data[index].answers.length} fetch={fetchData} id={Data[index]._id} title={Data[index].questionTitle} description={Data[index].questionDescription} tags={Data[index].questionTag} showAnswers={showAnswersPage} index={index} likes={Data[index].likes} dislikes={Data[index].dislikes} user={Data[index].userId} date={Data[index].date.split('T')[0]} />} />
            ) : (
                <div className='questions scroller'>
                    {allQuestions.map((question, index) => (
                        <div className="individual_question" key={index}>{question.card}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Questions;
