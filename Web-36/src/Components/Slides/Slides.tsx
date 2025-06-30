import React, { useEffect } from "react";
import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Slides.scss";
import ellipse from "../Home_Image/Ellipse 6.png";

const Slides = () => {
  useEffect(() => {
    const swiperElement = document.querySelector(".mySwiper");
    if (!swiperElement) return;

    const swiper = new Swiper(".mySwiper", {
      modules: [Pagination],
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    return () => swiper.destroy();
  }, []);

  const slides = Array.from({ length: 5 });

  return (
    <div className="swiper-container mySwiper swiper">
      <div className="swiper-wrapper">
        {slides.map((_, i) => (
          <div className="swiper-slide" key={i}>
            <SlideContent />
          </div>
        ))}
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
};

const SlideContent = () => (
  <div className="body__intro">
    <div className="body__intro-header">
      <h1 className="body__intro-header-title">
        Bộ sưu tập mới
        <span className="body__intro-header-subtitle">
          <span className="body__discount">Giảm 15%</span> giá sản phẩm
        </span>
      </h1>
      <img className="body__intro-header-ellipse" src={ellipse} alt="ellipse" />
    </div>
    <div className="body__intro-caption">
      Chúng tôi tự tin cung cấp cho quý khách những sản phẩm đá quý tốt nhất,
      dịch vụ của chúng tôi đã có mặt hơn 12 tỉnh thành Việt Nam. Sang trọng,
      quý phái là những gì chúng tôi mang lại cho khách hàng.
    </div>
    <button type="button" className="body__intro-more">
      XEM THÊM
    </button>
  </div>
);

export default Slides;
