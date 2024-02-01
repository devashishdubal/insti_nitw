import React, { useContext } from 'react';
import "./Topbar.css";
import axios from "axios"
import { auth } from "../../firebase"
import { AuthContext } from "../../Context/AuthContext"
import { BrowserRouter as Router, Link, Routes, Route, NavLink } from "react-router-dom";

const Topbar = () => {
  const {userDetails, setCurrentUser, setUserDetails } = useContext(AuthContext)

  const logout = () => {
    window.location.href = 'http://localhost:8000/logout';
  }

  return (
    <div className="navBar">
      <div className="buttonGroup">
        <div className="empty">
          <NavLink to="/students" className="student">Student</NavLink>
        </div>
        <div className="empty">
          <NavLink to="/clubs" className="club">Clubs</NavLink>
        </div>
        <div className="empty">
          <NavLink to="/food" className="food">Food</NavLink>
        </div>
      </div>
      <div className="signUp">
        <img src={userDetails && userDetails.profilePic} alt='displayPic' />
        <p>{userDetails && userDetails.username}</p>
        <button className="login" onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Topbar;
