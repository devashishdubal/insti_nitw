import React, { useEffect, useState } from 'react';
import "./sidebar.css"

const ClubsSidebar = ({ onButtonClick }) => {
    const [showSpans, setShowSpans] = useState(false);
    const [currRight, setArrowDir] = useState(true);

    const handleArrowClick = () => {
        setShowSpans(!showSpans);
        setArrowDir(!currRight);
    };
    return (
        <>
            <div className="sidebar">
                <button className={`${!currRight ? 'expanded' : ''}`} onClick={() => onButtonClick("NITW Clubs")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    {showSpans && <span className="button-desc">NITW Clubs</span>}
                </button>

                <button className={`${!currRight ? 'expanded' : ''}`} onClick={() => onButtonClick("CSES")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>                    {showSpans && <span className="button-desc">CSES</span>}
                </button>

                <button className={`${!currRight ? 'expanded' : ''}`} onClick={() => onButtonClick("Recent events")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 19 2 12 11 5 11 19"></polygon><polygon points="22 19 13 12 22 5 22 19"></polygon></svg>                    {showSpans && <span className="button-desc">Recent Events</span>}
                </button>

                <button className={`${!currRight ? 'expanded' : ''}`} onClick={() => onButtonClick("Upcoming Events")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 19 22 12 13 5 13 19"></polygon><polygon points="2 19 11 12 2 5 2 19"></polygon></svg>                    {showSpans && <span className="button-desc">Upcoming Events</span>}
                </button>
            </div>
            {currRight && <div className="arrow" onClick={handleArrowClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>}
            {!currRight && <div className="arrow" onClick={handleArrowClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </div>}
        </>
    );
}

export default ClubsSidebar;