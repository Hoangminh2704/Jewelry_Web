import React, { useEffect } from "react";
import "./Footer.scss";
import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
const Slides = () => {
  useEffect(() => {
    document.addEventListener("DOMContentLoaded", () => {
      const swiperElement = document.querySelector(".mySwiper");
      if (swiperElement) {
        new Swiper(".mySwiper", {
          modules: [Pagination],
          spaceBetween: 30,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
        });
      }
    });
  });
  return (
    <div className="swiper-container mySwiper swiper">
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <div className="body__intro">
            <div className="body__intro-header">
              <h1 className="body__intro-header-title">
                Bộ sưu tập mới
                <span className="body__intro-header-subtitle">
                  <span className="body__discount">Giảm 15%</span> giá sản phẩm
                </span>
              </h1>
              <img
                className="body__intro-header-ellipse"
                src="../Home_Image/Ellipse 6.png"
                alt=""
              />
            </div>
            <div className="body__intro-caption">
              Chúng tôi tự tin cung cấp cho quý khách những sản phẩm đá quý tốt
              nhất, dịch vụ của chúng tôi đã có mặt hơn 12 tỉnh thành Việt Nam.
              Sang trọng, quý phái là những gì chúng tôi mang lại cho khách
              hàng.
            </div>
            <button type="button" className="body__intro-more">
              XEM THÊM
            </button>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="body__intro">
            <div className="body__intro-header">
              <h1 className="body__intro-header-title">
                Bộ sưu tập mới
                <span className="body__intro-header-subtitle">
                  <span className="body__discount">Giảm 15%</span> giá sản phẩm
                </span>
              </h1>
              <img
                className="body__intro-header-ellipse"
                src="../Home_Image/Ellipse 6.png"
                alt=""
              />
            </div>
            <div className="body__intro-caption">
              Chúng tôi tự tin cung cấp cho quý khách những sản phẩm đá quý tốt
              nhất, dịch vụ của chúng tôi đã có mặt hơn 12 tỉnh thành Việt Nam.
              Sang trọng, quý phái là những gì chúng tôi mang lại cho khách
              hàng.
            </div>
            <button type="button" className="body__intro-more">
              XEM THÊM
            </button>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="body__intro">
            <div className="body__intro-header">
              <h1 className="body__intro-header-title">
                Bộ sưu tập mới
                <span className="body__intro-header-subtitle">
                  <span className="body__discount">Giảm 15%</span> giá sản phẩm
                </span>
              </h1>
              <img
                className="body__intro-header-ellipse"
                src="../Home_Image/Ellipse 6.png"
                alt=""
              />
            </div>
            <div className="body__intro-caption">
              Chúng tôi tự tin cung cấp cho quý khách những sản phẩm đá quý tốt
              nhất, dịch vụ của chúng tôi đã có mặt hơn 12 tỉnh thành Việt Nam.
              Sang trọng, quý phái là những gì chúng tôi mang lại cho khách
              hàng.
            </div>
            <button type="button" className="body__intro-more">
              XEM THÊM
            </button>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="body__intro">
            <div className="body__intro-header">
              <h1 className="body__intro-header-title">
                Bộ sưu tập mới
                <span className="body__intro-header-subtitle">
                  <span className="body__discount">Giảm 15%</span> giá sản phẩm
                </span>
              </h1>
              <img
                className="body__intro-header-ellipse"
                src="../Home_Image/Ellipse 6.png"
                alt=""
              />
            </div>
            <div className="body__intro-caption">
              Chúng tôi tự tin cung cấp cho quý khách những sản phẩm đá quý tốt
              nhất, dịch vụ của chúng tôi đã có mặt hơn 12 tỉnh thành Việt Nam.
              Sang trọng, quý phái là những gì chúng tôi mang lại cho khách
              hàng.
            </div>
            <button type="button" className="body__intro-more">
              XEM THÊM
            </button>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="body__intro">
            <div className="body__intro-header">
              <h1 className="body__intro-header-title">
                Bộ sưu tập mới
                <span className="body__intro-header-subtitle">
                  <span className="body__discount">Giảm 15%</span> giá sản phẩm
                </span>
              </h1>
              <img
                className="body__intro-header-ellipse"
                src="../Home_Image/Ellipse 6.png"
                alt=""
              />
            </div>
            <div className="body__intro-caption">
              Chúng tôi tự tin cung cấp cho quý khách những sản phẩm đá quý tốt
              nhất, dịch vụ của chúng tôi đã có mặt hơn 12 tỉnh thành Việt Nam.
              Sang trọng, quý phái là những gì chúng tôi mang lại cho khách
              hàng.
            </div>
            <button type="button" className="body__intro-more">
              XEM THÊM
            </button>
          </div>
        </div>
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
};
export default Slides;
