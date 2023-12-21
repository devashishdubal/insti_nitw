import "./questions.css"

const QuestionCard = ({title, description, tags}) => {
    return (
        <div className="individual_question">
            <span className="username"><i>u/username</i> - 21/12/23</span>
            <div className="content">
                <p className="text"><b>{title}</b></p>
                <p className="description">
                    {description}
                </p>
                <div className="question_controls">
                    <div className="tags">
                        <p><i>Tags:</i> </p>
                    {tags.map((tag, index) => (
                        <p key={index} className="individual_tag">{tag}</p>
                    ))}  
                    </div>
                    <div className="likes">
                        <button className="like_button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>                            
                        3
                        </button>
                        <button className="like_button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                            70
                        </button>
                        <button className="dislike_button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>
                            10
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuestionCard; 