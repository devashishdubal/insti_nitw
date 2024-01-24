import { Link } from "react-router-dom";
import "./Things.css";
const Things = ({course}) => {

  const redirectToUrl = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="full">

      <div className="name">
        <h4>{course}</h4>
      </div>

      <div className="syllabusbuttons">
      <Link to="/students/academics/quicklinks">
        <button className="syllabus-button">Quick Links</button>
        </Link>
        
        <button className="syllabus-button">Notices </button>
        
        <Link to="/students/academics/resources">
          <button className="syllabus-button">Resources</button>
        </Link>

        <Link to="/students/forum/ask_question">
          <button className="syllabus-button">Doubts</button>
        </Link>
      </div>

    </div>
  );
};

export default Things;
