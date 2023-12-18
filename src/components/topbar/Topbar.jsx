import React, { useEffect } from 'react';
import "./topbar.css"; 

const Topbar = ({buttonSelect,clickFunction,currentButton}) => {
  /*const [currentButton, setCurrentButton] = useState(null);*/
  const buttonGroup = document.querySelectorAll(".buttonGroup a");
  useEffect(() => {
    const buttonGroup = document.querySelectorAll(".buttonGroup a");
    console.log(buttonSelect);

    return () => {
      buttonGroup.forEach(btn => {
        btn.removeEventListener('click', clickFunction);
      });
    };
  }, [currentButton, buttonSelect]);

  return (
    <div className="navBar">
      <img src={process.env.PUBLIC_URL + "../assets/logo.png"} alt="logo" />
      <div className="buttonGroup">
        <a className="student" onClick={clickFunction}>Student</a>
        <a className="club" onClick={clickFunction}>Clubs</a>
        <a className="food" onClick={clickFunction}>Food</a>
      </div>
      <div className="signUp">
        <button className="login">Login</button>
        <button className="register">Register</button>
      </div>
    </div>
  );
};

export default Topbar;
