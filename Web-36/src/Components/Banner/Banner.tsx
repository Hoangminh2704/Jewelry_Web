// import React from "react";
import "./Banner.scss";
const Banner = () => {
  return (
    <div className="Banner">
      <div className="Necklet">
        <div className="Necklet-img"></div>
        <div className="Necklet-features">
          <div className="name">Vòng cổ</div>
          <div className="caption">Bộ sưu tập vòng cổ</div>
          <a className="link">
            <div>Xem Thêm</div>
            <Arrow></Arrow>
          </a>
        </div>
      </div>
      <div className="Ring">
        <div className="Ring-img"></div>
        <div className="Ring-features">
          <div className="name">Nhẫn</div>
          <div className="caption">Bộ sưu tập nhẫn</div>
          <a className="link">
            <div>Xem Thêm</div>
            <Arrow></Arrow>
          </a>
        </div>
      </div>
    </div>
  );
};
export default Banner;
const Arrow = () => {
  return (
    <svg
      className="arrow"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clip-path="url(#clip0_5807_2655)">
        <path
          d="M5 12H19"
          stroke="#003468"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15 16L19 12"
          stroke="#003468"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15 8L19 12"
          stroke="#003468"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_5807_2655">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
