import React from 'react'
import { useState, useContext } from 'react'
import "./createEvent.css";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../../Context/AuthContext';
import { storage } from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const CreateEvent = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const [venue, setVenue] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [registerLink, setRegLink] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    const { userDetails } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e)
        const file = e.target.elements.posterImage.files[0];
        const date = new Date().getTime();
        const storageRef = ref(storage, `${userDetails._id + date}`);
        setLoading(true);
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
            setLoading(false);
            return;
        }

        if ((isChecked && registerLink.length === 0)) {
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
            setLoading(false);
            return;
        }

        await uploadBytesResumable(storageRef, file).then(async () => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                setImage(downloadURL);
            })
        }).catch((error) => {
            toast({
                title: "Upload error! Process terminated",
                position: 'top-left',
                status: 'error',
                duration: 1000,
                isClosable: true,
            });
            console.log(error)
            setLoading(false);
            return;
        })

        let dateToBeSubmitted = new Date(date);
        const [hours, minutes] = time.split(":");
        dateToBeSubmitted.setHours(hours);
        dateToBeSubmitted.setMinutes(minutes);
        dateToBeSubmitted.setSeconds(0);
        
        const data = {
            eventName: title,
            eventDescription: description,
            eventVenue: venue,
            eventDateTime: dateToBeSubmitted,
            registerable: isChecked,
            registrationLink: registerLink,
            eventOrganizer: `${userDetails._id}`,
            eventImage: image,
            targetYear: []
        }
        try {
            axios.post(`http://localhost:8000/api/v1/events/create-event`, data);
            toast.success('Event Created!', {
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
                navigate("/clubAdmin");
            }, 1000);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }

        setLoading(false);
    };
    return (
        <>
        <form onSubmit={handleSubmit}>
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

                <input type="file"
                    name="posterImage"
                    placeholder='Upload event poster'
                />
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

                <button className="submit" disabled={loading}>{loading ? <p>Uploading...</p>:<p>Submit</p>}</button>
            </div>
            <Toaster />
        </form>
        </>
    )
}

export default CreateEvent