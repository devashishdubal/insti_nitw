import React, { useState, useEffect, useContext } from 'react';
import Post from './post';
import "./feed.css"
import axios from 'axios';
import { AuthContext } from "../../Context/AuthContext";

const Feed = () => {
    const [allCards, setAllCards] = useState([]);
    const [data, setData] = useState(null);
    const { userDetails } = useContext(AuthContext)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/feed/getUserFeed/${userDetails._id}`);
                setData(response.data.data);
                const cards = response.data.data.map((club, index) => ({
                    id: index + 1,
                    card: (
                        <Post
                            eventName = {club._doc.eventName}
                            eventImage = {club._doc.eventImage}
                            eventOrganizer = {club.eventOrganizer}
                            eventOrganizerLogo = {club.eventOrganizerLogo}
                            eventDescription = {club._doc.eventDescription}
                            time={new Date(club._doc.eventDateTime).toLocaleTimeString(undefined, {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            })}
                            date={new Date(club._doc.eventDateTime).toLocaleDateString('en-GB', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            })}
                            registrationLink = {club._doc.registrationLink}
                        />
                    ),
                }));
                setAllCards(cards);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        
        fetchData();
    }, []);
    return (
        <div className='allPosts'>
            <div className="allClubs">
            {allCards.map((card) => (
                <div id={card.id} className='card-wrapper'>
                {card.card}
                </div>
            ))}
        </div>
        </div>
    );
}

export default Feed;