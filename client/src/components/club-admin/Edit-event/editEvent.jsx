import React from 'react'
import { useState, useEffect } from 'react';
import "../EventCard.css"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const EditEvent = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title.length === 0 || description.length === 0 || venue.length === 0
            || date.length === 0 || time.length === 0) {
            toast.error('Some fields are empty', {
                duration: 1000,
                position: 'top-right',
                style: { marginTop: 70 },
                className: '',
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                },
            });
            return;
        }

        if (isChecked && registerLink.length === 0) {
            toast.error('Some fields are empty', {
                duration: 1000,
                position: 'top-right',
                style: { marginTop: 70 },
                className: '',
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                },
            });
            return;
        }

        const data = {
            ...req1,
            eventName: title,
            eventDescription: description,
            eventVenue: venue,
            eventDateTime: `${date}T${time}Z`,
            registerable: isChecked,
            registrationLink: registerLink,
        }
        try {
            await axios.put(`http://localhost:8000/api/v1/events/updateEventDetails/${id}`, data);
            toast.success('Event Updated!', {
                duration: 1000,
                position: 'top-right',
                style: { marginTop: 70 },
                className: '',
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                },
            });
            setTimeout(() => {
                navigate(-1);
            }, 1000);
        } catch (e) {
            console.log(e);
        }
    };

    const handleDeletion = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:8000/api/v1/events/deleteEvent/${id}`);
            console.log(response.data.message); // Log success message
            navigate("/clubAdmin");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <p className='title'>Edit Event</p>
            <div className='main-form'>
                <input value={title}
                    required
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                />
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
                    onChange={(e) => { setVenue(e.target.value) }}
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
                        onChange={() => { setIsChecked(!isChecked); }}
                    />
                </div>
                {isChecked && <input
                    type="text"
                    placeholder='Registration Link'
                    value={registerLink}
                    onChange={(e) => { setRegLink(e.target.value) }}
                />}
                <div className='action-buttons'>
                    <button className="submit" onClick={handleSubmit}>Submit</button>
                    <button className="submit" onClick={handleDeletion}>Delete this event</button>
                </div>
                <Toaster />
            </div>
        </>
    )
}

export default EditEvent