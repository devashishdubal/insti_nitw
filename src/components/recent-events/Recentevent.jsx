import Recenteventcard from './recenteventcard';
import React, { useEffect, useState } from 'react';
import { recentEvents } from '../../dummydata/recenteventsdata';
import "./recentevent.css"

export default function Recentevent() {
//   const [recentEvents,setRecentEvents] = useState([]);


  return (
    <>
    <h1>Recent Events</h1>
    <div className='recent-events-container'>
        {recentEvents.map(r=>(
            <Recenteventcard key={r.id} recenteventdata={r} />
        ))}
    </div>
    </>
  )
}
