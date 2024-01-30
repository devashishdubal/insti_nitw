import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../Context/AuthContext"

import "./welcome.css"

export default function Welcome() {
    const {userDetails, setCurrentUser, setUserDetails } = useContext(AuthContext)
    const [visible, setVisible] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      const timeout = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
            // Use React Router's navigate function after the delay
            navigate('/students/feed');
          }, 1000);
        
      }, 3000);
      
  
      return () => {
        clearTimeout(timeout);
      };
    }, []);
  
    return (
      <div className={`curtain ${visible ? 'open' : 'closed'}`}>
        <div className="welcome-content">
          <h1>Welcome {userDetails && userDetails.firstName}!</h1>
          <p>We hope you enjoy using this website.</p>
        </div>
      </div>
    );
}
