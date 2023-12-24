import Calendar from "../components/students/calendar/Calendar";

const CalendarLayout = () => {

    return (
        <div className="main">
            <div className="calender">
                <Calendar />
            </div>
            <div className="event">
                This is where the event description will be.
            </div>
        </div>
    );
};

export default CalendarLayout;