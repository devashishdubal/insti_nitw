import { Link } from 'react-router-dom';
import "./resources.css";

const resources = () => {

    const redirectToUrl = (url) => {
        window.open(url, "_blank");
    };

    return (
        <div className="page">

            <Link to="/students/academics">
                <button className="back-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 12H6M12 5l-7 7 7 7" />
                    </svg>
                </button>
            </Link>

            <div className="section">
                <h2>Previous Year Question Papers</h2>

                <button
                    className="buttons"
                    onClick={() =>
                        redirectToUrl(
                            "https://nitw.ac.in/api/static/files/Civil_Engineering_2023-10-9-15-57-18.pdf"
                        )
                    }
                >PYQs</button>

                <button
                    className="add-buttons"
                >+</button>
            </div>

            <div className="section">
                <h2>Notes</h2>
                <button
                    className="buttons"
                    onClick={() =>
                        redirectToUrl(
                            "https://nitw.ac.in/api/static/files/Civil_Engineering_2023-10-9-15-57-18.pdf"
                        )
                    }
                >Notes</button>

                <button
                    className="add-buttons"
                >+</button>
            </div>

        </div>
    );
}

export default resources;
