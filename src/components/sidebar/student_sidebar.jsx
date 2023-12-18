import React, { useEffect, useState } from 'react';
import "./sidebar.css"

const StudentSidebar = () => {
    return (
        <div className="sidebar">
            <button>Feed</button>
            <button>Calendar</button>
            <button>Forum</button>
            <button>Academic</button>
        </div>
    );
}

export default StudentSidebar;