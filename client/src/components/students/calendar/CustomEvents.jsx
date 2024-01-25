import "./CustomEvents.css";
import { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import toast, { Toaster } from 'react-hot-toast';

const CustomEvents = ({ dateSelected }) => {
    const dateComp = useRef(null);
    const setDate = () => {
        dateComp.current.value = `${dateSelected.getDate()} / ${dateSelected.getMonth() + 1} / ${dateSelected.getFullYear()}`;
    };

    useEffect(() => {
        setDate();
    }, [dateSelected])

    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");
    const { userDetails } = useContext(AuthContext)

    const createCustomEvent = async () => {
        if (title.length === 0 || time.length === 0) {
            toast.error('Some fields are empty!', {
                duration: 3000,
                position: 'top-right',
                style: {marginTop: 70},
                className: '',
                ariaProps: {
                  role: 'status',
                  'aria-live': 'polite',
                },
            });
            return;
        }
        try {
            let dateToBeSubmitted = dateSelected;
            const [hours, minutes] = time.split(":");
            dateToBeSubmitted.setHours(hours);
            dateToBeSubmitted.setMinutes(minutes);
            dateToBeSubmitted.setSeconds(0);

            const data = {"eventTitle": title, userId: userDetails._id, eventDateTime: dateToBeSubmitted};
            const response = await axios.post('http://localhost:8000/api/v1/events/createCustomEvent/', 
                data
            );
      
            console.log(response.data);
            toast.success('Custom event added to your calendar!', {
                duration: 3000,
                position: 'top-right',
              
                // Styling
                style: {},
                className: '',
                // Aria
                ariaProps: {
                  role: 'status',
                  'aria-live': 'polite',
                },
              });
            // Optionally update state or perform other actions based on the response
          } catch (error) {
            console.error(error);
            // Handle error
          }
    }

    return (
        <>
            <div className="custom-wrapper">
                <div className="custom-desc"> Add Custom Event</div>
                <div className="label-container custom-wrapper-inner-container">
                    <div className="desc">Label:</div>
                    <div className="label-color-container">
                        <div className="label-color" id="label-color-purple"></div>
                        <div className="label-color" id="label-color-green"></div>
                        <div className="label-color" id="label-color-blue"></div>
                        <input className="label-color" type="color" name="color" />
                    </div>
                </div>
                <div className="title-container custom-wrapper-inner-container">
                    <label for="title" className="desc">Title:</label>
                    <input type="text" id="title" name="title" onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="custom-wrapper-inner-container">
                    <label for="date" className="datetime-desc">Date: </label>
                    <input type="text" ref={dateComp} id="date" readOnly name="date"/>
                </div>
                <div className="time-submit-container custom-wrapper-inner-container">
                    <div className="time-container">
                        <label for="time" className="desc">Time:</label>
                        <input type="time" id="time" name="time" onChange={(e) => setTime(e.target.value)}/>
                    </div>
                    <button class="submit" type="submit" onClick={createCustomEvent}>Add</button>
                    <Toaster/>
                </div>
            </div>
        </ >
    )
}

export default CustomEvents