import HomeLayout from "../layout/HomeLayout";
// import Topbar from "../components/topbar/Topbar"
import React, { useEffect, useState } from 'react';
import FoodSidebar from "../components/sidebar/food_sidebar"
import StudentSidebar from "../components/sidebar/student_sidebar"
import ClubsSidebar from "../components/sidebar/clubs_sidebar"
import Menu from "../components/food/mess/menu";
import Places from "../components/food/places_to_eat/Places";

import "./Home.css"

export default function Home() {
  const [buttonSelect, setButtonSelect] = useState(
    isNaN(parseInt(localStorage.getItem('buttonSelect'))) ? 1 : parseInt(localStorage.getItem('buttonSelect')) 
  );
  const [sidebarButtonSelect, setSidebarButtonSelect] = useState(
    localStorage.getItem('sidebarButtonSelect') || null
  );

  const [centerContent, setCenterContent] = useState(
    null
  );
  
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
    setSidebarButtonSelect(null);
    
    // setCurrentButton(btn);
  };

  const storeConfigData = () => {
      localStorage.setItem('buttonSelect', buttonSelect);
      localStorage.setItem('sidebarButtonSelect', sidebarButtonSelect);
      localStorage.setItem('centerContent', centerContent);
  }

  const handleButtonClick = (buttonName) => {
    setSidebarButtonSelect(buttonName);
    if (buttonName == 'mess') {
      setCenterContent(<Menu/>)
    } else if (buttonName == 'places to eat') {
      setCenterContent(<Places/>)
    } else {
      setCenterContent(<h1>{buttonName}</h1>)
    }
  }

  useEffect(() => {
    //console.log(buttonSelect)
    if (buttonSelect == 1) {
      document.getElementsByClassName("student")[0].classList.add('selected')
    } else if (buttonSelect == 2) {
      document.getElementsByClassName("club")[0].classList.add('selected')
    } else {
      document.getElementsByClassName("food")[0].classList.add('selected')
    }
    
    /*
    if (sidebarButtonSelect == 'mess') {
      setCenterContent(<Menu/>)
    } else if (sidebarButtonSelect == 'places to eat') {
      setCenterContent(<Places/>)
    } else {
      setCenterContent(<h1>{sidebarButtonSelect}</h1>)
    }
    */

    handleButtonClick(sidebarButtonSelect);
    
    
    storeConfigData();
  }, [buttonSelect, sidebarButtonSelect]);

  let sidebar;

  if (buttonSelect === 1){
    sidebar = <StudentSidebar onButtonClick={handleButtonClick} />
  }
  else if (buttonSelect === 2){
    sidebar = <ClubsSidebar onButtonClick={handleButtonClick} />
  }
  else if (buttonSelect === 3){
    sidebar = <FoodSidebar onButtonClick={handleButtonClick} />
  }
  return (
    <>
      <HomeLayout buttonSelect={buttonSelect} clickFunction = {handleClick} left={sidebar} right={sidebarButtonSelect ? centerContent : "this is the details of that particular part"} />
    </>
  )
}