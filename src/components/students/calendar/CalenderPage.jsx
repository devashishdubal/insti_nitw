import CalendarLayout from "../../../layout/CalenderLayout";
import { useState,useEffect } from "react";
import CustomEvents from "./CustomEvents";



const CalendarPage = () => {
    const [dateSelected,setDateSelected] = useState(new Date());
    const [eventPage,setEventPage] = useState(<CustomEvents dateSelected={new Date()}/>);
    const [CustomButtonSelected,setButtonSelect] = useState(1);

    const CustomButtonClick = (val) => {
        setButtonSelect(val);
    }
    const handleClick = (date1) => {
        setDateSelected(date1);
    };
    useEffect(() => {
      console.log(dateSelected);
    }, [dateSelected]);

    useEffect(() => {
      if (CustomButtonSelected == 1) setEventPage(<CustomEvents dateSelected={dateSelected}/>);
      else setEventPage(<div>Event description</div>);
    }, [CustomButtonSelected])
    
    
    return(
        <CalendarLayout dateSelected={dateSelected} setDateSelected={handleClick} eventPage={eventPage} CustomButtonSelected={CustomButtonSelected} setButtonSelect={CustomButtonClick}/>
    );
};

export default CalendarPage;