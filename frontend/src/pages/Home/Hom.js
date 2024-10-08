// Hom.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Hom.css";
import Faqs from "./Faqs";
import message from './Images/message.png';
import Chatbot from "./Chatbot"; 

export default function Hom() {
  const [messageOpen, setMessageOpen] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
    script.type = "module";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleMessageButton = () => {
    setMessageOpen(!messageOpen);
  };

  let cardDetails = [
    {
      title: "Education",
      description:
        "Get complete understanding of concepts. Adapt life skills. Gain general knowledge and enjoy activity-based learning.",
      image: "./images/e3.png",
      action: "Learn Now",
    },
    {
      title: "Career",
      description:
        "Explore career opportunities and make yourself ready for employment in various fields. Learn how to build your own startup and become a successful entrepreneur.",
      image: "./images/e4.png",
      action: "Explore Now",
    },
    {
      title: "Loans and Grants",
      description:
        "Complete information about loans, grants, and scholarships. Simple procedure and steps to apply easily.",
      image: "./images/e5.png",
      action: "Check Now",
    },
  ];

  return (
    <div className="hom-container">
      <main className="main-content">
        <button className="message">
          <div onClick={handleMessageButton}>
            <img src={message} width={40} height={40} alt="message icon"/>
          </div>
          {messageOpen && <Chatbot />} 
        </button>
        <div className="intro-section">
          <div className="animation-container">
            <dotlottie-player
              src="https://lottie.host/b1cad9ac-0380-434e-8c9c-8d840821f788/Xf4k2KSbTr.json"
              background="transparent"
              speed="1"
              className="lottie-animation"
              loop
              autoplay
            ></dotlottie-player>
          </div>
          <div className="intro-text">
            <h1 className="title">
              Dive into the World of Knowledge, Skills and Wisdom
            </h1>
            <p className="subtitle">
              Empower yourself with our comprehensive learning platform
            </p>
            <div className="button-group">
              <Link to="/Signup" className="btn-default">Sign Up</Link>
              <Link to="/login" className="btn-outline">Login</Link>
            </div>
          </div>
        </div>

        <div className="d-flex flex-wrap gap-3 justify-content-center">
          {cardDetails.map((item, index) => (
            <div key={index} className="card" style={{ maxWidth: "350px" }}>
              <div className="card-header">
                <h2 className="card-title">{item.title}</h2>
              </div>
              <div className="card-content">
                <img src={item.image} alt={item.title} className="card-image" style={{ objectFit: "cover" }} />
                <p className="card-description">{item.description}</p>
                {item.title === "Loans and Grants" ? (
                  <Link to="/Loan">
                    <button className="btn-default card-button">{item.action}</button>
                  </Link>
                ) : (
                  <button className="btn-default card-button">{item.action}</button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div>
          <Faqs />
        </div>
      </main>
    </div>
  );
}