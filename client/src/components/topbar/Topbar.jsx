import React, { useState,useContext,useEffect } from 'react';
import "./Topbar.css";
import axios from "axios"
import { auth } from "../../firebase"
import { AuthContext } from "../../Context/AuthContext"
import { BrowserRouter as Router, Link, Routes, Route, NavLink } from "react-router-dom";

const Topbar = ({ toggleTheme }) => {
  const {userDetails, setCurrentUser, setUserDetails } = useContext(AuthContext);
  const [isSunVisible, setIsSunVisible] = useState(false);
  const [isMoonVisible, setIsMoonVisible] = useState(true);

  const logout = () => {
    /*
    try{
      let response = await axios.get("http://localhost:8000/logout");
      setUserDetails(null);
      setCurrentUser(null);
    }catch(err){
      console.log(err)
    }
    */
    window.location.href = 'http://localhost:8000/logout';
  }

  const clickHandler = () =>{
    // setIsSunVisible(!isSunVisible);
    // setIsMoonVisible(!isMoonVisible);
    toggleTheme();
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
      <button className="container" aria-label="Toggle color mode" title="Toggle color mode" onClick={clickHandler}>
        <div className={`sun ${isSunVisible ? 'visible' : ''}`}>
          <div className="sun-before"></div>
        </div>
        <div className={`moon ${isMoonVisible ? 'visible' : ''}`}>
          <div className="star"></div>
          <div className="star small"></div>
        </div>
      </button>
      <div className="signUp">
        <img src={userDetails && userDetails.profilePic} alt='displayPic' />
        <p>{userDetails && userDetails.username}</p>
        <button className="login" onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Topbar;
