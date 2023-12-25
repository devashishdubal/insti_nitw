import Calendar from "../components/students/calendar/Calendar";
import CustomEvents from "../components/students/calendar/CustomEvents";
import "./CalenderLayout.css";

const CalendarLayout = ({dateSelected,setDateSelected,eventPage,setEventPage}) => {
    return (
        <div className="calendar-wrapper">
            <div className="calender">
                <Calendar dateSelected={dateSelected} setDateSelected={setDateSelected} eventPage={eventPage} setEventPage={setEventPage}/>
            </div>
            <div className="event">
                {eventPage}
            </div>
        </div>
    );
};

export default CalendarLayout;