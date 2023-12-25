import CalendarLayout from "../../../layout/CalenderLayout";
import { useState,useEffect } from "react";
import CustomEvents from "./CustomEvents";



const CalendarPage = () => {
    const [dateSelected,setDateSelected] = useState(null);
    const [eventPage,setEventPage] = useState(<CustomEvents />);

    const decideEventPage = () => {
        if (dateSelected == null) setEventPage(<CustomEvents />);
        else setEventPage(<div>Event descrip</div>);
    };
    const handleClick = (date1) => {
        setDateSelected(date1);
    };
    useEffect(() => {
      console.log(dateSelected);
      decideEventPage();
    }, [dateSelected]);
    
    return(
        <CalendarLayout dateSelected={dateSelected} setDateSelected={handleClick} eventPage={eventPage} setEventPage={setEventPage}/>
    );
};

export default CalendarPage;