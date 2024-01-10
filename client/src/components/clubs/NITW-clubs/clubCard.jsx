import "./clubs.css"
import React, {useContext, useState, useEffect} from "react";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";

const ClubCard = ({imageLink, clubName, clubDescription, clubId, isSubscribed}) => {
    const { currentUser, userDetails } = useContext(AuthContext)
    const [subscribeStatus, setSubscribeStatus] = useState(isSubscribed);
    const subscriptionHandler = async (e) => {
        e.preventDefault();
        axios
            .put("http://localhost:8000/api/v1/clubs/handleSubscribe", {"clubId": clubId, "username": userDetails.username})
            .then(() => {
                //fetch();
                //isSubscribed = !isSubscribed;
                setSubscribeStatus(!subscribeStatus)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const unsubscriptionHandler = async (e) => {
        e.preventDefault();
        axios
            .put("http://localhost:8000/api/v1/clubs/handleUnsubscribe", {"clubId": clubId, "username": userDetails.username})
            .then(() => {
                //fetch();
                setSubscribeStatus(!subscribeStatus)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    return (
    <div className="club_card">
        <div className="logo">
            <img src={imageLink} alt="logo" className="logo-img"/>
        </div>
        <span className="club_name"><p>{clubName}</p></span>
        <div className="info">
            {clubDescription}
        </div>
        {
            subscribeStatus ? (
            <button className="subscribe_button" onClick={unsubscriptionHandler}>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>                Subscribed
            </button>) :
            (<button className="subscribe_button" onClick={subscriptionHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path></svg>            Subscribe
            </button>)
        }
    </div>
    );
}

export default ClubCard;