import { Link } from 'react-router-dom';
const Resources = () =>{
    return(
        <div className = "everything">
            <Link to="/students/academics">
                        <button className="syllabus-button">=--= BACK</button>
            </Link>
            <button>Add Resources +</button>
            <h4> Civil Resources</h4>
        </div>
    )
}

export default Resources;