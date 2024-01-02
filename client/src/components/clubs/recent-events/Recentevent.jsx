import Recenteventcard from './recenteventcard';
import React, { useEffect, useState } from 'react';
import { recentEvents } from '../../../dummydata/recenteventsdata';
import "./recentevent.css"
import axios from "axios";

export default function Recentevent() {
  const [allCards, setAllCards] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/events/recentEvents/');
            setData(response.data);

            const cards = response.data.map((event, index) => ({
                id: index + 1,
                card: (
                  <Recenteventcard key={index} recenteventdata={event} />
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
        {allCards.map((card) => (
            <div key={card.id}>
              {card.card}
            </div>
        ))}
    </div>
    </>
  )
}
