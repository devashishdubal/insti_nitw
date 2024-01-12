import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext, useAuth } from "../../../Context/AuthContext"

const AskQuestionForm = ({ fetch }) => {
    const { currentUser, userDetails } = useContext(AuthContext)
    const navigate = useNavigate();
    const [questionTitle, setTitle] = useState("");
    const [questionDescription, setBody] = useState("");
    const [questionTag, setTag] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (questionTitle.length === 0 || questionDescription.length === 0 || !questionTag) {
            toast.error('Some fields are empty!', {
                duration: 3000,
                position: 'top-right',
                style: {marginTop: 70},
                className: '',
                ariaProps: {
                  role: 'status',
                  'aria-live': 'polite',
                },
            });
            return;
        }

        const data = {
            questionTitle,
            questionDescription,
            questionTag,
            userId: userDetails.username
        };
        axios
            .post('http://localhost:8000/api/v1/forum/postQuestion', data)
            .then(() => {
                console.log(data);
                // fetch();
            })
            .catch((error) => {
                console.log(data);
                console.log(error)
                alert("Error! Please check input fields");
            });
        setTag("");
        setBody("");
        setTitle("");

        toast.success('Question Posted!', {
            duration: 500,
            position: 'top-right',
            style: {marginTop: 70},
            className: '',
            ariaProps: {
              role: 'status',
              'aria-live': 'polite',
            },
        });
        setTimeout(() => {
            navigate(-1);
        }, 500);
    };
    return (
        <div className="forum-wrapper">
            <div className="intro">
                <div className="intro_left">
                    <b><p className='intro_text'>Ask Your Question</p></b>
                    <Link to="/students/forum">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M19 12H6M12 5l-7 7 7 7" />
                            </svg>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="question_form">
                <input value={questionTitle} required type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                <textarea value={questionDescription} onChange={(e) => setBody(e.target.value)} rows="10" cols="50" placeholder="Description">
                </textarea>
                <select value={questionTag} required onChange={(e) => setTag(e.target.value)}>
                    <option value="" disabled hidden>Add a Tag:</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="BT">BT</option>
                </select>
                <button className="submit" onClick={handleSubmit}>Submit</button>
                <Toaster/>
            </div>
        </div>
    );
}

export default AskQuestionForm;