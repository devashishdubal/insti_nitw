import { Link } from "react-router-dom";

const Things = ({course}) => {

  const redirectToUrl = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div ClassName="fullfive">
      <div ClassName="total">
        <h4> {course} Engineering</h4>
      </div>

      <div className="syllabusbuttons">
        <button
          className="syllabus-button"
          onClick={() =>
            redirectToUrl(
              "https://nitw.ac.in/api/static/files/Civil_Engineering_2023-10-9-15-57-18.pdf"
            )
          }
        >
          Syllabus
        </button>
        <button
          className="syllabus-button"
          onClick={() =>
            redirectToUrl(
              "https://nitw.ac.in/api/static/files/Civil_Engineering_2023-10-9-15-57-18.pdf"
            )
          }
        >
          Time-Table Yr I{" "}
        </button>
        <button
          className="syllabus-button"
          onClick={() =>
            redirectToUrl(
              "https://nitw.ac.in/api/static/files/Civil_Engineering_2023-10-9-15-57-18.pdf"
            )
          }
        >
          Time-Table Yr II,III,IV{" "}
        </button>
        <Link to="/students/academics/resources">
          <button className="syllabus-button">Resources</button>
        </Link>

        <button
          className="syllabus-button"
          onClick={() =>
            redirectToUrl(
              "https://nitw.ac.in/api/static/files/Civil_Engineering_2023-10-9-15-57-18.pdf"
            )
          }
        >
          Internships{" "}
        </button>

        <Link to="/students/forum/ask_question">
          <button className="syllabus-button">Ask/Answer a Doubt</button>
        </Link>
      </div>
    </div>
  );
};

export default Things;
