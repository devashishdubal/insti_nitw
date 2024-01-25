import { Link } from 'react-router-dom';
import "./resources.css";
const Resources = () =>{
    return(
        <div className = "page">
            <div className='nav'>
            <div className = "back">
             <Link to="/students/academics">
                        <button className="back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M19 12H6M12 5l-7 7 7 7" />
                                    </svg>
                        </button>
             </Link>
            </div>

            <h1>Resources</h1>

            <div className = "add">
            <button className="add-button">Add Resources +</button>
            </div>
            </div>   
        </div>
    )
}

export default Resources;