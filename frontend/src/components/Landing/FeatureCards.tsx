import './App.css'; // Correct path to import App.css
import FQ from "../../Assets/Food-Quality.jpg"; // Food Quality image
import ID from "../../Assets/Ingredient-Detection.png";
import DP from "../../Assets/Disease-Prediction.png"; // Disease Prediction image

const FeatureCards = () => {
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
                <button className="feature-card-button">Get Started</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
