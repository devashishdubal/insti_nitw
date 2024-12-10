import Calendar2 from "../components/students/calendar/Calendar2";
import CustomEvents from "../components/students/calendar/CustomEvents";
import "./CalenderLayout.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const CalendarLayout = ({ CustomButtonSelected }) => {
  const [events, setEvents] = useState([]);
  const [custom, setCustom] = useState(false);
  const [date, setDate] = useState(new Date());
  const [customEvents, setCustomEvents] = useState([]);
  const { userDetails } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  //   const baseUrl = process.env.REACT_APP_API_BASE_URL; // Base URL from .env

  const fetchEvents = async (date) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/events/collegeEvents/${date}`
      );
      setEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCustomEvents = async (date) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/events/getCustomEvents/${userDetails._id}/${date}`
      );
      setCustomEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents(date);
    fetchCustomEvents(date);
  }, [date]);

  return (
    <div>
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="calendar-wrapper">
          <div className="calender">
            <Calendar2
              dateSelected={date}
              setDateSelected={setDate}
              setCustom={setCustom}
              custom={custom}
            />
          </div>
          <div className="event">
            {custom ? (
              <CustomEvents dateSelected={date} />
            ) : events.length > 0 || customEvents.length > 0 ? (
              <div>
                <div className="collegeEvents">
                  {events.length > 0 && <h1>College events:</h1>}
                  {events.map((event) => (
                    <div key={event._id} className="individualEvent">
                      <img src={event.eventOrganizer.clubLogo} alt="logo" />
                      <div className="details">
                        <p className="eventTitle">{event.eventName}</p>
                        <p className="clubName">
                          Organized by: {" " + event.eventOrganizer.clubName}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="customEvents">
                  {customEvents.length > 0 && <h1>Custom events</h1>}
                  {customEvents.map((event) => (
                    <div key={event._id} className="individualEvent">
                      <div className="details">
                        <p className="eventTitle">
                          <p>Event Name: </p>
                          <p>{event.eventTitle}</p>
                        </p>
                      </div>
                      <p className="event-date">
                        {new Date(event.eventDateTime).toLocaleDateString(
                          "en-GB",
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="individualEvent">No events</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarLayout;
