import { useEffect, useState, useContext } from "react";
import ClubCard from "./clubCard";
import axios from "axios";
import "./clubs.css";
import { AuthContext } from "../../../Context/AuthContext";

const ClubList = () => {
    const [allCards, setAllCards] = useState([]);
    const [data, setData] = useState(null);
    const { userDetails } = useContext(AuthContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/clubs/getAllClubs/?username=${userDetails.username}`);
                setData(response.data);
                const cards = response.data.map((club, index) => ({
                    id: index + 1,
                    card: (
                        <ClubCard
                            key={index}
                            imageLink={club._doc.clubLogo}
                            clubName={club._doc.clubName}
                            clubDescription={club._doc.clubDescription}
                            clubId={club._doc.clubId}
                            isSubscribed={club.userIsSubscribed}
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
