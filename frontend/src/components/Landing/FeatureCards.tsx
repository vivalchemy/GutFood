import React, { useState } from 'react';
import './App.css'; // Correct path to import App.css
import FQ from "../../Assets/Food-Quality.jpg"; // Food Quality image
import ID from "../../Assets/Ingredient-Detection.png";
import DP from "../../Assets/Disease-Prediction.png"; // Disease Prediction image
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeatureCards = () => {
  const [isOpen, setIsOpen] = useState(false); // State for modal visibility
  const features = [
    {
      title: 'Food Quality Detection',
      description: 'Instantly check your food freshness.',
      image: FQ, // Food Quality image
    },
    {
      title: 'Ingredient Detection',
      description: 'Identify ingredients in your meals.',
      image: ID, // Ingredient Detection image
    },
    {
      title: 'Disease Prediction',
      description: 'Assess health risks from food.',
      image: DP, // Disease Prediction image
    },
  ];
  const navigator = useNavigate();

  // Variants for the modal animation
  const modalVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="work-section-wrapper">
      <div className="feature-cards-container">
        <h2 className="feature-cards-title">Our Features</h2>
        <div className="feature-cards-wrapper">
          <div className="feature-cards">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="feature-card-image"
                />
                <h3 className="feature-card-title">{feature.title}</h3>
                <p className="feature-card-description">{feature.description}</p>
                <button className="feature-card-button" onClick={handleOpen}>Get Started</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <motion.div
          className="modal-overlay"
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="modal-content"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <h2>Select a Feature</h2>
            <div className="modal-features">
              {features.map((feature, index) => (
                <div key={index} className="modal-feature">
                  <img src={feature.image} alt={feature.title} />
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <button onClick={() => { handleClose(); navigator("/app"); }}>Learn More</button>
                </div>
              ))}
            </div>
            <button className="close-button" onClick={handleClose}>Close</button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default FeatureCards;
