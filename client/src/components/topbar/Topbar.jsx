import React, { useEffect, useContext } from 'react';
import "./Topbar.css";
import {auth , provider} from "../../firebase"
import { AuthContext, useAuth } from "../../Context/AuthContext"

const Topbar = ({ buttonSelect, clickFunction }) => {
  const {currentUser} = useContext(AuthContext)

  const logout = () => {
    auth.signOut()
  }

  return (
    <div className="navBar">
      <div className="buttonGroup">
        <a className="student" onClick={clickFunction}>Student</a>
        <a className="club" onClick={clickFunction}>Clubs</a>
        <a className="food" onClick={clickFunction}>Food</a>
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
