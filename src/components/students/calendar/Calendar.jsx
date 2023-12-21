import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = () => {
    const [currDate, setCurrDate] = useState(new Date());
    const [currYear, setCurrYear] = useState(currDate.getFullYear());
    const [currMonth, setCurrMonth] = useState(currDate.getMonth());
  
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const renderCalendar = () => {
      const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
      const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
      const lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
      const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
      let liTag = [];
  
      for (let i = firstDayofMonth; i > 0; i--) {
        liTag.push(<li key={`inactive-${i}`} className="days-item inactive">{lastDateofLastMonth - i + 1}</li>);
      }
  
      for (let i = 1; i <= lastDateofMonth; i++) {
        const isToday = i === currDate.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        liTag.push(<li key={`active-${i}`} className={`days-item ${isToday}`}>{i}</li>);
      }
  
      for (let i = lastDayofMonth; i < 6; i++) {
        liTag.push(<li key={`inactive-last-${i}`} className="days-item inactive">{i - lastDayofMonth + 1}</li>);
      }
  
      return liTag;
    };
  
    useEffect(() => {
      renderCalendar();
    }, [currMonth, currYear]);
  
    const handleIconClick = (direction) => {
      setCurrMonth(direction === "prev" ? currMonth - 1 : currMonth + 1);
  
      if (currMonth < 0 || currMonth > 11) {
        setCurrDate(new Date(currYear, currMonth, new Date().getDate()));
        setCurrYear(currDate.getFullYear());
        setCurrMonth(currDate.getMonth());
      } else {
        setCurrDate(new Date());
      }
    };
  
    return (
      <div className="calendar-wrapper">
        <header>
          <p className="current-date">{`${months[currMonth]} ${currYear}`}</p>
          <div className="icons">
            <span id="prev" className="material-symbols-rounded" onClick={() => handleIconClick("prev")}>chevron_left</span>
            <span id="next" className="material-symbols-rounded" onClick={() => handleIconClick("next")}>chevron_right</span>
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
          <ul className="days">
            {renderCalendar().map((item, index) => (
              <React.Fragment key={index}>{item}</React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    );
  };
export default Calendar;