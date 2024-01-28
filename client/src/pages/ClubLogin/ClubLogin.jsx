import React from "react";
import "./clubLogin.css"; // Import your CSS file

export default function ClubLogin() {
    return (
        <form className="login-form">
            <h3>Club Sign In</h3>
            <div className="form-group">
                <label>Club email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                />
            </div>
            <div className="form-group">
                <label>Club Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                />
            </div>
            <div className="d-grid">
                <button className="btn btn-primary">Submit</button>
            </div>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
        </form>
    );
}
