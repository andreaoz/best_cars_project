import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/style.css'

const Home = () => {
    // El useEffect reemplaza al `onload` del body
    useEffect(() => {
        const checkSession = () => {
            let curr_user = sessionStorage.getItem("username");
            const loginLogoutDiv = document.getElementById("loginlogout");

            if (curr_user && curr_user !== "") {
                loginLogoutDiv.innerHTML =
                    `<span class="user-info">${curr_user}</span>` +
                    `<a class="btn-auth btn-login" href="#" id="logoutLink">Logout</a>`;

                document.getElementById("logoutLink").addEventListener("click", logout);
            } else {
                loginLogoutDiv.innerHTML =
                    `<a class="btn-auth btn-login" href="/login">Login</a>` +
                    `<a class="btn-auth btn-register" href="/register">Register</a>`;
            }
        };

        const logout = async (e) => {
            let logout_url = window.location.origin + "/djangoapp/logout";
            
            // Reemplaza fetch con una llamada de axios si lo usas
            const res = await fetch(logout_url, {
                method: "GET",
                credentials: "include",
            });

            const json = await res.json();
            if (json) {
                let username = sessionStorage.getItem('username');
                alert("Logging out " + username + "...");
                sessionStorage.removeItem('username');
                setTimeout(() => {
                    window.location.href = window.location.origin;
                }, 500);
            } else {
                alert("The user could not be logged out.");
            }
        };
        checkSession();
    }, []); 

    return (
        <div className='homepage'>
            <header className="header">
                <div className="nav-container">
                    <Link to="/" className="logo">
                        <i className="fas fa-flag-checkered"></i>
                        Best Cars Dealerships
                    </Link>
                    <nav>
                        <ul className="nav-menu">
                            <li><Link to="/" className="nav-link">Home</Link></li>
                            <li><Link to="/under-construction" className="nav-link">About Us</Link></li>
                            <li><Link to="/under-construction" className="nav-link">Contact Us</Link></li>
                        </ul>
                    </nav>
                    <div className="auth-buttons" id="loginlogout">
                    </div>
                </div>
            </header>

            <section className="hero">
                <div className="hero-content">
                    <h3 className="hero-title">Your Next Car Is Waiting For You</h3>
                    <p className="hero-subtitle">Experience the adrenaline of finding the perfect dealership. <br /> Speed, power, and excellence come together to offer you the ultimate automotive experience.</p>
                    <div className="dealership-card">
                        <div className="card-icon">
                            <i className="fas fa-tachometer-alt"></i>
                        </div>
                        <h2 className="card-title">¡Find Your Perfect Dealership!</h2>
                        <p className="card-description">
                            Discover our network of high-performance dealerships.
                        </p>
                        <Link to="/dealers" className="btn-primary">
                            <i className="fas fa-racing-flag"></i>
                            See our list
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;