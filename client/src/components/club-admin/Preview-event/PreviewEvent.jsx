import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "./previewEvent.css"

const PreviewEvent = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    const [title, setTitle] = useState("h");
    const [description, setDesc] = useState("");
    const [venue, setVenue] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [registerLink, setRegLink] = useState("");
    const [req1, setReq1] = useState("");
    const fetchData = async () => {
        const response = await axios.get(`http://localhost:8000/api/v1/events/getEventDetails/${id}`);
        const event = response.data;
        setReq1(event);
        setTitle(event.eventName);
        setDesc(event.eventDescription);
        setVenue(event.eventVenue);
        setDate(event.eventDateTime.slice(0, 10));
        setTime(event.eventDateTime.slice(11, 16));
        if (event.registerable) {
            setIsChecked(true);
            setRegLink(event.registrationLink);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className='post_card'>
            <div className='post_card_top'>
                <div className='post_card_top_left'>
                    <img src={eventOrganizerLogo} alt='logo' />
                    <p>{eventOrganizer}</p>
                </div>
                <div className='post_card_top_right'>
                    <Link to="/clubs/nitw_clubs" target="_blank" rel="noopener noreferrer">
                        <button>
                            Manage subscriptions
                        </button>
                    </Link>
                </div>
            </div>
            <div className='post_card_content'>
                <div className='post_card_center_left'>
                    <img src={eventImage} alt='poster' />
                </div>
                <div className='post_card_center_right'>
                    <div className='post_text'>
                        <p className='post_title'>{title}</p>
                        <p className='post_description'>{description}
                        </p>
                    </div>
                    <div className='controlButtons'>
                        <div className='enabled_btns'>
                            <Link to={registerLink} target="_blank" rel="noopener noreferrer">
                                <button className='enabled'>
                                    Register
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 11.08V8l-6-6H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h6" />
                                        <path d="M14 3v5h5M18 21v-6M15 18h6" />
                                    </svg>
                                </button>
                            </Link>
                            <button className='enabled'>
                                Set reminder
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path></svg>
                            </button>
                        </div>
                        <div className='disabled_btns'>
                            <button disabled={true} className='disabled'>
                                {date}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            </button>
                            <button disabled={true} className='disabled'>
                                {time}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PreviewEvent;