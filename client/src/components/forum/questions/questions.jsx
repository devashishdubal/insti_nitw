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
    const [loading, setLoading] = useState(true);
    const { currentUser, userDetails } = useContext(AuthContext)
    const [searchBar, setSearchBar] = useState("");

    const fetchData = () => {
        axios
            .get(`http://localhost:8000/api/v1/forum/getQuestions/${filter}?userId=${userDetails._id}&searchData=${searchBar}`)
            .then((response) => {
                setAllQuestions([])
                setData(response.data.Data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const searchData = (e) => {
        setSearchBar(e.target.value)
    }

    useEffect(() => {
        fetchData();
    }, [filter, searchBar]);

    useEffect(() => {
        setAllQuestions(
            Data.map((question, index) => ({
                id: question._doc._id,
                card: (
                    <QuestionCard
                        comments={question._doc.answers.length}
                        fetch={fetchData}
                        id={question._doc._id}
                        title={question._doc.questionTitle}
                        description={question._doc.questionDescription || "(empty)"}
                        tags={question._doc.questionTag}
                        index={index}
                        nlikes={question._doc.likes}
                        ndislikes={question._doc.dislikes}
                        user={question._doc.userId.username}
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
                        isliked={question.userHasLiked}
                        isdisliked={question.userHasDisliked}
                        loading={false}
                    />
                ),
            }))
        );
    }, [Data, searchBar]);

    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const handleSearchFocus = () => {
        setIsSearchFocused(true);
    };

    const handleSearchBlur = () => {
        setIsSearchFocused(false);
    };

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
                    <button className={`search_place ${isSearchFocused ? 'focused' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <input
                            type="text"
                            placeholder='Search'
                            value={searchBar}
                            onChange={searchData}
                            onFocus={handleSearchFocus}
                            onBlur={handleSearchBlur}
                        />
                    </button>
                    <Link to="/students/forum/ask_question">
                        <button>Ask Question</button>
                    </Link>
                </div>
            </div>

            <div className='questions scroller'>
                {loading && [...Array(8)].map(() => (
                    <QuestionCard loading={true} />
                ))}
                {allQuestions.map((question, index) => (
                    <div className="individual_question" key={index}>{question.card}</div>
                ))}
            </div>
        </div>
    );
};

export default Questions;
