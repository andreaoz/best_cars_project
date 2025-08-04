import React, { useState } from "react";
import "../Login/Login.css";

const Register = () => {
// State variables for form inputs
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");

// Redirect to home
  const gohome = ()=> {
    window.location.href = window.location.origin;
  }

// Handle form submission
  const register = async (e) => {
    e.preventDefault();

    let register_url = window.location.origin+"/djangoapp/register";

// Send POST request to register endpoint
    const res = await fetch(register_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "userName": userName,
            "password": password,
            "firstName":firstName,
            "lastName":lastName,
            "email":email
        }),
    });

    const json = await res.json();
    if (json.status) {
    // Save username in session and reload home
        sessionStorage.setItem('username', json.userName);
        window.location.href = window.location.origin;
    }
    else if (json.error === "Already Registered") {
      alert("The user with same username is already registered");
      window.location.href = window.location.origin;
    }
};

  return(
    <div className="homepage">
    <div className="login-page-container">
      <div className="login_panel">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
          <span className="login-title">Sign Up</span>
          <a href="/" className="loginlink"  onClick={() => gohome()} style={{ alignSelf: "start" , fontSize: "30px"}}>
          X
          </a>
        </div>

        <form onSubmit={register}>
          <div className="input-group">
            <label className="input_field_label">Username</label>
            <div className="input">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="input_field"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input_field_label">First Name</label>
            <div className="input">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                className="input_field"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input_field_label">Last Name</label>
            <div className="input">
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                className="input_field"
                onChange={(e) => setlastName(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input_field_label">Email</label>
            <div className="input">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input_field"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input_field_label">Password</label>
            <div className="input">
              <input
                type="password"
                name="psw"
                placeholder="Password"
                className="input_field"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="button-group">
            <input className="action_button" type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Register;