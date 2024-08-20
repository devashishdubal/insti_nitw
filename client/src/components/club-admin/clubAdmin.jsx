import React, { useState, useEffect, useContext } from 'react';
import './ClubAdmin.css'; // Import your CSS file
import axios from 'axios'
import { Link } from 'react-router-dom';
import './EventCard.css'
import { AuthContext } from '../../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
/*
chetankar65@gmail.com
12345678
*/

const ClubAdmin = () => {
  const [status,setStatus] = useState("member");
  const [adminSearch, setAdminSearch] = useState('');
  const [memberSearch, setMemberSearch] = useState('');
  const [owner, setOwner] = useState('');
  const { currentUser, userDetails } = useContext(AuthContext);
  const [admins,setAdmins] = useState([]);
  const [members,setMembers] = useState([]);

  const setMemberDetails = async () => {
    try{
      userDetails.club.clubMembers.forEach(async (userId) => {
        const response = await axios.get("http://localhost:8000/api/v1/users/getUserNameById/" + userId);
        setMembers((prev) => [...prev, {username:response.data,userID:userId}]);
      })
    } catch (e){
      console.log(e);
      toast.error(e.response.data, {
        duration: 1000,
        position: 'top-right',
        style: {marginTop: 70},
        className: '',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    }
  }

  const setAdminDetails = async () => {
    try{
      userDetails.club.clubAdmins.forEach(async (userId) => {
        const response = await axios.get("http://localhost:8000/api/v1/users/getUserNameById/" + userId);
        setAdmins((prev) => [...prev, {username:response.data,userID:userId}]);
      })
    } catch (e) {
      console.log(e);
      toast.error(e.response.data, {
        duration: 1000,
        position: 'top-right',
        style: {marginTop: 70},
        className: '',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    }
  }
  const handleAdminClick = async () => {
    try{
      if (status === "member"){
        toast.error('Members cannot add users!!', {
          duration: 1000,
          position: 'top-right',
          style: {marginTop: 70},
          className: '',
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        });
        return;
      }

      const response = await axios.put(`http://localhost:8000/api/v1/clubs/addAdmin`,{newClubAdmin:adminSearch,clubId:userDetails.club.clubId});
      // setAdmins(response.data);
      toast.success('Admin added!', {
        duration: 1000,
        position: 'top-right',
        style: {marginTop: 70},
        className: '',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
      setAdminSearch("");
    }
    catch(e) {
      console.log(e);
      toast.error(e.response.data, {
        duration: 1000,
        position: 'top-right',
        style: {marginTop: 70},
        className: '',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    }
  }

  const handleMemberClick = async () => {
    try{
      if (status === "member"){
        toast.error('Members cannot add users!!', {
          duration: 1000,
          position: 'top-right',
          style: {marginTop: 70},
          className: '',
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        });
        return;
      }
      await axios.put(`http://localhost:8000/api/v1/clubs/addMember`,{newClubMember:memberSearch,clubId:userDetails.club.clubId});
      toast.success('Member added!', {
        duration: 1000,
        position: 'top-right',
        style: {marginTop: 70},
        className: '',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
      setMemberSearch("");
    }
    catch(e) {
      console.log(e);
      toast.error(e.response.data, {
        duration: 1000,
        position: 'top-right',
        style: {marginTop: 70},
        className: '',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    }
  }

  const [events,setEvents] = useState([]);
  const fetchClubEvents = async () => {
    try{
      const response = await axios.get(`http://localhost:8000/api/v1/events/getEventDetails/club/${userDetails.club._id}`)
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
    // console.log(userDetails);
    setStatus(userDetails.status)
    setAdminDetails();
    setMemberDetails();
    fetchClubEvents();
  }, [])

  const logout = () => {
    window.location.href = 'http://localhost:8000/logout';
  }

  return (
    <div className="club-admin-container">
      <Link to="/clubs/create_event/">
          <button>+ Create event</button>
      </Link>
      <Link to="/clubs/create_event/">
          <button onClick={logout}>Logout</button>
      </Link>
      <div className='search-part'>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Add Admins"
            value={adminSearch}
            onChange={(e) => setAdminSearch(e.target.value)}
          />
          <button onClick={handleAdminClick}>Add Admin</button>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Add Members"
            value={memberSearch}
            onChange={(e) => setMemberSearch(e.target.value)}
          />
          <button onClick={handleMemberClick}>Add Member</button>
        </div>
      </div>
      <h3>Upcoming club events </h3>
      <div className='allEvents'>
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
      <div className='club-details'>
        <div>
          <h3>Admins</h3>
          {admins === null ? ("admin null") : (
            admins.map((admin) => (
              <div key={admin.userID}>
                {admin.username}
              </div>
            ))
          )}
        </div>
        <div>
          <h3>Members</h3>
          {
            members === null ? ("members null") : (
              members.map((member) => (
                <div key={member.userID}>
                  {member.username}
                </div>
              ))
            )
          }
        </div>
        
      </div>
      <Toaster/>
    </div>
  );
};

export default ClubAdmin;
