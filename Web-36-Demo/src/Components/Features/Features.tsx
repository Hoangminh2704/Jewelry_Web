import React from "react";
import "./Features.scss";
const Features = () => {
  return (
    <div className="features">
      <div className="features__item">
        <SearchIcon />

        <div className="features__icon"></div>
        <div className="features__text">
          <p className="features__text-title">
            <span className="features__text-title-redNote">01. </span>Đồ trang
            sức độc đáo &amp; ý nghĩa
          </p>
          <p className="features__text-description">
            Từ những kho báu thô công đến những món đồ cổ điển đến các biểu
            tượng di sản
          </p>
        </div>
      </div>

      <div className="features__item wrap2">
        <QualityIcon />
        <div className="features__icon"></div>
        <div className="features__text">
          <p className="features__text-title">
            <span className="features__text-title-redNote">02. </span>Chất lượng
            được kiểm tra chuyên nghiệp
          </p>
          <p className="features__text-description">
            Những kim loại quý, bền nhất và đá quý đạt tiêu chuẩn
          </p>
        </div>
      </div>

      <div className="features__item wrap3">
        <RepeatIcon />
        <div className="features__icon"></div>
        <div className="features__text">
          <p className="features__text-title">
            <span className="features__text-title-redNote">03. </span>Tuổi đời
            và sự tái tạo của sản phẩm
          </p>
          <p className="features__text-description">
            Được thiết kế bền vững để được làm mới, có thể tái chế hoặc bán lại
            liên tục
          </p>
        </div>
      </div>
    </div>
  );
};
export default Features;
const SearchIcon = () => {
  return (
    <svg
      className="features__img"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clipPath="url(#clip0_4303_5704)">
        <path
          d="M15 19C17.2091 19 19 17.2091 19 15C19 12.7909 17.2091 11 15 11C12.7909 11 11 12.7909 11 15C11 17.2091 12.7909 19 15 19Z"
          stroke="#C48C46"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.5 18.5L21 21"
          stroke="#C48C46"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 6H20"
          stroke="#C48C46"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 12H8"
          stroke="#C48C46"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 18H8"
          stroke="#C48C46"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_4303_5704">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
const QualityIcon = () => {
  return (
    <svg
      className="features__img"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clip-path="url(#clip0_4303_5715)">
        <path
          d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z"
          stroke="#C48C46"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.002 15.0033L15.402 20.8923L17 17.6603L20.5981 17.8923L17.1981 12.0033"
          stroke="#C48C46"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.80176 12.0033L3.40176 17.8923L6.99983 17.6603L8.59791 20.8923L11.9979 15.0033"
          stroke="#C48C46"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_4303_5715">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
const RepeatIcon = () => {
  return (
    <svg
      className="features__img"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clip-path="url(#clip0_4303_5724)">
        <path
          d="M4 9C4 8.20435 4.31607 7.44129 4.87868 6.87868C5.44129 6.31607 6.20435 6 7 6H20M20 6L17 3M20 6L17 9"
          stroke="#C48C46"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 15C20 15.7956 19.6839 16.5587 19.1213 17.1213C18.5587 17.6839 17.7956 18 17 18H4M4 18L7 21M4 18L7 15"
          stroke="#C48C46"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_4303_5724">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
