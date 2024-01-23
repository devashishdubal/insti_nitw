import Calendar from "../components/students/calendar/Calendar";
import CustomEvents from "../components/students/calendar/CustomEvents";
import "./CalenderLayout.css";
import { useState } from "react";

const CalendarLayout = ({dateSelected,setDateSelected,eventPage,CustomButtonSelected,setButtonSelect}) => {
    const [events, setEvents] = useState([]);
    const [custom, setCustom] = useState(false);
    const [date, setDate] = useState(new Date());
    return (
        <div className="calendar-wrapper">
            <div className="calender">
                <Calendar setEvents={setEvents} dateSelected={date} setDateSelected={setDate} CustomButtonSelected={CustomButtonSelected} setCustom={setCustom} custom = {custom}/>
            </div>
            <div className="event">
            {custom ? <CustomEvents dateSelected={date}/> : events.length > 0 ? (
                <div>
                    <div className="collegeEvents">
                        <h3>College events</h3>
                        {events.map(event => (
                            <div key={event._id} className="individualEvent">
                                <img src={event.eventOrganizer.clubLogo} alt="logo"/>
                                <div className="details">
                                <p className="eventTitle">
                                {event.eventName}
                                </p>
                                <p className="clubName">
                                    Organized by: 
                                    {event.eventOrganizer.clubName}
                                </p>
                                </div>
                            </div>
                            // Replace 'name' and 'date' with the actual fields in your event model
                        ))}
                    </div>
                    <div className="customEvents">
                        <h3>Custom events</h3>
                    </div>
                </div>
            ) : (
                <div className="individualEvent">
                    No events
                </div>
            )}
            </div>
        </div>
    );
};

export default CalendarLayout;