import React, { useState, useEffect, useContext } from 'react';
import QuestionCard from './question_card';
import AskQuestionForm from './askQuestion';
import Answers from '../answers/answers';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../../Context/AuthContext"

const Questions = () => {
    console.log('yo')
    const [allQuestions, setAllQuestions] = useState([]);
    const [filter, setFilter] = useState("0");
    const [Data, setData] = useState([]);
    const { currentUser, userDetails } = useContext(AuthContext)

    const fetchData = () => {
        axios
            .get(`http://localhost:8000/api/v1/forum/getQuestions/${filter}?userId=${userDetails.username}`)
            .then((response) => {
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
        setAllQuestions(
            Data.map((question, index) => ({
                id: index + 1,
                card: (
                    <QuestionCard
                        comments={question._doc.answers.length}
                        fetch={fetchData}
                        id={question._doc._id}
                        title={question._doc.questionTitle}
                        description={question._doc.questionDescription}
                        tags={question._doc.questionTag}
                        index={index}
                        likes={question._doc.likes}
                        dislikes={question._doc.dislikes}
                        user={question._doc.userId}
                        time={new Date(question._doc.date).toLocaleTimeString(undefined, {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                        })}
                        date={new Date(question._doc.date).toLocaleDateString('en-GB', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        })}
                        liked={question.userHasLiked}
                        disliked={question.userHasDisliked}
                    />
                ),
            }))
        );
    }, [Data]);

    // const stack = new Stack();

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
