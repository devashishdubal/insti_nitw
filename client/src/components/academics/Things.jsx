import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Things.css';

const Things = ({ course }) => {
  // Modify 'course' if it matches a specific value
  let link = course;
  if (course === "Computer Science Engineering") {
    link = "CSE"
  }
  else if (course === "Electronics and Communication Engineering") {
    link = "ECE"
  }

  return (
    <div className="full">
      <div className="name">
        <h4>{course}</h4>
      </div>

      <div className="syllabusbuttons">
        <Link to="/students/academics/quicklinks">
          <button className="syllabus-button">Quick Links</button>
        </Link>

        {/*<Link to="/students/academics/notices">
          <button className="syllabus-button">Opportunities</button>
        </Link>
  */}

        <Link to="/students/academics/resources">
          <button className="syllabus-button">Resources</button>
        </Link>

        <Link to={`/students/academics/doubtforum/questionsdoubt/questionsdoubt/${link}`}>
          <button className="syllabus-button">Doubts</button>
        </Link>
      </div>
    </div>
  );
};

export default Things;
