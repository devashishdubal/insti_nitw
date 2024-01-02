import "./profile.css"
import { useState,useEffect } from "react";
import axios from "axios";

const Profile = () =>{

    const [userData, setUserData] = useState(null);

    useEffect(() => {
      axios
        .get('http://localhost:8000/api/v1/users/jdoe')
        .then(response => {
          setUserData(response.data);
        //   console.log(response.data);
        })
        .catch(error => {
          alert('Error! Please check input fields');
        });
    }, []);
    
    return(
        <div className="profile_page">
            {userData && (
          <div className="user_profile">
                        <div className="circle-container">
                            <img
                                src="https://image.freepik.com/free-vector/man-profile-cartoon_18591-58482.jpg"
                                alt="Your Photo"
                                className="circle-photo"
                            />
                        </div>

                
                            <div className = "information">
                                    <h4>{userData.userId} </h4>
                                    <h4> Roll Number: 22CSB0F07 </h4>
                                    <h4> Branch: Computer Science and Engineering </h4>
                                    <h4> Email: {userData.email} </h4>
                                    <p> About: Kabhi Kabhi lagta hai apun hi Bhagwan hai </p> 
                            </div>

                            <div className = "buttons">
                             <button className = "savebutton">Edit</button> 
                             <button className = "savebutton">Share</button> 
                            </div>
                                            
           </div>
            )}
        </div>
         
    );
}

export default Profile;