import CalendarLayout from "../../../layout/CalenderLayout";
import { useState,useEffect } from "react";


const CalendarPage = () => {
    const [dateSelected,setDateSelected] = useState(new Date());
    const handleClick = (date1) => {
        setDateSelected(date1);
    };
    useEffect(() => {
      console.log(dateSelected);
    }, [dateSelected]);
    
    return(
        <CalendarLayout dateSelected={dateSelected} setDateSelected={handleClick}/>
    );
};

export default CalendarPage;