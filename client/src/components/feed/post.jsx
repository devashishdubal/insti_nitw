import React, { useEffect, useState, useContext } from "react";
import "./post.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";

const Post = ({
  eventId,
  eventName,
  eventImage,
  eventOrganizer,
  eventOrganizerLogo,
  eventDescription,
  date,
  time,
  registrationLink,
}) => {
  const { currentUser, userDetails } = useContext(AuthContext);
  const handleReminderClick = (e) => {
    e.preventDefault();
    const data = {
      userId: userDetails._id,
      email: userDetails.email,
      eventDateTime: date,
      event: eventId,
    };

    axios
      .post("http://localhost:8000/schedule-reminder", data, {
        withCredentials: true,
      })
      .then((response) => {
        // fetch();
        toast.success(response.data.message, {
          duration: 1000,
          position: "top-right",
          style: { marginTop: 70 },
          className: "",
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          duration: 1000,
          position: "top-right",
          style: { marginTop: 70 },
          className: "",
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
        //alert("Error! Please check input fields");
      });
  };

  return (
    <div className="post_card">
      <div className="post_card_top">
        <div className="post_card_top_left">
          <img src={eventOrganizerLogo} alt="Organizer logo" />
          <p>{eventOrganizer}</p>
        </div>
        <Link to="/clubs/nitw_clubs" target="_blank" rel="noopener noreferrer">
          <button className="manage-subscriptions-btn">
            Manage subscriptions
          </button>
        </Link>
      </div>
      <div className="post_card_content">
        <div className="post_card_center_left">
          <img src={eventImage} alt="Event" />
        </div>
        <div className="post_card_center_right">
          <div className="post_text">
            <p className="post_title">{eventName}</p>
            <p className="post_description">{eventDescription}</p>
          </div>
          <div className="controlButtons">
            {/* Enabled buttons grouped together */}
            <div className="enabled-buttons">
              <Link to={registrationLink} target="_blank">
                <button className="enabled">Register</button>
              </Link>
              <button className="enabled" onClick={handleReminderClick}>
                Set Reminder
              </button>
            </div>

            {/* Disabled buttons grouped together */}
            <div className="disabled-buttons">
              <button className="disabled">{date}</button>
              <button className="disabled">{time}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
