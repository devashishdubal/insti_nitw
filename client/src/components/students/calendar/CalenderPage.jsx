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
        // console.log(dateSelected)
    };
    // useEffect(() => {
    //   console.log(dateSelected);
    // }, [dateSelected]);

    return (
        <CalendarLayout />
    );
};

export default CalendarPage;