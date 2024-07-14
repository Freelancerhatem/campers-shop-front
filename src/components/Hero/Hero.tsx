import React from "react";
import bg from "../../assets/images/bg.jpg";

const Hero: React.FC = () => {
  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="bg-cover bg-gray-500 bg-center bg-hero-image h-screen flex items-center"
    >
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          Explore the Great Outdoors
        </h1>
        <p className="text-lg md:text-xl text-white mb-8">
          Find the perfect gear for your next adventure
        </p>
        <a
          href="#"
          className="bg-white text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-lg uppercase hover:bg-gray-100"
        >
          Shop Now
        </a>
      </div>
    </div>
  );
};

export default Hero;
