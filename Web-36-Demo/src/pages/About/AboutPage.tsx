// import React from "react";
import "./AboutPage.scss";
import Header from "../../Components/Header/Header";
import Slides from "../../Components/Slides/Slides";
import Features from "../../Components/Features/Features";
import Categories from "../../Components/Categories/Categories";
import Collection from "../../Components/Collection/Collection";
import Shipping from "../../Components/Shipping/Shipping";
import Footer from "../../Components/Footer/Footer";
import { Outlet } from "react-router-dom";
const AboutPage = () => {
  return (
    <div className="home-page">
      <Header />
      <Slides />
      <Features />
      <Categories />
      <Collection />
      <Shipping />
      <Footer />
      <Outlet />
    </div>
  );
};
export default AboutPage;
