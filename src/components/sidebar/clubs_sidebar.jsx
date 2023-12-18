import React, { useEffect, useState } from 'react';
import "./sidebar.css"

const ClubsSidebar = () => {
    return (
        <div className="sidebar">
            <button>All NITW Clubs</button>
            <button>CSES</button>
            <button>Recent events</button>
            <button>Upcoming events</button>
        </div>
    );
}

export default ClubsSidebar;