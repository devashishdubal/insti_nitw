import React, { useState } from "react";
import axios from "axios";
import "./clubLogin.css"; // Import your CSS file

export default function ClubLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/club/login", {
                email,
                password,
            }, { withCredentials: true });

            // Handle success response
            //console.log(response.data);
            window.location.href = "/clubAdmin";
        } catch (error) {
            // Handle error
            console.error("Error during login:", error.response.data);
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h3>Club Sign In</h3>
            <div className="form-group">
                <label>Club email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Club Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
        </form>
    );
}
