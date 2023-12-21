const AskQuestionForm = () => {
    return (
        <div className="question_form">
            <input type="text" placeholder="Title"/>
            <textarea rows="7" cols="50" placeholder="Max: 100 characters. Be concise in your question and refrain from profanity.">
            </textarea>
            <select id='selectTag'>
                <option value="0">Add a tag:</option>
                <option value="1">CSE</option>
                <option value="2">ECE</option>
                <option value="3">EEE</option>
                <option value="4">BT</option>
            </select>
            <button>Submit</button>
        </div>
    );
}

export default AskQuestionForm;