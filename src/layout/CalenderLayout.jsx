import Calendar from "../components/students/calendar/Calendar";
import CustomEvents from "../components/students/calendar/CustomEvents";
import "./CalenderLayout.css";

const CalendarLayout = () => {
    return (
        <div className="calendar-wrapper">
            <div className="calender">
                <Calendar />
            </div>
            <div className="event">
                <CustomEvents />
            </div>
        </div>
    );
};

export default CalendarLayout;