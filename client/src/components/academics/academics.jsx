import "./academics.css";
import React, { useState } from "react";
import Things from "./Things";
const Academics = () => {
  const toggleButtons = [
    "B.Tech","Integrated M.Sc","Honors","Minor","Mandatory Non Credit","Open Elective","M.Tech","M.Sc.","MBA","MCA",
  ];

  const [activeToggle, setActiveToggle] = useState(0); // Initialize with 0 for "B.Tech"

  const handleToggleClick = (index) => {
    setActiveToggle(index);
  };

  return (
    <div className="page">
      <div className="toggles">
        {toggleButtons.map((button, index) => (
          <button
            key={index}
            className={`toggle-button ${
              activeToggle === index ? "active" : ""
            }`}
            onClick={() => handleToggleClick(index)}
          >
            {button}
          </button>
        ))}
      </div>

      <div className="non-toggles">
        <h3>{toggleButtons[activeToggle]}</h3>
        <Things course = "Civil"/>
        <Things course = "Chemical"/>
      </div>
    </div>
  );
};

export default Academics;
