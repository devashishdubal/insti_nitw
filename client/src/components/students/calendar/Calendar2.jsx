import React, { useEffect, useRef, useState } from 'react'
import './Calendar.css';

const Calendar2 = ({dateSelected,setDateSelected,custom,setCustom}) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [date,setDate] = useState(new Date());
    const dispMonthYear = useRef(null);
    const dispDates = useRef(null);


    const IncMonth = () => {
        let curr = date.getMonth();
        let year = date.getFullYear()
        curr = curr + 1;
        if (curr > 11){
            curr = 0;
            year = year+1;
        }
        setDate(new Date(year,curr));
    }
    const DecMonth = () => {
        let curr = date.getMonth();
        let year = date.getFullYear()
        curr = curr - 1;
        if (curr < 0){
            curr = 11;
            year = year - 1;
        }
        setDate(new Date(year,curr));
    }

    const handleDateClick = (event) => {
        const selectedDay = parseInt(event.target.textContent);
        const selectedDate = new Date(date.getFullYear(), date.getMonth(), selectedDay);
        console.log(selectedDate);
        setDate(selectedDate);
        setDateSelected(selectedDate);
    };
    

    const renderCalender = () => {
        const lastDateofMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const lastDayofMonth = new Date(date.getFullYear(), date.getMonth(), lastDateofMonth).getDay();
        const startDayofMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        const lastDateofLastMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        let liTag = "";
    
        dispMonthYear.current.textContent = `${months[date.getMonth()]} ${date.getFullYear()}`;
        for (let i = startDayofMonth; i > 0; i--) {
          liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
        }
        for (let i = 1; i <= lastDateofMonth; i++) {
          let isToday = i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()
            ? "active" : "";
          liTag += `<li class="${isToday}">${i}</li>`;
        }
        for (let i = 1; i <= 6 - lastDayofMonth; i++) {
          liTag += `<li class="inactive">${i}</li>`;
        }
        dispDates.current.innerHTML = liTag;
        // const liElements = dispDates.current.querySelectorAll('li');
        // liElements.forEach((li) => {
        //     li.addEventListener('click', handleDateClick);
        // });
        // dispDates.current = liElements;
        // console.log(dispDates.current);
        dispDates.current.addEventListener('click', (event) => {
          if (event.target.tagName === 'LI') {
            handleDateClick(event); // Call your function when an <li> is clicked
          }
        });
        // console.log(dispDates.current);
    };

    useEffect(() => {
      renderCalender();
    }, [date])
    
    return (
        <div className="wrapper">
            <header>
                <p ref={dispMonthYear} className="current-date"></p>
                <div className="icons">
                <span onClick={() => setCustom(!custom)}>{custom ? "-": "+"}</span>
                <span id="prev" className="material-symbols-rounded" onClick={DecMonth}>{`<`}</span>
                <span id="next" className="material-symbols-rounded" onClick={IncMonth}>{`>`}</span>
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
    )
}

export default Calendar2