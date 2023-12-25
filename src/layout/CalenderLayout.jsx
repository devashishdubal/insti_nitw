import Calendar from "../components/students/calendar/Calendar";
import CustomEvents from "../components/students/calendar/CustomEvents";
import "./CalenderLayout.css";

const CalendarLayout = ({dateSelected,setDateSelected}) => {
    return (
        <div className="calendar-wrapper">
            <div className="calender">
                <Calendar dateSelected={dateSelected} setDateSelected={setDateSelected}/>
            </div>
            <div className="event">
                <CustomEvents />
            </div>
        </div>
    );
};

export default CalendarLayout;