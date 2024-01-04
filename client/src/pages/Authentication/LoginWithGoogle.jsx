import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./login.css"
import Typed from 'typed.js';
import {auth , provider}  from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, deleteUser } from "firebase/auth";

const LoginWithGoogle = () => {
    const verifier = (email) => {
        let domain = email.split("@")[1];
        if (domain == "student.nitw.ac.in") return true;

        return false;
    }

    const signin = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            console.log(result.user)

            if (!verifier(result.user.email)) {
                deleteUser(result.user).then(() => {
                    console.log("User deleted successfully");
                }).catch((error) => {
                    console.error("Error deleting user:", error);
                });
            } else {
                // redirect
                // setContext
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
      
          return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
          };
    })

    return (
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

                <p>* Login should only be with student email</p>
            </div>
        </div>
    );
}

export default LoginWithGoogle;