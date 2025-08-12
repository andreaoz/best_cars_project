import React from 'react';
import './Header.css';
import "../assets/bootstrap.min.css";

const Header = () => {
    const logout = async (e) => {
    e.preventDefault();
    let logout_url = window.location.origin+"/djangoapp/logout";
    const res = await fetch(logout_url, {
      method: "GET",
    });
  
    const json = await res.json();
    if (json) {
      let username = sessionStorage.getItem('username');
      sessionStorage.removeItem('username');
      window.location.href = window.location.origin;
      window.location.reload();
      alert("Logging out "+username+"...")
    }
    else {
      alert("The user could not be logged out.")
    }
  };
    
//The default home page items are the login details panel
let home_page_items =  <div></div>

//Gets the username in the current session
let curr_user = sessionStorage.getItem('username')

//If the user is logged in, show the username and logout option on home page
if ( curr_user !== null &&  curr_user !== "") {
    home_page_items = <div className="auth-buttons">
      <text className='user-info'>{sessionStorage.getItem("username")}</text>
    <a className="btn-auth btn-login" href="/djangoapp/logout" onClick={logout}>Logout</a>
  </div>
}
    return (
        <div>
          <nav className="header">
        <div className="nav-container">
            <a href="/" className="logo">
                <i className="fas fa-flag-checkered"></i>
                Best Cars Dealerships
            </a>
            
            <nav>
                <ul className="nav-menu">
                    <li><a href="/" className="nav-link">Home</a></li>
                    <li><a href="/under-construction" className="nav-link">About Us</a></li>
                    <li><a href="/under-construction" className="nav-link">Contact Us</a></li>
                </ul>
            </nav>
                
            <div  className='auth-buttons' id="loginlogout">
              {home_page_items}
            </div>
                  
        </div>
    </nav>
        </div>
    )
}

export default Header;
