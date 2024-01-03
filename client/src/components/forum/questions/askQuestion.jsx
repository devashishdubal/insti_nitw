import axios from 'axios';
import { useState, useEffect } from 'react';

const AskQuestionForm = ({fetch}) => {
    const [questionTitle, setTitle] = useState("");
    const [questionDescription, setBody] = useState("");
    const [questionTag, setTag] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            questionTitle,
            questionDescription,
            questionTag
        };
        axios
            .post('http://localhost:8000/api/v1/forum/postQuestion', data)
            .then(() => {
                console.log(data);
                fetch();
            })
            .catch((error) => {
                console.log(data);
                console.log(error)
                alert("Error! Please check input fields");
            });
            setTag("");
            setBody("");
            setTitle("");
    };
    return (
        <div className="question_form">
            <input value={questionTitle} required type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
            <textarea value={questionDescription} onChange={(e) => setBody(e.target.value)} rows="10" cols="50" placeholder="Text (optional)">
            </textarea>
            <select value={questionTag} required onChange={(e) => setTag(e.target.value)}>
                <option>Add Tag:</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="BT">BT</option>
            </select>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default AskQuestionForm;