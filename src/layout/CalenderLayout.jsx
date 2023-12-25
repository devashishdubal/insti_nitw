import Calendar from "../components/students/calendar/Calendar";

const CalendarLayout = ({dateSelected,setDateSelected}) => {

    return (
        <div className="main">
            <div className="calender">
                <Calendar dateSelected={dateSelected} setDateSelected={setDateSelected}/>
            </div>
            <div className="event">
                This is where the event description will be.
            </div>
        </div>
    );
};

export default CalendarLayout;