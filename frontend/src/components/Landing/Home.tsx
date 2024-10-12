// import React from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import BannerBackground from "../../Assets/home-banner-background.png";
import BannerImage from "../../Assets/home-banner-image.png";
import Navbar from "./Navbar";
// import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  // Define animation variants
  const imageVariants1 = {
    hidden: { opacity: 0, x: 100 }, // Start off-screen to the right
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }, // Animate to original position
  };
  const imageVariants2 = {
    hidden: { opacity: 0, rotate: 90, x: 100 }, // Start off-screen and rotated
    visible: { opacity: 1, rotate: 0, x: 0, transition: { duration: 1 } }, // Animate to original position
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <motion.img
            src={BannerBackground}
            alt=""
            variants={imageVariants1} // Apply variants
            initial="hidden" // Initial state
            whileInView="visible" // State when in view
            viewport={{ once: true }} // Only animate once
          />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Your AI-Powered Food Safety Guardian
          </h1>
          <p className="primary-text">
            Ensuring the safety and quality of your food, delivered hot and fresh.
          </p>
        </div>
        <div className="home-image-section">
          <motion.img
            src={BannerImage}
            alt=""
            variants={imageVariants2} // Apply variants
            initial="hidden" // Initial state
            whileInView="visible" // State when in view
            viewport={{ once: true }} // Only animate once
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
