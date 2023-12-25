import "./CustomEvents.css";
import { useEffect, useRef } from "react";

const CustomEvents = ({dateSelected}) => {
    const dateComp = useRef(null);
    const setDate = () => {
        dateComp.current.innerHTML = `${dateSelected.getDate()} / ${dateSelected.getMonth() + 1} / ${dateSelected.getFullYear()}`;
    };
    useEffect(() => {
      setDate();    
    }, [dateSelected])
    
    return (
        <div className="custom-wrapper">
            <div className="custom-desc"> Add Custom Event</div>
            <div className="label-container">
                <div className="label-desc">Label:</div>
                <div className="label-color"></div>
                <div className="label-color"></div>
                <div className="label-color"></div>
                <div className="label-color custom"></div>
            </div>
            <div className="title-container">
                <label for="title" className="title-desc">Title: </label>
                <input type="text" id="title" name="title" />
            </div>
            <div className="datetime-container">
                <label  for="date" className="datetime-desc">Date: </label>
                <div ref={dateComp} id="date"></div>
                <label for="time" className="datetime-desc">Time: </label>
                <input type="time" id="time" name="time" />
            </div>
        </div>
    )
}

export default CustomEvents