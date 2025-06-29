import React from "react";
import "./Collection.scss";
const Collection = () => {
  return (
    <div className="Collection">
      <div className="Collection__category">
        <div className="Collection__category-title">
          Bộ sưu tập của chúng tôi
        </div>
        <div className="Collection__category-links">
          <div className="Collection__category-links-title">
            <svg
              className="Collection__category-links-title-img"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="2"
              viewBox="0 0 16 2"
              fill="none"
            >
              <rect width="16" height="2" fill="#003468" />
            </svg>
            <div className="Collection__category-links-title-detail">
              Nhẫn cưới
            </div>
            <svg
              className="Collection__category-links-title-img"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="2"
              viewBox="0 0 16 2"
              fill="none"
            >
              <rect width="16" height="2" fill="#003468" />
            </svg>
          </div>

          <div className="Collection__category-links-elements">
            Trang sức bạc
          </div>
          <div className="Collection__category-links-elements">
            Trang sức vàng
          </div>
          <div className="Collection__category-links-elements">
            Dây chuyền bạc
          </div>
          <div className="Collection__category-links-elements">
            Dây chuyền vàng
          </div>
          <div className="Collection__category-links-elements">
            Bông tai bạc
          </div>
        </div>
      </div>
      <div className="Collection__explore">
        <div className="Collection__explore-img">
          <div className="first-img"></div>
          <div className="second-img"></div>
        </div>
        <div className="Collection__explore-newest">
          <div className="Collection__explore-newest-content">
            KHÁM PHÁ BỘ SƯU TẬP MỚI NHẤT
          </div>
          <svg
            className="Collection__explore-newest-arrow"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_5745_2019)">
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
              <clipPath id="clip0_5745_2019">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};
export default Collection;
