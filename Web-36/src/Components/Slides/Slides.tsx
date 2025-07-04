import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Slides.scss";
import ellipse from "../Home_Image/Ellipse 6.png";

const Slides = () => {
  const slides = Array.from({ length: 5 });

  return (
    <div className="slides-container">
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        pagination={{
          el: ".slides-pagination",
          clickable: true,
        }}
        className="slides-swiper"
      >
        {slides.map((_, i) => (
          <SwiperSlide key={i} className="slides-slide">
            <SlideContent />
          </SwiperSlide>
        ))}
        <div className="slides-pagination"></div>
      </Swiper>
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
