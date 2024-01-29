import Calendar from "../components/students/calendar/Calendar";
import CustomEvents from "../components/students/calendar/CustomEvents";
import "./CalenderLayout.css";
import { useState } from "react";

const CalendarLayout = ({CustomButtonSelected}) => {
    console.log("Cal")
    const [events, setEvents] = useState([]);
    const [custom, setCustom] = useState(false);
    const [date, setDate] = useState(new Date());
    const [customEvents, setCustomEvents] = useState([]);
    return (
        <div className="calendar-wrapper">
            <div className="calender">
                <Calendar setEvents={setEvents} dateSelected={date} setDateSelected={setDate} CustomButtonSelected={CustomButtonSelected} setCustom={setCustom} custom={custom} setCustomEvents={setCustomEvents}/>
            </div>
            <div className="event">
            {custom ? <CustomEvents dateSelected={date}/> : events.length > 0 || customEvents.length > 0 ? (
                <div>
                    <div className="collegeEvents">
                        {events.length > 0 && <h3>College events</h3>}
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
                        {customEvents.length > 0 && <h3>Custom events</h3>}
                        {customEvents.map(event => (
                            <div key={event._id} className="individualEvent">
                                <div className="customEventCard">
                                    <div className="details">
                                    <p className="eventTitle">
                                    <p>Custom event: </p>
                                    <p>{event.eventTitle}</p>
                                    </p>
                                    </div>
                                    <p>
                                        {new Date(event.eventDateTime).toLocaleDateString('en-GB', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit'
                                        })}
                                        </p>
                                </div>
                            </div>
                            // Replace 'name' and 'date' with the actual fields in your event model
                        ))}
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