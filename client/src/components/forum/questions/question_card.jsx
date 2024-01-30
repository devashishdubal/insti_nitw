import "./questions.css"
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../../Context/AuthContext"
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const QuestionCard = ({ time, comments, fetch, id, user, date, title, description, tags, index, nlikes, ndislikes, isliked, isdisliked, loading }) => {
    const { currentUser, userDetails } = useContext(AuthContext)
    const [liked, setLiked] = useState(isliked);
    const [disliked, setDisliked] = useState(isdisliked);
    const [likes, setLikes] = useState(nlikes);
    const [dislikes, setDislikes] = useState(ndislikes);
    const [likeColor, setLikeColor] = useState(liked ? "lightgreen" : "white");
    const [dislikeColor, setDislikeColor] = useState(disliked ? "lightcoral" : "white")

    const updateLike = () => {
        axios
            .put(`http://localhost:8000/api/v1/forum/updateLikes/${id}?userId=${userDetails._id}&liked=${!liked}`)
            .then(() => {
                //fetch();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateDislike = () => {
        axios
            .put(`http://localhost:8000/api/v1/forum/updateDislikes/${id}?userId=${userDetails._id}&disliked=${!disliked}`)
            .then(() => {
                //fetch();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleLikeClick = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/v1/forum/updateLikes/${id}?userId=${userDetails._id}&liked=${!liked}`)
            .then(() => {
                setLiked(!liked);

                if (!liked) {
                    setLikeColor("lightgreen");
                    setLikes(likes + 1)
                    if (disliked) {
                        setDisliked(false);
                        setDislikes(dislikes - 1)
                        setDislikeColor("white");
                        updateDislike();
                    }
                } else {
                    setLikeColor("white");
                    setLikes(likes - 1)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDislikeClick = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/v1/forum/updateDislikes/${id}?userId=${userDetails._id}&disliked=${!disliked}`)
            .then(() => {
                setDisliked(!disliked);

                if (!disliked) {
                    setDislikeColor("lightcoral");
                    setDislikes(dislikes + 1)
                    if (liked) {
                        setLiked(false);
                        setLikes(likes - 1)
                        setLikeColor("white");
                        updateLike();
                    }
                } else {
                    setDislikeColor("white");
                    setDislikes(dislikes - 1)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };


    //if (!description) description = "(empty)";

    return (
        <>
            {!loading && <div className="username">
                <Link to={`/profile/${user}`}>
                    <span><i>u/{user}</i></span>
                </Link><span>{date} • {time}</span>
            </div>
            }
            {loading ? (
                <div className="skeleton">
                    <SkeletonTheme baseColor="#ffffff" highlightColor="#ECECF0">
                        <Skeleton height={20} width={200} />
                        <Skeleton height={20} />
                        <Skeleton height={40} />
                        <Skeleton height={30} width={80} />
                    </SkeletonTheme>
                </div>
            ) : (
                <Link to={`/students/forum/${id}`}>
                    <p className="text">{title}</p>
                    <p className="description"><div dangerouslySetInnerHTML={{__html: description}}></div></p>
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
                                <svg style={{ fill: likeColor }} onClick={handleLikeClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path className="avoid" d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                                {likes}
                            </button>
                            <button className="dislike_button feedback">
                                <svg style={{ fill: dislikeColor }} onClick={handleDislikeClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path className="avoid" d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>
                                {dislikes}
                            </button>
                        </div>
                    </div>
                </Link>
            )}
        </>
    );
}

export default QuestionCard; 