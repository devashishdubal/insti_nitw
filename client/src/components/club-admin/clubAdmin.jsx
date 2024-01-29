import React, { useState, useEffect, useContext } from 'react';
import './ClubAdmin.css'; // Import your CSS file
import axios from 'axios'
import { Link } from 'react-router-dom';
import './EventCard.css'
import { AuthContext } from '../../Context/AuthContext';

const ClubAdmin = () => {
  const [adminSearch, setAdminSearch] = useState('');
  const [memberSearch, setMemberSearch] = useState('');
  const { currentUser, userDetails } = useContext(AuthContext);

  const [events,setEvents] = useState([]);
  //const [club,setClub] = useState('CSES');
  const fetchClubEvents = async () => {
    try{
      const response = await axios.get(`http://localhost:8000/api/v1/events/getEventDetails/club/${userDetails._id}`)
      const e1 = response.data.map((event,index) => ({
        id: index+1,
        card:
          <Link to={`/clubs/edit_event/${event._id}`}>
            <div className="event-card">
                {/* <img src={imageUrl} alt={title} className="event-image" /> */}
                <div className="event-details">
                    <h3 className="event-title">{event.eventName}</h3>
                    <div className='dateAndTime'>
                      <span>{new Date(event.eventDateTime).toLocaleDateString()} • {new Date(event.eventDateTime).toLocaleTimeString()}</span>
                    </div>
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

  return (
    <div className="club-admin-container">
      <div className='search-part'>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Add Admins"
            value={adminSearch}
            onChange={(e) => setAdminSearch(e.target.value)}
          />
          <button>Add Admin</button>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Add Members"
            value={memberSearch}
            onChange={(e) => setMemberSearch(e.target.value)}
          />
          <button>Add Member</button>
        </div>
      </div>
      <h3>Upcoming club events </h3>
        <div>
        {events.length === 0 ? (
          <p>Loading...</p>
        ):(
          events.map((event) => (
            <div key={event.id}>
              {event.card}
            </div>
          )
        ))}
        </div>
      {/* Add other components or elements as needed */}
    </div>
  );
};

export default ClubAdmin;
