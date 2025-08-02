import React from 'react';
import "./Header.css";
import "../assets/style.css";
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
    home_page_items = <div className="input_panel">
      <text className='username'>{sessionStorage.getItem("username")}</text>
    <a className="nav_item" href="/djangoapp/logout" onClick={logout}>Logout</a>
  </div>
}
    return (
        <div>
          <nav class="header">
        <div class="nav-container">
            <a href="/" class="logo">
                <i class="fas fa-flag-checkered"></i>
                Best Cars Dealerships
            </a>
            
            <nav>
                <ul class="nav-menu">
                    <li><a href="/" class="nav-link">Home</a></li>
                    <li><a href="/about" class="nav-link">About Us</a></li>
                    <li><a href="/contact" class="nav-link">Contact Us</a></li>
                </ul>
            </nav>

          <span class="navbar-text">
                  <div class="loginlink" id="loginlogout">
                  {home_page_items}
                  </div>
          </span>
        </div>
    </nav>
        </div>
    )
}

export default Header
