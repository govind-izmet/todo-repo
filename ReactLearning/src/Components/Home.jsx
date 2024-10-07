import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap styles are imported
import Slider from 'react-slick'; // Import react-slick
import { useSpring, animated } from 'react-spring'; // Import for animations

// Import slick carousel styles
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

export default function Home() {
  // Animation for the hero section using react-spring
  const heroAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  useEffect(() => {
    const canvas = document.getElementById('test');
    const ctx = canvas.getContext('2d');
    const w = window.innerWidth;
    const h = window.innerHeight;
    const rate = 60;
    const arc = 100;
    const size = 7;
    const speed = 20;
    const colors = ['red','#f57900','yellow','#ce5c00','#5c3566'];
    let parts = new Array(arc);
    let time = 0;
    let count = 0;
    const mouse = { x: 0, y: 0 };

    canvas.width = w;
    canvas.height = h;

    function createParticles() {
      for (let i = 0; i < arc; i++) {
        parts[i] = {
          x: Math.ceil(Math.random() * w),
          y: Math.ceil(Math.random() * h),
          toX: Math.random() * 5 - 1,
          toY: Math.random() * 2 - 1,
          c: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * size,
        };
      }
    }

    function particles() {
      ctx.clearRect(0, 0, w, h);
      canvas.addEventListener('mousemove', handleMouseMove, false);
      
      for (let i = 0; i < arc; i++) {
        const li = parts[i];
        const distanceFactor = Math.max(Math.min(15 - (distanceBetween(mouse, li) / 10), 10), 1);
        
        ctx.beginPath();
        ctx.arc(li.x, li.y, li.size * distanceFactor, 0, Math.PI * 2, false);
        ctx.fillStyle = li.c;
        ctx.strokeStyle = li.c;
        if (i % 2 === 0) ctx.stroke();
        else ctx.fill();

        li.x += li.toX * (time * 0.05);
        li.y += li.toY * (time * 0.05);

        if (li.x > w) li.x = 0;
        if (li.y > h) li.y = 0;
        if (li.x < 0) li.x = w;
        if (li.y < 0) li.y = h;
      }

      if (time < speed) time++;
      setTimeout(particles, 1000 / rate);
    }

    function handleMouseMove(e) {
      mouse.x = e.layerX;
      mouse.y = e.layerY;
    }

    function distanceBetween(p1, p2) {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      return Math.sqrt(dx * dx + dy * dy);
    }

    createParticles();
    particles();

    // Cleanup on unmount
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <div className="container-fluid p-0 position-relative">
      <div className="row no-gutters">
        {/* Hero Section with particle canvas as background */}
        <animated.div style={heroAnimation} className="hero-section d-flex align-items-center justify-content-center text-center text-white position-relative">
          <canvas id="test" className="position-absolute"></canvas>
          <div className="content position-relative">
            <h1 className="display-3 mb-4">Welcome to ReactLearning</h1>
            <p className="lead mb-4">Your gateway to knowledge and skills.</p>
            <button className="btn btn-light btn-lg">Get Started</button>
          </div>
        </animated.div>

        {/* Slider Section */}
        <div className="slider-section py-5">
          <div className="container">
            <Slider {...sliderSettings}>
              <div className="slider-item p-4 text-center">
                <h3>Learn React</h3>
                <p>Enhance your skills with our comprehensive React courses.</p>
              </div>
              <div className="slider-item p-4 text-center">
                <h3>Master JavaScript</h3>
                <p>Deep dive into JavaScript with expert-led tutorials.</p>
              </div>
              <div className="slider-item p-4 text-center">
                <h3>Explore Web Development</h3>
                <p>Build robust and scalable web applications with our guides.</p>
              </div>
            </Slider>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section py-5">
          <div className="container">
            <div className="row">
              {/* Feature 1 */}
              <div className="col-md-4 mb-4">
                <div className="feature-box p-4 text-center d-flex flex-column align-items-center justify-content-center">
                  <i className="bi bi-laptop display-4 mb-3"></i>
                  <h2 className="h4 mb-3">Interactive Courses</h2>
                  <p>Engage with interactive lessons to enhance your learning experience.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="col-md-4 mb-4">
                <div className="feature-box p-4 text-center d-flex flex-column align-items-center justify-content-center">
                  <i className="bi bi-person-circle display-4 mb-3"></i>
                  <h2 className="h4 mb-3">Expert Instructors</h2>
                  <p>Learn from industry experts and gain insights from experienced professionals.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="col-md-4 mb-4">
                <div className="feature-box p-4 text-center d-flex flex-column align-items-center justify-content-center">
                  <i className="bi bi-clock display-4 mb-3"></i>
                  <h2 className="h4 mb-3">Flexible Learning</h2>
                  <p>Access courses anytime, anywhere, and at your own pace to fit your schedule.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="footer-section text-center text-white py-4">
          <p>&copy; 2024 ReactLearning. All rights reserved.</p>
        </footer>

        {/* Inline Styles */}
        <style jsx>{`
          .hero-section {
            background: linear-gradient(76deg, rgba(3,67,67,1) 0%, rgba(158,129,106,1) 49%, rgba(8,62,113,1) 100%);
            min-height: 80vh;
            padding-top: 80px; /* Adjust padding to account for the fixed navbar */
            color: #fff;
            overflow: hidden;
          }
          .content {
            position: relative;
            z-index: 2; /* Ensure content is above the canvas */
          }
          .btn-light {
            background: #fff;
            border: 2px solid #fff;
            color: #6a11cb;
            transition: background 0.3s, color 0.3s;
          }
          .btn-light:hover {
            background-color: rgba(255, 99, 71, 0.2);
            color: #fff;
          }
          .slider-section {
            background: #f8f9fa;
          }
          .slider-item {
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s, box-shadow 0.3s;
          }
          .slider-item:hover {
            transform: scale(1.05);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
          }
          .feature-box {
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s, box-shadow 0.3s;
            padding: 30px;
            text-align: center;
          }
          .feature-box:hover {
            transform: scale(1.05);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
          }
          .feature-box i {
            color: #6a11cb;
            transition: color 0.3s;
          }
          .feature-box:hover i {
            color: #2575fc;
          }
          .footer-section {
            background: #212529;
          }
          .slick-dots li button:before {
            color: #6a11cb;
          }
          .slick-dots li.slick-active button:before {
            color: #2575fc;
          }
          #test {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            width: 100%;
            height: 100%;
            background-color: black;
            opacity: 0.6; /* Lighter background effect */
          }
        `}</style>
      </div></div>
    </>
  );
}
