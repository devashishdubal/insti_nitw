import StudentSidebar from "../components/sidebar/student_sidebar";
import Topbar from "../components/topbar/Topbar"
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const HomeLayout = ({ buttonSelect, clickFunction, left, right }) => {
  return (
    <div className="full_app">
      <div className="side">
        {left}
      </div>
      <div className="main">
        <Topbar buttonSelect={buttonSelect} clickFunction={clickFunction} />
        <div className="center scrollbar scrollbar-primary">
          {right}
          <div className="force-overflow"></div> {/*scrollbar*/}
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;