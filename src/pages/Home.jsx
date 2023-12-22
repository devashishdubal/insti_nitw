import HomeLayout from "../layout/HomeLayout";
// import Topbar from "../components/topbar/Topbar"
import React, { useEffect, useState } from 'react';
import FoodSidebar from "../components/sidebar/food_sidebar"
import StudentSidebar from "../components/sidebar/student_sidebar"
import ClubsSidebar from "../components/sidebar/clubs_sidebar"
import Menu from "../components/food/mess/menu";
import Places from "../components/food/places_to_eat/Places";
import ClubList from "../components/clubs/NITW-clubs/clubList";

import "./Home.css"
// import Recenteventcard from "../components/recent-events/recenteventcard";
import Recentevent from "../components/clubs/recent-events/Recentevent";

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
    } 
    else if(buttonName === 'Recent events'){
      // setCenterContent(<><Recenteventcard img="" title="Event 1" description="this is the event that has passed some days ago is this a good representation" author="Arjun Khare"/></>);
      setCenterContent(<Recentevent />)
    } 
    else if (buttonName == 'places to eat') {
      setCenterContent(<Places/>)
    } else if (buttonName == 'NITW Clubs') {
      setCenterContent(<ClubList/>)
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

    if (sidebarButtonSelect != "null" && sidebarButtonSelect != null) {
      console.log(sidebarButtonSelect)
      handleButtonClick(sidebarButtonSelect);
    } else {
      if (buttonSelect == 1) {
        setCenterContent(<h1>This is the student section</h1>); // we can make a componenent for the default section of student
      } else if (buttonSelect == 2) {                           // club and food.
        setCenterContent(<h1>This is the club section</h1>)
      } else if (buttonSelect == 3) {
        setCenterContent(<h1>This is the Food section</h1>)
      } else {
        setCenterContent(null);
      }
    }
    
    
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
      <HomeLayout buttonSelect={buttonSelect} clickFunction = {handleClick} left={sidebar} right={centerContent} />
    </>
  )
}