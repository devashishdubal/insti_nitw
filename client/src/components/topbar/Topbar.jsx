import React, { useEffect } from 'react';
import "./Topbar.css";

const Topbar = ({ buttonSelect, clickFunction }) => {
  return (
    <div className="navBar">
      <div className="buttonGroup">
        <a className="student" onClick={clickFunction}>Student</a>
        <a className="club" onClick={clickFunction}>Clubs</a>
        <a className="food" onClick={clickFunction}>Food</a>
      </div>
      <div className="signUp">
        <button className="login">Login</button>
        <button className="register" onClick={clickFunction}>Register</button>
      </div>
    </div>
  );
};

export default Topbar;
