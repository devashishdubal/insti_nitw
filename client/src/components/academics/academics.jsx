import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import "./academics.css";

const Academics = () => {
  const { currentUser, userDetails } = useContext(AuthContext);

  // Fallback values in case currentUser or userDetails are null
  const [username, setUsername] = useState(currentUser?.username || "");
  const [userData, setUserData] = useState(userDetails || {});
  const [apiStatus, setApiStatus] = useState("idle");

  // State for dropdowns
  const [activeToggle, setActiveToggle] = useState(0); // Default to "B.Tech"
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [specializationDropdownOpen, setSpecializationDropdownOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const toggleButtons = [
    "B.Tech", "Integrated M.Sc", "M.Tech", "M.Sc.", "MBA", "MCA", "Honors", "Minor", "MNC", "Open Elective"
  ];

  const coursesPerButton = [
    ["Computer Science Engineering", "Electronics and Communication Engineering"],
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

  const yearsPerCourse = {
    "B.Tech": 4,
    "Integrated M.Sc": 5,
    "M.Tech": 2,
    "M.Sc.": 2,
    "MBA": 2,
    "MCA": 3,
    "Honors": 3,
    "Minor": 2,
    "MNC": 2,
    "Open Elective": 1
  };

  // Function to parse the Roll Number and set default values
  const setDefaultsFromRollNumber = (rollNumber) => {
    if (!rollNumber) return;

    const yearPrefix = rollNumber.slice(0, 2);
    const specializationCode = rollNumber.slice(2, 5);
    const courseTypeCode = rollNumber.charAt(5);

    // Determine the year
    const yearMapping = {
      '21': 'Year 4',
      '22': 'Year 3',
      '23': 'Year 2',
      '24': 'Year 1'
    };
    setSelectedYear(yearMapping[yearPrefix] || 'Year 1');

    // Determine the specialization
    const specializationMapping = {
      'csb': 'Computer Science Engineering',
      'ecb': 'Electronics and Communication Engineering'
      // Add other mappings as needed
    };
    setSelectedSpecialization(specializationMapping[specializationCode] || 'Computer Science Engineering');

    // Determine the course type
    const courseTypeMapping = {
      '0': 'B.Tech',
      '1': 'M.Tech'
      // Add other mappings as needed
    };
    const courseType = courseTypeMapping[courseTypeCode] || 'B.Tech';
    const index = toggleButtons.indexOf(courseType);
    if (index !== -1) setActiveToggle(index);
  };

  useEffect(() => {
    // Set default values based on Roll Number when component mounts
    setDefaultsFromRollNumber(userData.rollNo || '');
  }, [userData.rollNo]);

  const handleCourseDropdownClick = () => {
    setCourseDropdownOpen(prev => !prev);
    setSpecializationDropdownOpen(false);
    setYearDropdownOpen(false);
  };

  const handleSpecializationDropdownClick = () => {
    setSpecializationDropdownOpen(prev => !prev);
    setCourseDropdownOpen(false);
    setYearDropdownOpen(false);
  };

  const handleYearDropdownClick = () => {
    setYearDropdownOpen(prev => !prev);
    setCourseDropdownOpen(false);
    setSpecializationDropdownOpen(false);
  };

  const handleToggleClick = (index) => {
    setActiveToggle(index);
    setSelectedSpecialization(coursesPerButton[index][0]);
    setSelectedYear("Year 1");
    setCourseDropdownOpen(false);
    setSpecializationDropdownOpen(false);
    setYearDropdownOpen(false);
  };

  const handleSpecializationClick = (specialization) => {
    setSelectedSpecialization(specialization);
    setSpecializationDropdownOpen(false);
  };

  const handleYearClick = (year) => {
    setSelectedYear(year);
    setYearDropdownOpen(false);
  };

  const getYears = () => {
    const courseType = toggleButtons[activeToggle];
    const numberOfYears = yearsPerCourse[courseType] || 4;
    return Array.from({ length: numberOfYears }, (_, i) => `Year ${i + 1}`);
  };

  const validateUsername = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    setUsername(value);
    setApiStatus("idle");

    if (value) {
      setApiStatus("loading");
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/users/exist/${value}`);
        setApiStatus(response.status === 200 ? "success" : "error");
      } catch (err) {
        console.error('Error checking username:', err);
        setApiStatus("error");
      }
    }
  };

  return (
    <div className="page">
      <div className="dropdown-container">
        <button className="dropdown-button" onClick={handleCourseDropdownClick}>
          {toggleButtons[activeToggle]}
          <span className={`arrow ${courseDropdownOpen ? "open" : ""}`}>▼</span>
        </button>
        {courseDropdownOpen && (
          <div className="dropdown-menu">
            {toggleButtons.map((button, index) => (
              <button
                key={index}
                className={`dropdown-item ${activeToggle === index ? "active" : ""}`}
                onClick={() => handleToggleClick(index)}
              >
                {button}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="dropdown-container">
        <button className="dropdown-button" onClick={handleYearDropdownClick}>
          {selectedYear}
          <span className={`arrow ${yearDropdownOpen ? "open" : ""}`}>▼</span>
        </button>
        {yearDropdownOpen && (
          <div className="dropdown-menu">
            {getYears().map((year, index) => (
              <button
                key={index}
                className={`dropdown-item ${selectedYear === year ? "active" : ""}`}
                onClick={() => handleYearClick(year)}
              >
                {year}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="dropdown-container">
        <button className="dropdown-button" onClick={handleSpecializationDropdownClick}>
          {selectedSpecialization}
          <span className={`arrow ${specializationDropdownOpen ? "open" : ""}`}>▼</span>
        </button>
        {specializationDropdownOpen && (
          <div className="dropdown-menu">
            {coursesPerButton[activeToggle].map((course, index) => (
              <button
                key={index}
                className={`dropdown-item ${selectedSpecialization === course ? "active" : ""}`}
                onClick={() => handleSpecializationClick(course)}
              >
                {course}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="information">
        <h5>Hey! {userData.firstName || "User"}</h5>
      </div>


      <div className="Buttons">
        <Link to="/students/academics/quicklinks">
        <button className="button">Quick Links</button>
        </Link>

        <Link to="/students/academics/resources">
        <button className="button">Resources</button>
        </Link>

        <Link to="/students/academics">
        <button className="button">Doubts</button>
        </Link>
      </div>
    </div>
  );
};

export default Academics;
