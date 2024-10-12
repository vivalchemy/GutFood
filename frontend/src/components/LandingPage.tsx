import "./Landing/App.css";
import Home from "./Landing/Home";
import About from "./Landing/About";
import Cards from "./Landing/FeatureCards";
import Work from "./Landing/Work";
import Testimonial from "./Landing/Testimonial";
import Contact from "./Landing/Contact";
import Footer from "./Landing/Footer";

function LandingPage() {
  return (
    <div className="mx-24">
      <Home />
      <About />
      <Cards />
      <Work />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  )
}

export default LandingPage
