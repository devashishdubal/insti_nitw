import React, { useEffect, useState } from 'react';
import "./topbar.css"; 

const Topbar = () => {
  const [currentButton, setCurrentButton] = useState(null);

  useEffect(() => {
    const buttonGroup = document.querySelectorAll(".buttonGroup a");

    const handleClick = (event) => {
      const btn = event.target;
      btn.classList.add('selected');

      if (currentButton) {
        currentButton.classList.remove('selected');
      }

      setCurrentButton(btn);
    };

    buttonGroup.forEach(btn => {
      btn.addEventListener('click', handleClick);
    });

    return () => {
      buttonGroup.forEach(btn => {
        btn.removeEventListener('click', handleClick);
      });
    };
  }, [currentButton]);

  return (
    <div className="navBar">
      <img src={process.env.PUBLIC_URL + "../assets/logo.png"} alt="logo" />
      <div className="buttonGroup">
        <a className="student">Student</a>
        <a className="club">Clubs</a>
        <a className="food">Food</a>
      </div>
      <div className="signUp">
        <button className="login">Login</button>
        <button className="register">Register</button>
      </div>
    </div>
  );
};

export default Topbar;
