import React, { useState, useEffect } from 'react';
import AnswerCard from "./answer_card";
import QuestionCard from '../questions/question_card';
import "./answers.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


const Answers = () => {
    const { id } = useParams()
    const [answers, setAllAnswers] = useState([])
    const [answerDescription, setDesc] = useState("")
    const initialData = {
        _id: "",
        questionTitle: "",
        questionDescription: "",
        questionTag: "",
        userId: "",
        likes: 0,
        dislikes: 0,
        date: "",
        answers: []
      };
      
      const [Data, setData] = useState(initialData);

    const fetchData = () => {
        axios
            .get(`http://localhost:8000/api/v1/forum/getQuestionById/${id}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        // console.log(Data);
    }, [Data]);

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (answerDescription.length === 0) {
            toast.error('Answer field is empty!', {
                duration: 3000,
                position: 'top-right',
              
                // Styling
                style: {marginTop: 70},
                className: '',
                // Aria
                ariaProps: {
                  role: 'status',
                  'aria-live': 'polite',
                },
              });
            return;
        }

        const data = {
            answerDescription
        };
        axios
            .put(`http://localhost:8000/api/v1/forum/reply/${id}`, data)
            .then(() => {
                setDesc("");
                fetchData();
            })
            .catch((error) => {
                console.log(error)
                alert("Error! Please check input fields");
            });
    };

    useEffect(() => {
        //console.log(Data)
        setAllAnswers([...Array((Data.answers.length) || 0)].map((_, index) => ({ id: index + 1, card: <AnswerCard fetch={fetchData} id={Data.answers[index]._id} answer={Data.answers[index]} /> })));
    }, [Data]);

    return (
        <div className="forum-wrapper">
            <div className="All">
                <div className="intro">
                    <div className="intro_left">
                        <b><p className='intro_text'>Comments</p></b>
                        <div class="ans-top">
                            <Link to="/students/forum">
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M19 12H6M12 5l-7 7 7 7" />
                                    </svg>
                                </button>
                            </Link>
                            <a href='#yourAnswer'>Give Your Reply</a>
                        </div>
                    </div>
                </div>
                <div className="individual_question">
                <QuestionCard comments={Data.answers.length} fetch={fetchData} id={Data._id} title={Data.questionTitle} description={Data.questionDescription} tags={Data.questionTag} likes={Data.likes} dislikes={Data.dislikes} user={Data.userId} date={Data.date.split('T')[0]} />
                </div>
                {((Data.answers?.length) || 0) > 0 && (
                    <div className="Section">
                        {answers.map((answer, index) => (
                            <>{answer.card}</>
                        ))}
                    </div>
                )}
                <div className="Input" id='yourAnswer'>
                    {(Data.answers.length > 0) && (<h1>Your Reply</h1>)}
                    {(Data.answers.length == 0) && (<h1>Start The Conversation!</h1>)}
                    <textarea rows="6" value={answerDescription} onChange={(e) => setDesc(e.target.value)} placeholder="Enter your Answer. Please refrain from profanity."></textarea>
                    <button className="submit" onClick={handleSubmit}>Reply</button>
                    <Toaster/>
                </div>
            </div>
        </div>
    );
}

export default Answers

