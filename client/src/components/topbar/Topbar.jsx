import React, { useContext } from 'react';
import "./Topbar.css";
import axios from "axios"
import { auth } from "../../firebase"
import { AuthContext } from "../../Context/AuthContext"
import { BrowserRouter as Router, Link, Routes, Route, NavLink } from "react-router-dom";

const Topbar = ({ toggleTheme }) => {
  const {userDetails, setCurrentUser, setUserDetails } = useContext(AuthContext)

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
      <button onClick={toggleTheme}>theme</button>
      <div className="signUp">
        <img src={userDetails && userDetails.profilePic} alt='displayPic' />
        <p>{userDetails && userDetails.username}</p>
        <button className="login" onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Topbar;
