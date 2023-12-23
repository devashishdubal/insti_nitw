import "./answers.css"

const AnswerCard = () =>{
    return(
       <div className="Answer_card">
         <div className="user_info">
                <p> u/Username || Date </p>
        </div>

        <div className="text">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat ducimus odio, autem illum quas minima atque fugiat quidem cumque, possimus odit natus vero. Cum exercitationem nobis eos ut, delectus veniam?</p>
        </div>

        <div className="Buttons">
            <button>Like</button>
            <button>Dislike</button>
        </div>

       </div>
        
        );
}

export default AnswerCard