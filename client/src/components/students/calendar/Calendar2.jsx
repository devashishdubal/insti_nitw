import React, { useContext, useEffect, useRef, useState } from 'react'
import './Calendar2.css';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';

const Calendar2 = ({ dateSelected, setDateSelected, custom, setCustom}) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [date, setDate] = useState(new Date());
    const dispMonthYear = useRef(null);
    const dispDates = useRef(null);
    const [loading, setLoading] = useState(true);
    const [allevents , setAllEvents] = useState([]);
    const { userDetails } = useContext(AuthContext);
    
    const IncMonth = () => {
        let curr = date.getMonth();
        let year = date.getFullYear();
        curr = curr + 1;
        if (curr > 11) {
            curr = 0;
            year = year + 1;
        }
        setDate(new Date(year, curr));
    };

    const DecMonth = () => {
        let curr = date.getMonth();
        let year = date.getFullYear();
        curr = curr - 1;
        if (curr < 0) {
            curr = 11;
            year = year - 1;
        }
        setDate(new Date(year, curr));
    };

    const handleDateClick = (event) => {
        const selectedDay = parseInt(event.target.textContent);
        setDate(prevDate => {
            const selectedDate = new Date(prevDate.getFullYear(), prevDate.getMonth(), selectedDay);
            return selectedDate;
        });
    };

    const renderCalender = () => {
        const lastDateofMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const lastDayofMonth = new Date(date.getFullYear(), date.getMonth(), lastDateofMonth).getDay();
        const startDayofMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        const lastDateofLastMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        
        let daysArray = allevents.map(dateString => {
            const tempdate = new Date(dateString);
            return tempdate.getDate();
        });

        const calendarDays = [];

        console.log("daysArray", daysArray);
        // Add last month's dates
        for (let i = startDayofMonth; i > 0; i--) {
            calendarDays.push(<div key={`prev-${i}`} className="inactive days">{lastDateofLastMonth-i+1}</div>);
        }

        // Add current month's dates
        for (let i = 1; i <= lastDateofMonth; i++) {
            const isToday = i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear();
            const hasEvent = daysArray.includes(i);

            calendarDays.push(
                <div key={i} className={`${isToday ? 'active' : ''} ${hasEvent ? 'all-event' : ''} days`}>{i}</div>
            );
        }

        // Add next month's dates
        for (let i = 1; i <= 6 - lastDayofMonth; i++) {
            calendarDays.push(<div key={`next-${i}`} className='inactive days'>{i}</div>);
        }
        return calendarDays;
    };

    const fetchEventMonthWise = async (date) => {
        try{
          const response = await axios.get(`http://localhost:8000/api/v1/events/getEventMonthWise/${userDetails._id}/${date}`)
          setAllEvents(response.data.eventDates);
          setLoading(false);
        }catch(error){
          console.log(error);
          setLoading(false);
        }
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (dispMonthYear.current) {
                dispMonthYear.current.textContent = `${months[date.getMonth()]} ${date.getFullYear()}`;
            }
        }, 0);


        if (dateSelected !== null) {
            setDateSelected(date);
        }
        setLoading(true);
        setAllEvents([]);
        fetchEventMonthWise(date);
        setLoading(false); // Assuming no additional async operations
    }, [date]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const dispDatesElement = dispDates.current;
            
            if (dispDatesElement) {
                const handleClick = (event) => {
                    if (event.target !== dispDatesElement && dispDatesElement.contains(event.target)) {
                        handleDateClick(event); // Call your function when a child <div> is clicked
                    }
                };
    
                dispDatesElement.addEventListener('click', handleClick);
    
                // Cleanup function to remove the event listener when the component unmounts
                return () => {
                    dispDatesElement.removeEventListener('click', handleClick);
                };
            } else {
                console.log("dispDatesElement is null");
            }
        }, 0); // Delay execution until after the DOM has rendered
    
        return () => clearTimeout(timeoutId); // Cleanup to avoid memory leaks
    }, []); // Run once after the initial render
    
    

    return (
        <div>
            {loading ? (
                <div className="loader">Loading... </div>
            ) : (
                <div className="wrapper">                 
                    <div className='month'>
                        <div className='month-name'>
                            {/* September */}
                            {months[date.getMonth()]}
                        </div>
                        <div className='year'>
                            <div className='year-name'>
                                {date.getFullYear()}
                            </div>
                            <div className='icons'>
                                <span onClick={() => setCustom(!custom)}>{custom ? "-" : "+"}</span>
                                <span id="prev" className="material-symbols-rounded" onClick={DecMonth}>{`<`}</span>
                                <span id="next" className="material-symbols-rounded" onClick={IncMonth}>{`>`}</span>
                            </div>
                        </div>
                    </div>
                    <div className='calendar'>
                        <div className='week-names'>
                            <div>Sun</div>
                            <div>Mon</div>
                            <div>Tue</div>
                            <div>Wed</div>
                            <div>Thu</div>
                            <div>Fri</div>
                            <div>Sat</div>
                        </div>
                        <div ref={dispDates} className='calendar-dates'>
                            {renderCalender()}
                        </div>
                    </div>
                    <div className='dots'>
                        <div className='dots-child'></div>
                        <div className='dots-child'></div>
                        <div className='dots-child'></div>
                        <div className='dots-child'></div>
                        <div className='dots-child'></div>
                        <div className='dots-child'></div>
                        <div className='dots-child'></div>
                        <div className='dots-child'></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar2;
