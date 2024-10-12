//@ts-ignore

import React from "react";
import AboutBackground from "../../Assets/about-background.png";
import AboutBackgroundImage from "../../Assets/about-background-image.png";
import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
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
          <button className="secondary-button">Learn More</button>
          
        </div>
      </div>
    </div>
  );
};

export default About;
