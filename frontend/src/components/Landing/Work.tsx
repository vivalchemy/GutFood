//@ts-ignore

import './App.css';
import PickMeals from "../../Assets/pick-meals-image.png";
import Scan from "../../Assets/scan.png";
import Data from "../../Assets/data.png";
import Results from "../../Assets/exam-results.png";
import ChooseMeals from "../../Assets/choose-image.png";
import DeliveryMeals from "../../Assets/delivery-image.png";

const Work = () => {
  const workInfoData = [
    {
      image: Scan,
      title: "Scan Your Food",
      text: "Open the FreshScan app and use your smartphone camera to take a clear, high-quality picture of the food you want to analyze.",
    },
    {
      image: Data,
      title: "Get Instant Analysis",
      text: "Our AI/ML system evaluates the food for freshness, identifies the ingredients, and assesses any potential health risks.",
    },
    {
      image: Results,
      title: "Receive Results",
      text: "View the detailed report on your screen, including the food’s quality, ingredients, and any warnings about possible health risks.",
    },
  ];

  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
          FreshScan uses AI-powered technology to instantly analyze your food. Simply scan it with your phone, and our system will assess freshness, detect ingredients, and identify any potential health risks—all in just a few seconds!
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-box">
              
              <img src={data.image} alt={data.title} className="info-box-image" />
              <h2 className="info-box-title">{data.title}</h2>
              <p className="info-box-text">{data.text}</p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
