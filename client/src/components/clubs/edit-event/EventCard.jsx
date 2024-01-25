import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const EventCard = () => {
  const [events,setEvents] = useState([]);
  //const [club,setClub] = useState('CSES');
  const fetchClubEvents = async () => {
    try{
      const response = await axios.get(`http://localhost:8000/api/v1/events/getEventDetails/club/6592a8cd1f5a26e6d44749c6`)
      const e1 = response.data.map((event,index) => ({
        id: index+1,
        card:
          <Link to={`/clubs/edit_event/${event._id}`}>
            <div className="event-card">
                {/* <img src={imageUrl} alt={title} className="event-image" /> */}
                <div className="event-details">
                    <h3 className="event-title">{event.eventName}</h3>
                    <p className="event-info">{event.eventDateTime}</p>
                    {/* <p className="event-info">Time</p> */}
                    <p className="event-info">{event.eventVenue}</p>
                </div>
              </div>
          </Link>
      }));
      setEvents(e1);
    }
    catch(e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchClubEvents();
  }, [])
  
  // useEffect(() => {
  //   console.log(events);
  
  // }, [events])
  
  return (
    <>
        {events.length === 0 ? (
          <p>Loading...</p>
        ):(
          events.map((event) => (
            <div key={event.id}>
              {event.card}
            </div>
          )
        ))}
    </>
  )
}

export default EventCard