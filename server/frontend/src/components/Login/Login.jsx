import React, { useState } from 'react';

import "./Login.css";
import Header from '../Header/Header';

const Login = ({ onClose }) => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open,setOpen] = useState(true)

  let login_url = window.location.origin+"/djangoapp/login";

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch(login_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "userName": userName,
            "password": password
        }),
    });
    
    const json = await res.json();
    if (json.status != null && json.status === "Authenticated") {
        sessionStorage.setItem('username', json.userName);
        setOpen(false);        
    }
    else {
      alert("The user could not be authenticated.")
    }
};

  if (!open) {
    window.location.href = "/";
  };
  

  return (
    <div className='homepage'>
      <Header/>
    <div className='login-page-container' onClick={onClose}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer'
      >
          <form className="login_panel" style={{}} onSubmit={login}>
            <h2 class="login-title">Welcome Back</h2>
              
              <div className='input-group'>
              <div className="input_field_label">Username </div>
              <input type="text"  name="username" placeholder="Enter your username" className="input_field" onChange={(e) => setUserName(e.target.value)}/>
              </div>

              <div className='input-group'>
              <div className="input_field_label">Password </div>
              <input name="psw" type="password"  placeholder="Enter your password" className="input_field" onChange={(e) => setPassword(e.target.value)}/>            
              </div>

              <div className='button-group'>
              <input className="action_button" type="submit" value="Login"/>
              <input className="action_button" type="button" value="Cancel" onClick={()=>setOpen(false)}/>
              </div>

              <div class="divider">
                  <span>or</span>
              </div>

              <a className="loginlink" href="/register">Register Now</a>
          </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
