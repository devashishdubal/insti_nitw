import React, { useEffect, useContext } from 'react';
import "./Topbar.css";
import { auth, provider } from "../../firebase"
import { AuthContext, useAuth } from "../../Context/AuthContext"
import { BrowserRouter as Router, Link, Routes, Route, NavLink } from "react-router-dom";

const Topbar = () => {
  const { currentUser } = useContext(AuthContext)

  // const clickFunction = () => {
  //   const topbarButtons = document.querySelectorAll(".navBar .buttonGroup > *");
  //   console.log(topbarButtons);
  // }

  const logout = () => {
    auth.signOut()
  }

  return (
    <div className="navBar">
      <div className="buttonGroup">

        <NavLink to="/students/feed">
          <a className="student">Student</a>
        </NavLink>
        <NavLink to="/clubs/nitw_clubs">
          <a className="club">Clubs</a>
        </NavLink>
        <NavLink to="/food/places_to_eat">
          <a className="food">Food</a>
        </NavLink>
      </div>
      <div className="signUp">
        <img src={currentUser.photoURL} alt='displayPic' />
        <p>{currentUser.displayName}</p>
        <button className="login" onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Topbar;
