import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';

const Register = () => {
    const [userId, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [rollNo, setRollNumber] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');

    const registerUser = () => {
        const data = {
            userId,
            firstName,
            lastName,
            password,
            email,
            rollNo
        };
        axios
            .post('http://localhost:8000/api/auth/register', data)
            .then(() => {
                // navigate('/');
            })
            .catch(err => {
                alert(err);
            });
    };

    return (
        <div className="register-container">
            <div className="image-bar">
                {/* <img src="./images/sidebar.jpg" />
                <div className="card-body">
                    <img src="./images/csea-logo.png" />
                </div> */}
            </div>
            <div className="content">
                <div className="text-1">
                    TO ITERATE IS HUMAN, RECURSION IS DIVINE.
                </div>
                <div className="text-2">
                    Sign up now and recurse with us.
                </div>
                <div className="form-container">
                    <div className="form-subtext">Let's do this!</div>
                    <div className="mand">*All fields are mandatory</div>
                    {/* <form action="./home.html" method="POST"> */}
                        <div className="form_element">
                            <label htmlFor="username">USERNAME</label>
                            <input type="text" value={userId} onChange={(e) => setUsername(e.target.value)} id="username" name="username" required />
                        </div>
                        <div className="form_element">
                            <label htmlFor="first_name">FIRST NAME</label>
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} id="first_name" name="first_name" required />
                        </div>
                        <div className="form_element">
                            <label htmlFor="last_name">LAST NAME</label>
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} id="last_name" name="last_name" required />
                        </div>
                        <div className="form_element">
                            <label htmlFor="email">EMAIL</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" required />
                        </div>
                        <div className="form_element">
                            <label htmlFor="roll">ROLL NUMBER</label>
                            <input type="text" value={rollNo} onChange={(e) => setRollNumber(e.target.value)} id="roll" name="roll" required />
                        </div>
                        <div className="form_element">
                            <label htmlFor="pass_1">PASSWORD</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="pass_1" name="pass_1" required title="Please use min. 8 letters, including 1 caps, 1 small and 1 special char./number." pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" />
                        </div>
                        <div className="form_element">
                            <label htmlFor="pass_2">CONFIRM PASSWORD</label>
                            {/* Add value and onChange for confirm password */}
                            <input type="password" id="pass_2" name="pass_2" required />
                        </div>
                        <button type="submit" onClick={registerUser}>Create Account</button>
                    {/* </form> */}
                </div>
                <div className="instead">Already have an account? <a href="">Login</a></div>
            </div>
        </div>
    );
};

export default Register;
