import React from 'react'
import { useState,useEffect } from 'react';
import "./EventCard.css"
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditEvent = () => {
    const { id } = useParams()
    const [title,setTitle] = useState("");
    const [description,setDesc] = useState("");
    const [venue,setVenue] = useState("");
    const [date,setDate] = useState(null);
    const [time,setTime] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [registerLink,setRegLink] = useState("");

    const fetchData = () => {
        const response = axios.get(`http://localhost:8000/api/v1/events/getEventDetails/?id=${id}`);
        console.log(response);
        const event = response.data;
        setTitle(event.eventName);
        setDesc(event.eventDescription);
        setVenue(event.eventVenue);
        setDate(event.eventDateTime);
        if (event.registerable){
            setIsChecked(true);
            setRegLink(event.registrationLink);
        }
    }
    useEffect(() => {
      fetchData();
    }, [])
    
    const handleSubmit = () =>{

    };
    return (
        <>
        <p className='title'>Edit Event</p>
        <div className='main-form'>
            <input value={title} required type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
            <textarea
                placeholder="Description"
                rows="10" 
                cols="50"
                value={description}
                onChange={(e) => setDesc(e.target.value)}
                required
            ></textarea>
            <input type="text"
                value={venue}
                required
                placeholder='Venue'
                onChange={(e) => {setVenue(e.target.value)}}
            />
            <input
                type="date"
                name="date"
                className='datetime'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <input
                type="time"
                className='datetime'
                name="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
            />
            <div className='check'>
                <p>Registerable</p>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {setIsChecked(!isChecked);}}
                />
            </div>
            {isChecked && <input
                                type="text"
                                placeholder='Registration Link'
                                value={registerLink}
                                onChange={(e) => {setRegLink(e.target.value)}}
                                />}
            
            <button className="submit" onClick={handleSubmit}>Submit</button>
        </div>
        </>
    )
}

export default EditEvent