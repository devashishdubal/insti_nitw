import React from 'react'
import { useState } from 'react'
import "./createEvent.css";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const CreateEvent = () => {
    const [title,setTitle] = useState("");
    const [description,setDesc] = useState("");
    const [venue,setVenue] = useState("");
    const [date,setDate] = useState(null);
    const [time,setTime] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [registerLink,setRegLink] = useState("");
    const [image,setImage] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = {
            eventName:title,
            eventDescription:description,
            eventVenue:venue,
            eventDateTime:`${date}T${time}Z`,
            registerable:isChecked,
            registrationLink:registerLink,
            eventOrganizer:"6592a8cd1f5a26e6d44749c6",
            eventImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS9Gyu0IZMVf6gw2XpL300WUWKuxX5ZtZvfBPWdJTWvA&s",
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

export default CreateEvent