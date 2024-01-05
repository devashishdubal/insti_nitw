import React, { useEffect, useContext } from 'react';
import "./Topbar.css";
import { auth, provider } from "../../firebase"
import { AuthContext, useAuth } from "../../Context/AuthContext"
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";

const Topbar = ({ buttonSelect, clickFunction }) => {
  const { currentUser } = useContext(AuthContext)

  const logout = () => {
    auth.signOut()
  }

  return (
    <div className="navBar">
      <div className="buttonGroup">

        <Link to="/students/feed">
          <a className="student" onClick={clickFunction}>Student</a>
        </Link>
        <Link to="/clubs/nitw_clubs">
          <a className="club" onClick={clickFunction}>Clubs</a>
        </Link>
        <Link to="/food/places_to_eat">
          <a className="food" onClick={clickFunction}>Food</a>
        </Link>
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
