import { Link } from 'react-router-dom';
import "./resources.css";
const Resources = () =>{
    return(
        <div className = "page">

            <div className='nav'>
            <div className = "back">
             <Link to="/students/academics">
                        <button className="back-button">BACK</button>
             </Link>
            </div>

            <div className = "add">
            <button className="add-button">+</button>
            </div>

            </div>
            
            
            
        </div>
    )
}

export default Resources;