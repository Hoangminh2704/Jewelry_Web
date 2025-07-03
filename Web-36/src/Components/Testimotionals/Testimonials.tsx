import React from "react";
import "./Testimonials.scss";
const Testimonials = () => {
  return (
    <div className="Test">
      <div className="Test__control">
        <div className="Header">Nhận xét</div>
        <div className="Body">
          Đánh giá <br /> của khách hàng
        </div>
        <div className="Arrow">
          <Arrow className="Arrow-back"></Arrow>
          <Arrow className="Arrow-next"></Arrow>
        </div>
      </div>
      <div className="Test__info">
        <div className="Test__info-slides">
          <div className="Slides-1">
            <div className="Comment">
              “Sản phẩm chất lượng, nhân viên vui vẻ hoà đồng, rất hài lòng với
              cách tư vấn của nhân viên. Sẽ quay lại mua hàng”.
            </div>
            <div className="Infomation">
              <Line></Line>
              <div className="Infomation__detail">
                <img
                  className="Infomation__detail-avatar"
                  src="../../assets/Avatar.png"
                  alt=""
                />
                <div className="Infomation__detail-info">
                  <div className="Name">Trần Thị Tuyết Mai</div>
                  <div className="Address">Khách hàng, TP HCM</div>
                </div>
              </div>
            </div>
          </div>
          <div className="Slides-2">
            <div className="Comment">
              “Sản phẩm chất lượng, nhân viên vui vẻ hoà đồng, rất hài lòng với
              cách tư vấn của nhân viên. Sẽ quay lại mua hàng”.
            </div>
            <div className="Infomation">
              <Line></Line>
              <div className="Infomation__detail">
                <img
                  className="Infomation__detail-avatar"
                  src="../../assets/Avatar.png"
                  alt=""
                />
                <div className="Infomation__detail-info">
                  <div className="Name">Trần Thị Tuyết Mai</div>
                  <div className="Address">Khách hàng, TP HCM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Testimonials;
type ArrowProps = {
  className?: string;
};

const Arrow: React.FC<ArrowProps> = ({ className = "" }) => {
  return (
    <svg
      className={`arrow ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clipPath="url(#clip0_5807_2655)">
        <path
          d="M5 12H19"
          stroke="#003468"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 16L19 12"
          stroke="#003468"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 8L19 12"
          stroke="#003468"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
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
const Line = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="373"
      height="1"
      viewBox="0 0 373 1"
      fill="none"
    >
      <rect x="0.247559" width="371.927" height="1" fill="#E2E7ED" />
    </svg>
  );
};
