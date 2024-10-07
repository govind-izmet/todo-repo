import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap styles are imported

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary " style={{ background: ' linear-gradient(76deg, rgba(3,67,67,1) 0%, rgba(158,129,106,1) 49%, rgba(8,62,113,1) 100%)' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <Link className="navbar-brand" to="/">ReactLearning</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item dropdown">
              <Link 
                className="nav-link dropdown-toggle" 
                to="/" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false">
                Projects
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/textcounter">Display Input Data</Link></li>
                <li><Link className="dropdown-item" to="/text">Text Manipulation</Link></li>
                <li><Link className="dropdown-item" to="/ecom">Array Delete</Link></li>
                <li><Link className="dropdown-item" to="/counter">Counter</Link></li>
                <li><Link className="dropdown-item" to="/passgen">Password Generator</Link></li>
                <li><Link className="dropdown-item" to="/todo">To Do List</Link></li>
                <li><Link className="dropdown-item" to="/ecart">E Kart</Link></li>
                <li><hr className="dropdown-divider" /></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          padding: 0.5rem 1rem;
          background: linear-gradient(#833ab4, #d75a11, #fcb045);
        }
        .navbar-brand {
          font-size: 1.5rem;
          color: #ffffff;
        }
        .navbar-nav .nav-link {
          color: #ffffff;
          transition: color 0.3s, background-color 0.3s;
        }
        .navbar-nav .nav-link:hover {
          color: #ff7e5f;
          background-color: rgba(255, 255, 255, 0.1);
        }
        .dropdown-menu {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .dropdown-item {
          color: #333333;
        }
        .dropdown-item:hover {
          color: #ff7e5f;
          background-color: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </nav>
  );
}
