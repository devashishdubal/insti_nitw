import { Link } from 'react-router-dom';
import "./quicklinks.css";
const Quicklinks = () =>{

    const redirectToUrl = (url) => {
        window.open(url, "_blank");
      };

    return(
        <div className = "page">
            <diV className = "section">
                <h4>Academic Calendar</h4>
                <button
                className="syllabus-button"
                onClick={() =>
                    redirectToUrl(
                    "https://nitw.ac.in/api/static/files/Civil_Engineering_2023-10-9-15-57-18.pdf"
                    )
                }
                ></button>
            </diV>

            <diV className = "section">
                <h4>Syllabus</h4>
                <button
                className="syllabus-button"
                onClick={() =>
                    redirectToUrl(
                    "https://nitw.ac.in/api/static/files/Civil_Engineering_2023-10-9-15-57-18.pdf"
                    )
                }
                ></button>
            </diV>

            <diV className = "section">
                <h4>Time-Tables</h4>
                <button
                className="syllabus-button"
                onClick={() =>
                    redirectToUrl(
                    "https://nitw.ac.in/api/static/files/Civil_Engineering_2023-10-9-15-57-18.pdf"
                    )
                }
                ></button>
            </diV>

        </div>
    )
}

export default Quicklinks;