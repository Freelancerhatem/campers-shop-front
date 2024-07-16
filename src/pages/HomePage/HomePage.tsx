import React from "react";
import Hero from "../../components/Hero/Hero";
import BestProduct from "../../components/BestProduct/BestProduct";
import Category from "../../components/Category/Category";
import Featured from "../../components/Featured/Featured";
import Faq from "../../components/Faq/Faq";
import TestimonialSlider from "../../components/TestimonialSlider/TestimonialSlider";

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <Hero></Hero>
      <BestProduct></BestProduct>
      <Category></Category>
      <Featured></Featured>
      <TestimonialSlider></TestimonialSlider>
      <Faq></Faq>
    </div>
  );
};

export default HomePage;
