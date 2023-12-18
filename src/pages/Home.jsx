import Topbar from "../components/topbar/Topbar"
import React, { useEffect, useState } from 'react';
import FoodSidebar from "../components/sidebar/food_sidebar"
import StudentSidebar from "../components/sidebar/student_sidebar"
import ClubsSidebar from "../components/sidebar/clubs_sidebar"

import "./Home.css"

export default function Home() {
  const [buttonSelect, setButtonSelect] = useState(1);
  const [currentButton, setCurrentButton] = useState(null);

  
  const handleClick = (event) => {
    
    const buttonGroup = document.querySelectorAll(".buttonGroup a");
    buttonGroup.forEach(btn => {
      btn.classList.remove('selected');
    });
    const btn = event.target;
    btn.classList.add('selected');

    console.log(btn.className);
    if (btn.className === 'student selected') {
      setButtonSelect(1);
    } else if (btn.className === 'club selected') {
      setButtonSelect(2);
    } else if (btn.className === 'food selected') {
      setButtonSelect(3);
    }

    
    /*
    if (currentButton) {
      currentButton.classList.remove('selected');
    }
    */

    setCurrentButton(btn);
  };
  let sidebar;
  if (buttonSelect == 1){
    sidebar = <StudentSidebar/>
  }
  else if (buttonSelect == 2){
    sidebar = <ClubsSidebar/>
  }
  else if (buttonSelect == 3){
    sidebar = <FoodSidebar/>
  }
  return (
    <>
    <div className="full_app">
      <Topbar buttonSelect={buttonSelect} clickFunction={handleClick} currentButton={currentButton}/>
      <div className="main">
        <div className="side">
          
          {sidebar}
        </div>
        <div className="center">
          <h1>Main area</h1>
        </div>
      </div>
    </div>
    </>
  )
}