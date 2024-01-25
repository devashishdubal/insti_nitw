import "./academics.css";
import React, { useState } from "react";
import Things from "./Things";
const Academics = () => {
  const toggleButtons = [
    "B.Tech", "Integrated M.Sc", "M.Tech", "M.Sc.", "MBA", "MCA", "Honors", "Minor", "MNC", "Open Elective"
  ];

  const coursesPerButton = [
    ["Computer Science Engineering", "Electronics and Communication Engineering", "Course C for B.Tech", "Course D for B.Tech"],
    ["Course A for Integrated M.Sc", "Course B for Integrated M.Sc"],
    ["Course A for M.Tech", "Course B for M.Tech"],
    ["Course A for M.Sc.", "Course B for M.Sc."],
    ["Course A for MBA", "Course B for MBA"],
    ["Course A for MCA", "Course B for MCA"],
    ["Course A for Honors", "Course B for Honors"],
    ["Course A for Minor", "Course B for Minor"],
    ["Course A for MNC", "Course B for MNC"],
    ["Course A for Open Elective", "Course B for Open Elective"]
  ];

  const [activeToggle, setActiveToggle] = useState(0); // Initialize with 0 for "B.Tech"

  const handleToggleClick = (index) => {
    setActiveToggle(index);
  };

  return (
    <div className="page">
      <div className="toggles">
        <div className="upper">
          {toggleButtons.slice(0, 6).map((button, index) => (
            <button
              key={index}
              className={`toggle-button ${activeToggle === index ? "active" : ""}`}
              onClick={() => handleToggleClick(index)}
            >
              {button}
            </button>
          ))}
        </div>
        <div className="lower">
          {toggleButtons.slice(6).map((button, index) => (
            <button
              key={index + 6}
              className={`toggle-button ${activeToggle === index + 6 ? "active" : ""}`}
              onClick={() => handleToggleClick(index + 6)}
            >
              {button}
            </button>
          ))}
        </div>
      </div>
      <div className="non-toggles">
        {coursesPerButton[activeToggle].map((course, index) => (
          <Things key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Academics;