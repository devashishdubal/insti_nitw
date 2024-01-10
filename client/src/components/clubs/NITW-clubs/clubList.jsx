import { useEffect, useState } from "react";
import ClubCard from "./clubCard";
import axios from "axios";
import "./clubs.css";

const ClubList = () => {
    const [allCards, setAllCards] = useState([]);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/clubs/getAllClubs/');
                setData(response.data);

                const cards = response.data.map((club, index) => ({
                    id: index + 1,
                    card: (
                        <ClubCard
                            key={index}
                            imageLink={club.clubLogo}
                            clubName={club.clubName}
                            clubDescription={club.clubDescription}
                        />
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
        <div className="allClubs">
            {allCards.map((card) => (
                <div key={card.id} className="card_outside_container">
                    {card.card}
                </div>
            ))}
        </div>
    );
};

export default ClubList;
