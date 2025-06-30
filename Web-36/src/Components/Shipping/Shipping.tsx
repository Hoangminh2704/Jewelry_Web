import React from "react";
import ellipse from "../Home_Image/Ellipse 6.png";
import "./Shipping.scss";

import "./Shipping.scss";
const Shipping = () => {
  return (
    <div className="Shipping">
      <div className="Shipping__title">
        <p className="Shipping__title-caption">
          <span className="shipping__title-top">
            Shopping online không ngại
          </span>{" "}
          <span className="shipping__title-bottom">
            khoảng cách{" "}
            <span className="Shipping__title-subtitle">FREE SHIP</span>
          </span>
        </p>
        <img className="Shipping__title-icon" src={ellipse} alt="" />
      </div>
      <div className="Shipping__description">
        Chúng tôi tự tin cung cấp cho quý khách những sản phẩm đá quý tốt nhất,
        dịch vụ của chúng tôi đã có mặt hơn 12 tỉnh thành Việt Nam. Sang trọng,
        quý phái là những gì chúng tôi mang lại cho khách hàng.
      </div>
      <div className="Shipping__button">
        <button type="button" className="Shipping__button-buying active">
          MUA NGAY
        </button>
        <button type="button" className="Shipping__button-more">
          XEM THÊM
        </button>
      </div>
      <div className="star-top">
        <Star_linear></Star_linear>
      </div>
      <div className="star-right">
        <Star_normal></Star_normal>
      </div>
      <div className="star-bottom">
        <Star_linear></Star_linear>
      </div>
      <div className="star-left">
        <Star_normal></Star_normal>
      </div>
    </div>
  );
};
export default Shipping;
const Star_linear = () => {
  return (
    <svg
      className="star-linear"
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
    >
      <path
        d="M25.6157 49.9043L28.9793 59.0241C29.1057 59.3674 29.4326 59.5951 29.7981 59.5951C30.1635 59.5951 30.4904 59.3674 30.6169 59.0241L33.9804 49.9043C36.703 42.5214 42.5229 36.7015 49.9054 33.9794L59.0251 30.6158C59.3679 30.4894 59.5956 30.1625 59.5956 29.797C59.5956 29.4316 59.3679 29.1047 59.0251 28.9783L49.9049 25.6147C42.5224 22.8921 36.7025 17.0727 33.9804 9.69026L30.6169 0.570529C30.4904 0.227698 30.1635 0 29.7981 0C29.4326 0 29.1057 0.227698 28.9793 0.570529L25.6157 9.69026C22.8931 17.0727 17.0737 22.8921 9.69077 25.6147L0.570529 28.9783C0.227698 29.1047 0 29.4316 0 29.797C0 30.1625 0.227698 30.4894 0.570529 30.6158L9.69026 33.9794C17.0732 36.7015 22.8931 42.5209 25.6157 49.9043Z"
        fill="url(#paint0_linear_4303_5257)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4303_5257"
          x1="50.371"
          y1="5.65389"
          x2="10.5368"
          y2="59.6229"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
const Star_normal = () => {
  return (
    <svg
      className="star-normal"
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
    >
      <path
        d="M34.5508 16.9622L29.2119 14.9934C24.8905 13.3998 21.4842 9.99351 19.8912 5.67204L17.9218 0.334471C17.8482 0.133281 17.6565 0 17.4426 0C17.2287 0 17.0371 0.133281 16.9635 0.333836L14.9947 5.67077C13.4011 9.99224 9.99414 13.3991 5.67268 14.9928L0.333837 16.9615C0.133281 17.0352 0 17.2268 0 17.4407C0 17.6546 0.133281 17.8463 0.333837 17.9199L5.67205 19.8893C9.99415 21.4829 13.4011 24.8898 14.9947 29.2119L16.9635 34.5495C17.0371 34.7501 17.2287 34.8833 17.4426 34.8833C17.6565 34.8833 17.8482 34.7501 17.9218 34.5495L19.8912 29.2113C21.4848 24.8892 24.8911 21.4829 29.2132 19.8899L34.5514 17.9205C34.752 17.8469 34.8852 17.6552 34.8852 17.4414C34.8852 17.2275 34.752 17.0358 34.5508 16.9622Z"
        fill="#919EAB"
      />
    </svg>
  );
};
