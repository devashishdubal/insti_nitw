import Calendar from "../components/students/calendar/Calendar";
import CustomEvents from "../components/students/calendar/CustomEvents";

const CalendarLayout = () => {

    return (
        <div className="main">
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