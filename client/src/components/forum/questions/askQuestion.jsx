import axios from 'axios';
import { useState, useEffect } from 'react';

const AskQuestionForm = () => {
    const [questionTitle, setTitle] = useState("");
    const [questionBody, setBody] = useState("");
    const [questionTag, setTag] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            questionTitle,
            questionBody,
            questionTag
        };
        axios
            .post('http://localhost:8000/api/v1/forum/postQuestion', data)
            .then(() => {
                console.log(data);
            })
            .catch((error) => {
                console.log(data);
                console.log(error)
                alert("Error! Please check input fields");
            });
    };
    return (
        <div className="question_form">
            <input required type="text" placeholder="Question title" onChange={(e) => setTitle(e.target.value)} />
            <textarea onChange={(e) => setBody(e.target.value)} rows="7" cols="50" placeholder="Max: 100 characters. Be concise in your question and refrain from profanity.">
            </textarea>
            <select required onChange={(e) => setTag([e.target.value])} id='selectTagAns'>
                <option>Add a tag:</option>
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