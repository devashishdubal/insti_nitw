import React, { useEffect, useState } from 'react';
import "./sidebar.css"

const ClubsSidebar = ({onButtonClick}) => {
    return (
        <div className="sidebar">
            <button onClick={()=> onButtonClick("All NITW Clubs")}>All NITW Clubs</button>
            <button onClick={()=> onButtonClick("CSES")}>CSES</button>
            <button onClick={()=> onButtonClick("Recent events")}>Recent events</button>
            <button onClick={()=> onButtonClick("Upcoming events")}>Upcoming events</button>
        </div>
    );
}

export default ClubsSidebar;