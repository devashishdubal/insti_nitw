import CalendarLayout from "../../../layout/CalenderLayout";
import { useState, useEffect } from "react";
import CustomEvents from "./CustomEvents";

const CalendarPage = () => {
    const [dateSelected, setDateSelected] = useState(new Date());
    const [eventPage, setEventPage] = useState(<CustomEvents dateSelected={new Date()} />);
    const [CustomButtonSelected, setButtonSelect] = useState(1);

    const CustomButtonClick = () => {
        if (CustomButtonSelected == 0) setButtonSelect(1);
        else setButtonSelect(0);
    }
    const handleClick = (date1) => {
        setDateSelected(date1);
    };
    // useEffect(() => {
    //   console.log(dateSelected);
    // }, [dateSelected]);

    useEffect(() => {
        console.log(dateSelected);
        if (CustomButtonSelected == 1) setEventPage(<CustomEvents dateSelected={dateSelected} />);
        else setEventPage(<div>Event description</div>);
        console.log(CustomButtonSelected);
    }, [CustomButtonSelected, dateSelected])


    return (
        <CalendarLayout dateSelected={dateSelected} setDateSelected={handleClick} eventPage={eventPage} CustomButtonSelected={CustomButtonSelected} setButtonSelect={CustomButtonClick} />
    );
};

export default CalendarPage;