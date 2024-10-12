//@ts-ignore

import React from "react";
import AboutBackground from "../../Assets/about-background.png";
import AboutBackgroundImage from "../../Assets/about-background-image.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigator = useNavigate();

  // Define animation variants
  const imageVariants1 = {
    hidden: { opacity: 0, x: -200 }, // Start off-screen to the left
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }, // Animate to original position
  };

  const imageVariants2 = {
    hidden: { opacity: 0, rotate: 90, x: -100 }, // Start off-screen to the left and rotated
    visible: { opacity: 1, rotate: 0, x: 0, transition: { duration: 1 } }, // Animate to original position
  };

  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <motion.img
          src={AboutBackground}
          alt=""
          variants={imageVariants1} // Apply variants
          initial="hidden" // Initial state
          whileInView="visible" // State when in view
          viewport={{ once: true }} // Only animate once
        />
      </div>
      <div className="about-section-image-container">
        <motion.img
          src={AboutBackgroundImage}
          alt=""
          variants={imageVariants2} // Apply variants
          initial="hidden" // Initial state
          whileInView="visible" // State when in view
          viewport={{ once: true }} // Only animate once
        />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
          Good Nutrition Begins with Safe, Fresh Food
        </h1>
        <p className="primary-text">
          At GutFood, we aim to help individuals eat safely by using AI/ML technology to quickly assess the freshness and quality of food. Our platform identifies potential risks in meals, ensuring that you make informed decisions about what you consume.
        </p>
        <p className="primary-text">
          Founded by a team passionate about AI and food safety, FreshScan is dedicated to improving food standards and promoting better health outcomes worldwide.
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button" onClick={() => navigator("/app")}>Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default About;
