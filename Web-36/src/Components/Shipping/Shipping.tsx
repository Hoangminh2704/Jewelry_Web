import React from "react";
import ellipse from "../Home_Image/Ellipse 6.png";

import "./Shipping.scss";
const Shipping = () => {
  return (
    <div className="Shipping">
      <div className="Shipping__title">
        <p className="Shipping__title-caption">
          Shopping online không ngại khoảng cách{" "}
          <span className="Shipping__title-subtitle">FREE SHIP</span>
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
    </div>
  );
};
export default Shipping;
