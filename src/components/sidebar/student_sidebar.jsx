import React, { useState, useRef, useEffect } from 'react';
import "./sidebar.css";
/*
const StudentSidebar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [showSpans, setShowSpans] = useState(false);
    const hoverTimeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            // Cleanup: Clear the timeout on component unmount
            clearTimeout(hoverTimeoutRef.current);
        };
    }, []);

    const handleMouseEnter = () => {
        setIsHovered(true);
        hoverTimeoutRef.current = setTimeout(() => {
            setShowSpans(true);
        }, 600);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setShowSpans(false);
        // Clear the timeout when the user leaves before the 800ms delay
        clearTimeout(hoverTimeoutRef.current);
    };

    return (
        <div
            className={`sidebar ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                {showSpans && <span>Feed</span>}
            </button>
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-calendar">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                {showSpans && <span>Calendar</span>}
            </button>
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-edit">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                {showSpans && <span>Forum</span>}
            </button>
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-book-open">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                {showSpans && <span>Academic</span>}
            </button>*/
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
