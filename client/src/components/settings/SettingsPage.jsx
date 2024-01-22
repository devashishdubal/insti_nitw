import React, { useState, useEffect } from 'react'
import "./SettingsPage.css";
import { Link } from 'react-router-dom';

const SettingsPage = () => {
    const [click, setClick] = useState('settings')
    const [content,setContent] = useState(
        <>
            <div className='title'>Settings Page</div>
            <div className='allOptions'>
                    <div className='option' onClick={() => {setClick('manage')}}>Manage Subscriptions</div>
            </div>
        </>
    )
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
        setContent(
            <>
                <div className='title'>Manage Subscriptions</div>
                <div className='title'>Subscribed</div>
                <div className='subscribed_clubs'>
                    <div className='clubSec'>
                        <div>Club Logo</div>
                        <div>Club Name</div>
                        <div>Club Description</div>
                        <button>Unsubscribe</button>
                    </div>
                </div>
                <div className='title'>Unsubscribed</div>
                <div className='unsubscribed_clubs'>
                    <div className='clubSec'>
                        <div>Club Logo</div>
                        <div>Club Name</div>
                        <div>Club Description</div>
                        <button>Subscribe</button>
                    </div>
                </div>
            </>
        )
      }
    
    }, [click])
    
  return (
    <>
        {content}
    </>
  )
}

export default SettingsPage