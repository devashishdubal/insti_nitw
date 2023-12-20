import "./questions.css"

const QuestionCard = () => {
    return (
        <div className="individual_question">
            <span className="username"><i>u/username</i></span>
            <div className="content">
                <p className="text"><b>Q. This is a question card; for testing purposes</b></p>
                <div className="question_controls">
                    <div className="tags">
                        <p className="individual_tag">ECE</p>
                        <p className="individual_tag">CSE</p>
                    </div>
                    <div className="likes">
                        <button className="like_button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                        </button>
                        <button className="dislike_button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuestionCard; 