import React, { useState, useEffect,useContext } from 'react'
import "./SettingsPage.css";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { AuthContext } from '../../Context/AuthContext';
import ClubCard from '../clubs/NITW-clubs/clubCard';

const SettingsPage = () => {
    const [subclubs,setSubClubs] = useState(null);
    const [unsubclubs,setUnSubClubs] = useState(null);
    const [click, setClick] = useState('settings')
    const { userDetails } = useContext(AuthContext)
    const [content,setContent] = useState(
        <>
            <div className='title'>Settings Page</div>
            <div className='allOptions'>
                    <div className='option' onClick={() => {setClick('manage')}}>Manage Subscriptions</div>
            </div>
        </>
    )
    const fetchClubs = async () => {
        const response = await axios.get(`http://localhost:8000/api/v1/clubs/getAllClubs/?username=${userDetails._id}`);
        const subcards = response.data.filter(club => club.userIsSubscribed).map((club, index) => ({
            id: index + 1,
            card: (
                <ClubCard
                    key={index}
                    imageLink={club._doc.clubLogo}
                    clubName={club._doc.clubName}
                    clubDescription={club._doc.clubDescription}
                    clubId={club._doc._id}
                    isSubscribed={club.userIsSubscribed}
                />
            ),
        }));
        setSubClubs(subcards);
        const unsubcards = response.data.filter(club => !club.userIsSubscribed).map((club, index) => ({
            id: index + 1,
            card: (
                <ClubCard
                    key={index}
                    imageLink={club._doc.clubLogo}
                    clubName={club._doc.clubName}
                    clubDescription={club._doc.clubDescription}
                    clubId={club._doc._id}
                    isSubscribed={club.userIsSubscribed}
                />
            ),
        }));
        setUnSubClubs(unsubcards);
    }

    useEffect(() => {
      if (click == 'settings'){
        setContent(
            <>
                <div className='title'>Settings Page</div>
                <div className='allOptions'>
                        <div className='option' onClick={() => {setClick('manage')}}>Manage Subscriptions</div>
                </div>
            </>
        );
      }
      else if (click == 'manage'){
        fetchClubs();
      }
    
    }, [click])

    useEffect(() => {
      if (click == 'manage')
      {
        setContent(
            <>
                <span onClick={() => {setClick('settings')}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="back_button">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </span>
                <div className='title'>Manage Subscriptions</div>
                <div className='title'>Subscribed</div>
                <div className='subscribed_clubs'>
                    {subclubs.map((club) => (
                        <div key={club.id} className="card_outside_container">
                            {club.card}
                        </div>
                    ))}
                </div>
                <div className='title'>Unsubscribed</div>
                <div className='unsubscribed_clubs'>
                    {unsubclubs.length === 0 ? (
                        <p>There's nothing to display here</p>
                    ) : (
                        unsubclubs.map((club) => (
                        <div key={club.id} className="card_outside_container">
                            {club.card}
                        </div>
                        ))
                    )}
                </div>
            </>
            )
        }
    }, [subclubs,unsubclubs])
    
    
  return (
    <>
        {content}
    </>
  )
}

export default SettingsPage