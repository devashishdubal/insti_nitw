import React from 'react'
import './Register.css'
import { useState ,useEffect} from 'react';
import Typed from 'typed.js';
import axios from 'axios';

const Register = () => {
    const [userId,setUserName] = useState(null);
    const [firstName,setFirstName] = useState(null);
    const [lastName,setLastName] = useState(null);
    const [email,setEmail] = useState(null);
    const [rollNo,setRollNumber] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);

    const el = React.useRef(null);

    React.useEffect(() => {
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
      }, []);

    const handleRegister = (e) => {
        e.preventDefault();
        const data = {
            userId,
            firstName,
            lastName,
            password,
            email,
            rollNo
        };
        axios
            .post('http://localhost:8000/api/v1/auth/register',data)
            .then(() => {
                console.log("Account added");
                console.log(data);
            })
            .catch((error) => {
                alert("Error! Please check input fields");
            });
        
    };
    return (
        <div className="register-container-wrapper">
            <div className="register-container">
                <div className="image-bar">
                        <img src={process.env.PUBLIC_URL + "../assets/sidebar.jpg"} alt="logo" />
                    <div className="card-body">
                        <img src={process.env.PUBLIC_URL + "../assets/cses-logo.jpg"} alt="logo" />
                    </div>
                </div>
                <div className="content">
                    <div ref={el} className="text-1">
                        {/* TO ITERATE IS HUMAN, RECURSION IS DIVINE. */}
                    </div>
                    <div className="text-2">
                        Sign up now and join nexus.
                    </div>
                    <div className="form-container">
                        <div className="form-subtext">Let's do this!</div>
                        <div className="mand">*All fields are mandatory</div>
                        <form>
                            <div className="form_element">
                                <label htmlFor="username">USERNAME</label>
                                <input type="text" id="username" name="username" required onChange={(e) => setUserName(e.target.value)}/>
                            </div>
                            <div className="form_element">
                                <label htmlFor="first_name">FIRST NAME</label>
                                <input type="text" id="first_name" name="first_name" required onChange={(e) => setFirstName(e.target.value)}/>
                            </div>
                            <div className="form_element">
                                <label htmlFor="last_name">LAST NAME</label>
                                <input type="text" id="last_name" name="last_name" required onChange={(e) => setLastName(e.target.value)}/>
                            </div>
                            <div className="form_element">
                                <label htmlFor="email">EMAIL</label>
                                <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="form_element">
                                <label htmlFor="roll">ROLL NUMBER</label>
                                <input type="text" id="roll" name="roll" required onChange={(e) => setRollNumber(e.target.value)}/>
                            </div>
                            <div className="form_element">
                                <label htmlFor="pass_1">PASSWORD</label>
                                <input type="password" id="pass_1" name="pass_1" required title="Please use min. 8 letters, including 1 caps, 1 small and 1 special char./number." pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="form_element">
                                <label htmlFor="pass_2">CONFIRM PASSWORD</label>
                                <input type="password" id="pass_2" name="pass_2" required onChange={(e) => setConfirmPassword(e.target.value)}/>
                            </div>
                            <button type="submit" onClick={handleRegister}>Create Account</button>
                        </form>
                    </div>
                    <div className="instead">Already have an account? <a>Login</a></div>
                </div>
            </div>
        </div>
    );
};

export default Register;
