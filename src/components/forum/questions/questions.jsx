import React, { useState, useEffect } from 'react';
import QuestionCard from './question_card';
import AskQuestionForm from './askQuestion';
import Data from "./dummyData.json";
import Answers from '../answers/answers';

const Questions = () => {
    const [allQuestions, setAllQuestions] = useState([]);
    const [ask, setAsk] = useState(false);
    const [answer, setAnswer] = useState(false);
    const [index, setIndex] = useState(null);

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
        ({ id: index + 1, card: <QuestionCard title={Data[index].title} description={Data[index].description} tags={Data[index].tags} showAnswers={showAnswersPage} index={index}/> })));
    }, []);

    const changeContents = () => {
        setAsk(!ask);
        setAnswer(false); 
    };

    return (
        <div>
            <div className='intro'>
                <div className='intro_left'>
                    {(!answer && ask) && (
                        <button onClick={changeContents} id='back'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M19 12H6M12 5l-7 7 7 7"/>
                            </svg>
                        </button>
                    )}
                    {answer ? (null) : ask ? (
                        <b><p className='intro_text'>Ask your question</p></b>
                    ) : (
                        <b><p className='welcome'>Welcome to NITW Forum</p></b>
                    )}
                    {answer ? (null) : ask ? null : (
                        <select id='selectTag'>
                            <option value="0">Filter by tag:</option>
                            <option value="1">CSE</option>
                            <option value="2">ECE</option>
                            <option value="3">EEE</option>
                            <option value="4">BT</option>
                        </select>
                    )}
                </div>
                <div className='intro_right'>
                    {answer ? (null) : ask ? null : (
                        <button onClick={changeContents}>Ask question</button>
                    )}
                </div>
            </div>
            {ask ? (
                <AskQuestionForm />
            ) : answer ? (
                <Answers hideAnswers = {hideAnswerPage} Data = {Data[index]}/> 
            ) : (
                <div className='questions scroller'>
                    {allQuestions.map((question, index) => (
                        <div key={index}>{question.card}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Questions;
