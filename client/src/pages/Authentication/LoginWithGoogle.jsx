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
    const {currentUser, setCurrentUser} = useContext(AuthContext);

    const signin = () => {
        window.location.href = 'http://localhost:8000/auth/google';
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
    }, [auth])

    return (
        <div className="landing_page_full">
        <section id="up"></section>
        <section id="down"></section>
        <section id="left"></section>
        <section id="right"></section>
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