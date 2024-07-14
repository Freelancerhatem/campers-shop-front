import React from "react";
import Hero from "../../components/Hero/Hero";
import BestProduct from "../../components/BestProduct/BestProduct";
import Category from "../../components/Category/Category";
import Featured from "../../components/Featured/Featured";
import Unique from "../../components/Unique/Unique";
import Faq from "../../components/Faq/Faq";

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <Hero></Hero>
      <BestProduct></BestProduct>
      <Category></Category>
      <Featured></Featured>
      <Unique></Unique>
      <Faq></Faq>
    </div>
  );
};

export default HomePage;
