import { Link } from 'react-router-dom';
import "./quicklinks.css";
const Quicklinks = () =>{

    const redirectToUrl = (url) => {
        window.open(url, "_blank");
      };

    return(
        <div className = "page">

             <Link to="/students/academics">
                        <button className="back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M19 12H6M12 5l-7 7 7 7" />
                                    </svg>
                        </button>
             </Link>

            <diV className = "section">
                <h2>Academic Calendar</h2>

                <button
                className="buttons"
                onClick={() =>
                    redirectToUrl(
                    "https://nitw.ac.in/api/static/files/Civil_Engineering_2023-10-9-15-57-18.pdf"
                    )
                }
                >2023-2024 Odd Semester</button>

                <button
                className="buttons"
                onClick={() =>
                    redirectToUrl(
                    "https://nitw.ac.in/api/static/files/Civil_Engineering_2023-10-9-15-57-18.pdf"
                    )
                }
                >2023-2024 Even Semester</button>
            </diV>

            <diV className = "section">
                <h2>Syllabus</h2>
                <button
                className="buttons"
                onClick={() =>
                    redirectToUrl(
                    "https://nitw.ac.in/api/static/files/Civil_Engineering_2023-10-9-15-57-18.pdf"
                    )
                }
                >Syllabus(WEF 2020)</button>
            </diV>

            <diV className = "section">
                <h2>Time-Tables</h2>
                <button
                className="buttons"
                onClick={() =>
                    redirectToUrl(
                    "https://nitw.ac.in/api/static/files/Civil_Engineering_2023-10-9-15-57-18.pdf"
                    )
                }
                >1st Year</button>

<button
                className="buttons"
                onClick={() =>
                    redirectToUrl(
                    "https://nitw.ac.in/api/static/files/Civil_Engineering_2023-10-9-15-57-18.pdf"
                    )
                }
                >2nd,3rd,4th Year</button>
            </diV>

            <diV className = "section">
                <h2>Placements & Internships</h2>

                <button
                className="buttons"
                onClick={() =>
                    redirectToUrl(
                    "https://nitw.ac.in/api/static/files/Civil_Engineering_2023-10-9-15-57-18.pdf"
                    )
                }
                >Placement Stats</button>

                <button
                className="buttons"
                onClick={() =>
                    redirectToUrl(
                    "https://nitw.ac.in/api/static/files/Civil_Engineering_2023-10-9-15-57-18.pdf"
                    )
                }
                >Internship Stats</button>
            </diV>

        </div>
    )
}

export default Quicklinks;