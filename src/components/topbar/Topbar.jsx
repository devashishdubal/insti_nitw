import React, { useEffect, useState } from 'react';
import "./topbar.css"; 

const Topbar = () => {
  const [currentButton, setCurrentButton] = useState(null);
  const [buttonSelect, setButtonSelect] = useState(0);
  // button select 1: for student, 2: clubs, 3 : food, 0: nothing (default value)


  useEffect(() => {
    const buttonGroup = document.querySelectorAll(".buttonGroup a");

    const handleClick = (event) => {
      const btn = event.target;
      btn.classList.add('selected');

      console.log(btn.className);
      if (btn.className == 'student selected') {
        setButtonSelect(1);
      } else if (btn.className == 'club selected') {
        setButtonSelect(2);
      } else if (btn.className == 'food selected') {
        setButtonSelect(3);
      }

      console.log(buttonSelect);

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
  }, [currentButton, buttonSelect]);

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
