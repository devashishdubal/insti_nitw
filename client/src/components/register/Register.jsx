import React from 'react'

const Register = () => {
    return (
        <div class="register-container">
            <div class="image-bar">
                <img src="./images/sidebar.jpg" />
                    <div class="card-body">
                        <img src="./images/csea-logo.png" />
                    </div>
            </div>
            <div class="content">
                <div class="text-1">
                    TO ITERATE IS HUMAN, RECURSION IS DIVINE.
                </div>
                <div class="text-2">
                    Sign up now and recurse with us.
                </div>
                <div class="form-container">
                    <div class="form-subtext">Let's do this!</div>
                    <div class="mand">*All fields are mandatory</div>
                    <form action="./home.html" method="POST">
                        <div class="form_element">
                            <label for="first_name">FIRST NAME</label>
                            <input type="text" id="first_name" name="first_name" required />
                        </div>
                        <div class="form_element">
                            <label for="last_name">LAST NAME</label>
                            <input type="text" id="last_name" name="last_name" required />
                        </div>
                        <div class="form_element">
                            <label for="email">EMAIL</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div class="form_element">
                            <label for="phone">PHONE NUMBER</label>
                            <input type="tel" id="phone" name="phone" required />
                        </div>
                        <div class="form_element">
                            <label for="pass_1">PASSWORD</label>
                            <input type="password" id="pass_1" name="pass_1" required title="Please use min. 8 letters, including 1 caps, 1 small and 1 special char./number." pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" />
                        </div>
                        <div class="form_element">
                            <label for="pass_2">CONFIRM PASSWORD</label>
                            <input type="password" id="pass_2" name="pass_2" required />
                        </div>
                        <button type="submit">Create Account</button>
                    </form>
                </div>
                <div class="instead">Already have an account? <a href="">Login</a></div>
            </div>
        </div>
    );
};

export default Register
