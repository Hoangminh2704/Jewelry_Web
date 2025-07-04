import React, { useRef } from "react";
import "./Testimonials.scss";
// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import avatarImage from "../../assets/Avatar.png";
interface NavigationOptions {
  prevEl?: HTMLElement | null;
  nextEl?: HTMLElement | null;
}

const testimonialsData = [
  {
    id: 1,
    comment:
      '"Sản phẩm chất lượng, nhân viên vui vẻ hoà đồng, rất hài lòng với cách tư vấn của nhân viên. Sẽ quay lại mua hàng".',
    name: "Trần Thị Tuyết Mai",
    address: "Khách hàng, TP HCM",
    avatar: avatarImage,
  },
  {
    id: 2,
    comment:
      '"Rất hài lòng với cách tư vấn của nhân viên. Sẽ quay lại mua hàng".',
    name: "Trần Thị Tuyết Minh",
    address: "Khách hàng, TP HCM",
    avatar: avatarImage,
  },
  {
    id: 3,
    comment:
      '"Sản phẩm chất lượng, nhân viên vui vẻ hoà đồng, rất hài lòng với cách tư vấn của nhân viên. Sẽ quay lại mua hàng".',
    name: "Trần Thị Tuyết Dung",
    address: "Khách hàng, TP HCM",
    avatar: avatarImage,
  },
  {
    id: 4,
    comment:
      '"Sản phẩm chất lượng, nhân viên vui vẻ hoà đồng, rất hài lòng với cách tư vấn của nhân viên. Sẽ quay lại mua hàng".',
    name: "Trần Thị Tuyết Linh",
    address: "Khách hàng, TP HCM",
    avatar: avatarImage,
  },
];

const Testimonials = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="testimonials-container">
      <div className="Test">
        <div className="Test__control">
          <div className="Header">Nhận xét</div>
          <div className="Body">
            Đánh giá <br /> của khách hàng
          </div>
          <div className="Arrow">
            <div ref={prevRef} className="Arrow-button">
              <Arrow className="Arrow-back" />
            </div>
            <div ref={nextRef} className="Arrow-button">
              <Arrow className="Arrow-next" />
            </div>
          </div>
        </div>
        <div className="Test__info">
          <div className="Test__info-slides">
            <Swiper
              modules={[Navigation]}
              spaceBetween={-350}
              slidesPerView={2.5}
              centeredSlides={false}
              loop={true}
              onInit={(swiper) => {
                const navigation = swiper.params
                  .navigation as NavigationOptions;
                if (navigation && typeof navigation === "object") {
                  navigation.prevEl = prevRef.current;
                  navigation.nextEl = nextRef.current;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }
              }}
              className="test-swiper"
            >
              {testimonialsData.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="Slides-content">
                    <div className="Comment">{item.comment}</div>
                    <div className="Infomation">
                      <Line />
                      <div className="Infomation__detail">
                        <img
                          className="Infomation__detail-avatar"
                          src={item.avatar}
                          alt=""
                        />
                        <div className="Infomation__detail-info">
                          <div className="Name">{item.name}</div>
                          <div className="Address">{item.address}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
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
