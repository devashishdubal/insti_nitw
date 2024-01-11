import React from 'react'
import { useState } from 'react'
import "./createEvent.css";

const CreateEvent = () => {
    const [title,setTitle] = useState("");
    const [description,setDesc] = useState("");
    const [date,setDate] = useState(null);
    const [time,setTime] = useState(null);

    const handleSubmit = () =>{

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
            <button className="submit" onClick={handleSubmit}>Submit</button>
        </div>
        </>
    )
}

export default CreateEvent