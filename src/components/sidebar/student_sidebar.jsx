import React, { useEffect, useState } from 'react';
import "./sidebar.css"

const StudentSidebar = ({onButtonClick}) => {
    return (
        <div className="sidebar">
            <button onClick={()=> onButtonClick("Feed")}>Feed</button>
            <button onClick={()=> onButtonClick("Calendar")}>Calendar</button>
            <button onClick={()=> onButtonClick("Forum")}>Forum</button>
            <button onClick={()=> onButtonClick("Academic")}>Academic</button>
        </div>
    );
}

export default StudentSidebar;