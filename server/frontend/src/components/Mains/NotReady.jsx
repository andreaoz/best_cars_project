import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/style.css'

const NotReady = () => {

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
                    <div className="dealership-card">
                        <div className='banner'>
                            🚧
                        </div>
                        <h2 className="card-title">Work in Progress</h2>
                        <p className="card-description">
                            We are working hard to bring you something amazing.
                        </p>
                        <Link to="/" className="btn-primary">
                            <i className="fas fa-racing-flag"></i>
                            Go back
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NotReady;