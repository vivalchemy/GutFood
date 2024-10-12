import ProfilePic from "../../Assets/download (1).jpg";
import ProfilePic2 from "../../Assets/download (2).jpg";
import ProfilePic3 from "../../Assets/download (3).jpg";
import './App.css';
import { AiFillStar } from "react-icons/ai";

const Testimonial = () => {
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Testimonial</p>
        <h1 className="primary-heading">What They Are Saying</h1>
        <p className="primary-text">
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
          elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
        </p>
      </div>
      <div className="testimonal-wrapper">
        <div className="testimonial-section-bottom flex flex-col items-center p-4">
          <img src={ProfilePic} alt="" className="w-24 h-24 image mb-4" />
          <p className="text-center mb-4">
          I was initially skeptical, but this product is a game-changer. Simple to use and thoughtfully designed. Truly impressive and highly recommended!
          </p>
          <div className="testimonials-stars-container flex space-x-1 mb-2">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </div>
          <h2 className="font-semibold text-lg">harshdeep singh</h2>
        </div>

        <div className="testimonial-section-bottom flex flex-col items-center p-4">
          <img src={ProfilePic2} alt="" className="w-24 h-24 image mb-4" />
          <p className="text-center mb-4">
          Great customer support and flawless product. They were very responsive and helpful, making setup easy. I’ve already recommended it to friends!
          </p>
          <div className="testimonials-stars-container flex space-x-1 mb-2">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </div>
          <h2 className="font-semibold text-lg">Jaykant Shikre</h2>
        </div>

        <div className="testimonial-section-bottom flex flex-col items-center p-4">
          <img src={ProfilePic3} alt="" className="w-24 h-24 image mb-4" />
          <p className="text-center mb-4">
          Arey wah, yeh toh zabardast hai! Super easy to use, looks amazing, and so efficient! Full paisa vasool! Trust me, just go for it!
          </p>
          <div className="testimonials-stars-container flex space-x-1 mb-2">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </div>
          <h2 className="font-semibold text-lg">Rakhi Sawant</h2>
        </div>
      </div>


    </div>
  );
};

export default Testimonial;
