import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap styles are imported

export default function About() {
  
  return (
    <div className="container-fluid p-0 position-relative">
      <div className="row no-gutters">
      {/* Introduction Section with Canvas Background */}
      <div className="introduction-section d-flex align-items-center justify-content-center text-center text-white position-relative">
        
        <div className="content position-relative">
          <h1 className="display-3 mb-4">About Us</h1>
          <p className="lead mb-4">
            Learn more about ReactLearning, our mission, and the amazing team behind the scenes.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mission-section p-5 text-center">
        <h2 className="display-4 mb-4">Our Mission</h2>
        <p className="lead">
          At ReactLearning, our mission is to empower individuals by providing high-quality, interactive learning experiences. 
          We aim to make learning accessible, engaging, and enjoyable for everyone.
        </p>
      </div>

      {/* Team Section */}
      <div className="team-section p-5">
        <h2 className="display-4 text-center mb-4">Meet the Team</h2>
        <div className="row">
          {/* Team Member 1 */}
          <div className="col-md-4 mb-4">
            <div className="team-member p-4 text-center">
              <div className="avatar mb-3">
                <img src="https://via.placeholder.com/150" alt="Team Member" className="img-fluid rounded-circle" />
              </div>
              <h4 className="h5 mb-2">John Doe</h4>
              <p className="text-muted">Lead Developer</p>
              <p>John is a passionate developer with over 10 years of experience in building interactive web applications.</p>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="col-md-4 mb-4">
            <div className="team-member p-4 text-center">
              <div className="avatar mb-3">
                <img src="https://via.placeholder.com/150" alt="Team Member" className="img-fluid rounded-circle" />
              </div>
              <h4 className="h5 mb-2">Jane Smith</h4>
              <p className="text-muted">Product Manager</p>
              <p>Jane ensures that our product meets the highest standards and that the team stays on track with the project goals.</p>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="col-md-4 mb-4">
            <div className="team-member p-4 text-center">
              <div className="avatar mb-3">
                <img src="https://via.placeholder.com/150" alt="Team Member" className="img-fluid rounded-circle" />
              </div>
              <h4 className="h5 mb-2">Alex Johnson</h4>
              <p className="text-muted">UX/UI Designer</p>
              <p>Alex creates beautiful and user-friendly designs that enhance the learning experience for our users.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="text-center text-white p-4">
        <p>&copy; 2024 ReactLearning. All rights reserved.</p>
      </footer>

      {/* Styles */}
      <style jsx>{`
        .introduction-section {
         background: linear-gradient(76deg, rgba(3,67,67,1) 0%, rgba(158,129,106,1) 49%, rgba(8,62,113,1) 100%);
          min-height: 60vh;
          padding-top: 70px; /* Adjust padding to account for the fixed navbar */
          position: relative;
          overflow: hidden;
        }
        .content {
          position: relative;
          z-index: 2; /* Ensure content is above the canvas */
        }
        #aboutCanvas {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
          background-color: black;
          opacity: 0.6; /* Lighter background effect */
        }
        .mission-section {
          background: #f8f9fa;
        }
        .team-member {
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .team-member:hover {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        .footer-section {
          background: #333333;
        }
      `}</style>
    </div></div>
  );
}
