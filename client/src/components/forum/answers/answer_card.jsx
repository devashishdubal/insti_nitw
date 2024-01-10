import "./answers.css"
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext"
import React, { useState, useContext } from 'react'

const AnswerCard = ({ id, answer, fetch, questionId, userHasLiked, userHasDisliked }) => {
    const { userDetails } = useContext(AuthContext)
    const [likeColor, setLikeColor] = useState(userHasLiked ? "lightgreen" : "white");
    const [dislikeColor, setDislikeColor] = useState(userHasDisliked ? "lightcoral" : "white")
    const updateLike = () => {
        axios
            .put(`http://localhost:8000/api/v1/forum/updateLikes/comments/${id}?userId=${userDetails.username}&questionId=${questionId}`)
            .then(() => {
                fetch();

            })
            .catch((error) => {
                console.log(error);
            });
    }

    const updateDislike = () => {
        axios
            .put(`http://localhost:8000/api/v1/forum/updateDislikes/comments/${id}?userId=${userDetails.username}&questionId=${questionId}`)
            .then(() => {
                fetch();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleLikeCick = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/v1/forum/updateLikes/comments/${id}?userId=${userDetails.username}&questionId=${questionId}`)
            .then(() => {
                fetch();
                userHasLiked = !userHasLiked;

                if (userHasLiked) {
                    setLikeColor("lightgreen")
                    if (userHasDisliked) {
                        setDislikeColor("white")
                        userHasDisliked = !userHasDisliked;
                        updateDislike();
                    }
                } else {
                    setLikeColor("white")
                }

                console.log(likeColor)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDislikeClick = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/v1/forum/updateDislikes/comments/${id}?userId=${userDetails.username}&questionId=${questionId}`)
            .then(() => {
                fetch();
                userHasDisliked = !userHasDisliked;

                if (userHasDisliked) {
                    setDislikeColor("lightcoral")
                    if (userHasLiked) {
                        setLikeColor("white")
                        userHasLiked = !userHasLiked;
                        updateLike();
                    }
                } else {
                    setDislikeColor("white")
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="Answer_card">
            <Link to={`/profile/${answer.userId}`}>
                <div className="username">
                    {console.log(answer.date)}
                    <i>u/{answer.userId}</i> • {new Date(answer.date).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })} • {new Date(answer.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true })}
                </div>
            </Link>


            <div className="content">
                <p className="description">{answer.answerDescription}</p>
                <div className="likes">
                    <button className="like_button">
                        <svg style={{ fill: likeColor }} onClick={handleLikeCick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                        {answer.likes}
                    </button>
                    <button className="dislike_button">
                        <svg style={{ fill: dislikeColor }} onClick={handleDislikeClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>
                        {answer.dislikes}
                    </button>
                </div>
            </div>

        </div>

    );
}

export default AnswerCard