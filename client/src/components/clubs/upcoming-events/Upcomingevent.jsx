import UpcomingEventCard from './upcomingeventcard';
import React, { useEffect, useState } from 'react';
import { recentEvents } from '../../../dummydata/recenteventsdata';
import "./upcomingevent.css"
import axios from "axios";

export default function UpcomingEvents() {
  const [allCards, setAllCards] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/events/upcomingEvents/');
            setData(response.data);
            console.log(response.data)
            const cards = response.data.map((event, index) => ({
                id: index + 1,
                card: (
                  <UpcomingEventCard key={index} recenteventdata={event} />
                ),
            }));
            setAllCards(cards);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    fetchData();
  }, []);
  return (
    <>
    <div className='recent-events-container'>
    {allCards.length !== 0 ? (
      allCards.map((card) => (
        <div key={card.id}>
          {card.card}
        </div>
      ))
    ) : (
      <div className='no-events'>
        <p className='msg1'>No upcoming events</p> 
        <p className='msg2'>Don't worry, you will be notified when there are new events</p>
        <img src={process.env.PUBLIC_URL + "../assets/nothing-here.png"} alt='There is nothing here'/>  
      </div>
    )}

    </div>
    </>
  )
}
