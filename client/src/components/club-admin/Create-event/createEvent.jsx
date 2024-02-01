import React from 'react'
import { useState, useContext } from 'react'
import "./createEvent.css";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../../Context/AuthContext';

const CreateEvent = () => {
    const navigate = useNavigate();
    const [title,setTitle] = useState("");
    const [description,setDesc] = useState("");
    const [venue,setVenue] = useState("");
    const [date,setDate] = useState("");
    const [time,setTime] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [registerLink,setRegLink] = useState("");
    const [image,setImage] = useState("");

    const { userDetails } = useContext(AuthContext);

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(userDetails._id)
        const data = {
            eventName:title,
            eventDescription:description,
            eventVenue:venue,
            eventDateTime:`${date}T${time}Z`,
            registerable:isChecked,
            registrationLink:registerLink,
            eventOrganizer:`${userDetails._id}`,
            eventImage:`${image}`,
            targetYear:[]
        }
        try{
            axios.post(`http://localhost:8000/api/v1/events/create-event`,data);
            toast.success('Event Created!', {
                duration: 1000,
                position: 'top-right',
                style: {marginTop: 70},
                className: '',
                ariaProps: {
                  role: 'status',
                  'aria-live': 'polite',
                },
            });
            setTimeout(() => {
                navigate("/clubAdmin");
            }, 1000);
        } catch(e){
            console.log(e);
        }

    };
    return (
        <>
        <p className='title'>Create Event</p>
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
                value={image}
                required
                placeholder='Image Link'
                onChange={(e) => {setImage(e.target.value)}}
            />
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
        <Toaster/>
        </>
    )
}

export default CreateEvent