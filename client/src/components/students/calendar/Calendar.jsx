import React, { useState, useEffect, useRef, useContext } from 'react';
import CustomEvents from './CustomEvents';
import './Calendar.css';
import axios from "axios"
import { AuthContext } from "../../../Context/AuthContext";

const Calendar = ({ dateSelected, setEvents, setDateSelected, CustomButtonSelected, setCustom, custom, setCustomEvents }) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let date = new Date();
  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth();
  const dispMonthYear = useRef(null);
  const dispDates = useRef(null);
  const { userDetails } = useContext(AuthContext)

  const fetchEvents = async (date) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/events/collegeEvents/${date}`);
        setEvents(response.data);
      } catch (error) {
        console.log(error)
      }
  }

  const fetchCustomEvents = async (date) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/events/getCustomEvents/${userDetails._id}/${date}`);
      setCustomEvents(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDateClick = (event) => {
    const litag = event.target;
    const textInElement = litag.textContent;
    //setDateSelected(new Date(currentYear, currentMonth, parseInt(textInElement)));
    let selectedDate = new Date(currentYear, currentMonth, parseInt(textInElement));

    fetchEvents(selectedDate)
    fetchCustomEvents(selectedDate)
    setDateSelected(selectedDate)
    // get event on this particular date and list them on the right
    // Remove "selected" class from previously selected element, if any
    const prev = dispDates.current.querySelectorAll('li');
    prev.forEach(element => {
      if (element.classList.contains('selected'))
        element.classList.remove('selected');
    });

    // Add "selected" class to the clicked element
    litag.classList.add('selected');
  };

  const renderCalender = () => {
    const lastDateofMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const lastDayofMonth = new Date(currentYear, currentMonth, lastDateofMonth).getDay();
    const startDayofMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDateofLastMonth = new Date(currentYear, currentMonth, 0).getDate();
    let liTag = "";

    dispMonthYear.current.textContent = `${months[currentMonth]} ${currentYear}`;
    for (let i = startDayofMonth; i > 0; i--) {
      liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }
    for (let i = 1; i <= lastDateofMonth; i++) {
      let isToday = i === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()
        ? "active" : "";
      liTag += `<li class="${isToday}">${i}</li>`;
    }
    for (let i = 1; i <= 6 - lastDayofMonth; i++) {
      liTag += `<li class="inactive">${i}</li>`;
    }
    dispDates.current.innerHTML = liTag;
    dispDates.current.addEventListener('click', (event) => {
      if (event.target.tagName === 'LI') {
        handleDateClick(event); // Call your function when an <li> is clicked
      }
    });
  };

  const handleArrowClick = (id) => {
    currentMonth = id === "prev" ? currentMonth - 1 : currentMonth + 1;
    if (currentMonth < 0 || currentMonth > 11) {
      date = new Date(currentYear, currentMonth);
      currentMonth = date.getMonth();
      currentYear = date.getFullYear();
    }
    renderCalender();
  };


  useEffect(() => {
    renderCalender();
  }, []);


  return (
    <div className="wrapper">
      <header>
        <p ref={dispMonthYear} className="current-date"></p>
        <div className="icons">
          <span onClick={() => setCustom(!custom)}>{custom ? "-": "+"}</span>
          <span id="prev" className="material-symbols-rounded" onClick={() => handleArrowClick('prev')}>{`<`}</span>
          <span id="next" className="material-symbols-rounded" onClick={() => handleArrowClick("next")}>{`>`}</span>
        </div>
      </header>
      <div className="calendar">
        <ul className="weeks">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <ul ref={dispDates} className="days"></ul>
      </div>
    </div>
  );
};
export default Calendar;