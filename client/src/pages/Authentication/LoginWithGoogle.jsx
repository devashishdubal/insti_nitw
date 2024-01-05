import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import "./login.css"
import Typed from 'typed.js';
import {auth , provider}  from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, deleteUser } from "firebase/auth";
import { AuthContext, useAuth } from "../../Context/AuthContext"
import toast, { Toaster } from 'react-hot-toast';

const LoginWithGoogle = () => {
    //const [signedInUser] = useAuthState(auth);
    const verifier = (email) => {
        let domain = email.split("@")[1];
        if (domain == "student.nitw.ac.in") return true;

        return false;
    }

    const navigate = useNavigate()

    const addToDB = (data) => {
        axios
            .post(`http://localhost:8000/api/v1/auth/register`, data)
            .then((response) => {
                //setDesc("");
                //console.log(response.data)
                
                //fetch();
            })
            .catch((error) => {
                // handle the error
            });
    }

    const {currentUser, setCurrentUser} = useContext(AuthContext);

    const signin = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            if (!verifier(result.user.email)) {
                auth.signOut()
                .then(() => {
                    console.log("Signed out successfully")
                });

                deleteUser(result.user).then(() => {
                    console.log("User deleted successfully");
                }).catch((error) => {
                    console.error("Error deleting user:", error);
                });

                toast.error('Please use your student email', {
                    duration: 3000,
                    position: 'top-right',
                  
                    // Styling
                    style: {},
                    className: '',
                    // Aria
                    ariaProps: {
                      role: 'status',
                      'aria-live': 'polite',
                    },
                  });
            } else {
                // redirect
                // setContext
                let rollNo = result.user.email.slice(2, result.user.email.indexOf('@'));

                let username = result.user.email.split("@")[0];
                let firstname = result.user.displayName.split(" ")[0]
                let lastname = result.user.displayName.split(" ")[1]
                const object = {
                    "userId": result.user.uid,
                    "username": username,
                    "firstName": firstname,
                    "lastName": lastname,
                    "rollNo": rollNo,
                    "email": result.user.email,
                    "photoURL": result.user.photoURL
                }

                addToDB(object); // add it to our database 
                navigate("/");
                // axios request here
                // send this to register endpoint
                //console.log(currentUser)
            }
        })
        .catch(alert);
    }

    const el = React.useRef(null);
    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ['By The Students', 'For The Students'],
            typeSpeed: 100,
            backSpeed: 50,
            loop: true,
            showCursor: false
          });
          
          console.log(currentUser)
          return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
          };
    }, [auth])

    return (
        <div className="landing_page_full">
            <div className="landing_page_image">
                {/* Just a nice picture of NITW */}
                <img src={process.env.PUBLIC_URL + "../assets/banner.avif"} alt="bg"/>
            </div>
            <div className="login_area">
                <h1 className="animated_typing_class">Welcome to NITW Nexus</h1>
                <div className="all_logos">
                <img src={process.env.PUBLIC_URL + "../assets/cses-logo.jpg"} alt="logo" />
                <img src={process.env.PUBLIC_URL + "../assets/logo.png"} alt="logo" />
                <img src={process.env.PUBLIC_URL + "../assets/nitw.png"} alt="logo" />
                </div>
                <h1 ref={el} className="animated_typing_class"></h1>
                <div className="login_button_area">
                    <button className="login_button" onClick={signin}>
                        <img src={process.env.PUBLIC_URL + "../assets/google.png"} alt="logo" />
                        Sign in with google
                    </button>
                    <Toaster/>
                    <p>* Login should only be with student email</p>
                </div>
            </div>
        </div>
    );
}

export default LoginWithGoogle;