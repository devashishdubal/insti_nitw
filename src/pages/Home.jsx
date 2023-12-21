import HomeLayout from "../layout/HomeLayout";
// import Topbar from "../components/topbar/Topbar"
import React, { useEffect, useState } from 'react';
import FoodSidebar from "../components/sidebar/food_sidebar"
import StudentSidebar from "../components/sidebar/student_sidebar"
import ClubsSidebar from "../components/sidebar/clubs_sidebar"
import Menu from "../components/food/mess/menu";

import "./Home.css"
// import Recenteventcard from "../components/recent-events/recenteventcard";
import Recentevent from "../components/recent-events/Recentevent";

export default function Home() {
  const [buttonSelect, setButtonSelect] = useState(1);
  const [sidebarButtonSelect, setSidebarButtonSelect] = useState(null);
  const [centerContent, setCenterContent] = useState(null);

  
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
    
    /*
    if (currentButton) {
      currentButton.classList.remove('selected');
    }
    */

    // setCurrentButton(btn);
  };
  const handleButtonClick = (buttonName) => {
    setSidebarButtonSelect(buttonName);
    if (buttonName == 'mess') {
      setCenterContent(<Menu/>)
    } 
    else if(buttonName === 'Recent events'){
      // setCenterContent(<><Recenteventcard img="" title="Event 1" description="this is the event that has passed some days ago is this a good representation" author="Arjun Khare"/></>);
      setCenterContent(<Recentevent />)
    }else {
      setCenterContent(<h1>{buttonName}</h1>)
    }
  }
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