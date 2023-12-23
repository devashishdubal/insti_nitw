import AnswerCard from "./answer_card";
import "./answers.css"

const Answers = () => {
    return(
    
    <>

    <div className="All">
        <div className="Header">
            <button id = "Back"> Back </button>
            <h3 id = "qn">Question Name</h3>
        </div>

        <div className="Section">
            <AnswerCard/>
            <AnswerCard/>
            <AnswerCard/>
        </div>

        <div className="Input">
            <textarea placeholder="Enter your Answer. Use Profanity"></textarea>
            <button>Send</button>
        </div>
    </div>
     
    </>
    );
}
    
export default Answers
    
