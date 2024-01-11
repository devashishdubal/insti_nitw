import "./questions.css"
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../../Context/AuthContext"

const QuestionCard = ({ time, comments, fetch, id, user, date, title, description, tags, index, likes, dislikes, liked, disliked }) => {
    const { currentUser, userDetails } = useContext(AuthContext)
    const [likeColor, setLikeColor] = useState(liked ? "lightgreen" : "white");
    const [dislikeColor, setDislikeColor] = useState(disliked ? "lightcoral" : "white")

    const updateLike = () => {
        axios
            .put(`http://localhost:8000/api/v1/forum/updateLikes/${id}?userId=${userDetails.username}&disliked=${disliked}`)
            .then(() => {
                //fetch();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateDislike = () => {
        axios
            .put(`http://localhost:8000/api/v1/forum/updateDislikes/${id}?userId=${userDetails.username}&liked=${liked}`)
            .then(() => {
                //fetch();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleLikeCick = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/v1/forum/updateLikes/${id}?userId=${userDetails.username}&disliked=${disliked}`)
            .then(() => {
                fetch();
                liked = !liked;

                if (liked) {
                    likes++;
                    setLikeColor("lightgreen")
                    if (disliked) {
                        dislikes--;
                        setDislikeColor("white")
                        updateDislike();
                    }
                } else {
                    likes--;
                    setLikeColor("white")
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDislikeCick = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/v1/forum/updateDislikes/${id}?userId=${userDetails.username}&liked=${liked}`)
            .then(() => {
                fetch();
                disliked = !disliked;

                if (disliked) {
                    dislikes++;
                    setDislikeColor("lightcoral")
                    if (liked) {
                        likes--;
                        setLikeColor("white")
                        updateLike();
                    }
                } else {
                    dislikes--;
                    setDislikeColor("white")
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };


    if (!description) description = "(empty)";

    useEffect(() => {
        /* Kuch karo */
    }, [likes, dislikes])

    return (
        <>
            <div className="username">
                <Link to={`/profile/${user}`}>
                    <i>u/{user}</i> </Link>• {date} • {time}
            </div>
            <Link to={`/students/forum/${id}`}>
                <div className="content">
                    <p className="text">{title}</p>
                    <p className="description">{description}</p>
                    <div className="question_controls">
                        <div className="tags">
                            <p key={index} className="individual_tag">{tags}</p>
                        </div>
                        <div className="likes">
                            <button className="comments feedback">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                {comments}
                            </button>
                            <button className="like_button feedback">
                                <svg style={{ fill: likeColor }} onClick={handleLikeCick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path className="avoid" d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                                {likes}
                            </button>
                            <button className="dislike_button feedback">
                                <svg style={{ fill: dislikeColor }} onClick={handleDislikeCick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path className="avoid" d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>
                                {dislikes}
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}

export default QuestionCard; 