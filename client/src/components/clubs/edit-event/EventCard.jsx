import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const EventCard = () => {
  const [events,setEvents] = useState(null);
  const [club,setClub] = useState('CSES');
  const fetchClubEvents = async () => {
    try{
      const response = await axios.get(`http://localhost:8000/api/v1/events/getEventDetails/${club}`)
      setEvents(response.data);
    }
    catch(e) {
      console.log(e);
    }
  }
  useEffect(() => {
    console.log(events);
  
  }, [events])
  
  return (
    <>
        <Link to={`/clubs/edit_event/1`}>
        <div className="event-card">
            {/* <img src={imageUrl} alt={title} className="event-image" /> */}
            <div className="event-details">
                <h3 className="event-title">Title</h3>
                <p className="event-info">Date</p>
                <p className="event-info">Time</p>
                <p className="event-info">Venue</p>
            </div>
            </div>
        </Link>
    </>
  )
}

export default EventCard