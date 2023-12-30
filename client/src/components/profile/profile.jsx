import "./profile.css"
import React from 'react';

const Profile = () =>{
    return(
        <div className="profile_page">
          <div className="user_profile">
                        <div className="circle-container">
                            <img
                                src="https://image.freepik.com/free-vector/man-profile-cartoon_18591-58482.jpg"
                                alt="Your Photo"
                                className="circle-photo"
                            />
                        </div>

                
                            <div className = "information">
                                    <h4>Username: rashwinmusuku </h4>
                                    <h4> Roll Number: 22CSB0F07 </h4>
                                    <h4> Branch: Computer Science and Engineering </h4>
                                    <h4> Email: rm22csb0f07@student.nitw.ac.in </h4>
                                    <p> About: Kabhi Kabhi lagta hai apun hi Bhagwan hai </p> 
                            </div>

                            <div className = "buttons">
                             <button className = "savebutton">Edit</button> 
                             <button className = "savebutton">Share</button> 
                            </div>
                                            
           </div>
         
        </div>
         
    );
}

export default Profile;