import './Testimonials.scss';
import avatarImage from "../../assets/Avatar.png";

import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
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

const Arrow = (className: string = "") => `
  <svg
    class="arrow ${className}"
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
`;

const Line = () => `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="373"
    height="1"
    viewBox="0 0 373 1"
    fill="none"
  >
    <rect x="0.247559" width="371.927" height="1" fill="#E2E7ED" />
  </svg>
`;

export const TestimonialsHTML = `
  <div class="testimonials-container">
    <div class="Test">
      <div class="Test__control">
        <div class="Header">Nhận xét</div>
        <div class="Body">Đánh giá của khách hàng</div>
        <div class="Arrow">
          <div class="Arrow-button swiper-button-prev-custom">
            ${Arrow("Arrow-back")}
          </div>
          <div class="Arrow-button swiper-button-next-custom">
            ${Arrow("Arrow-next")}
          </div>
        </div>
      </div>
      <div class="Test__info">
        <div class="Test__info-slides">
          <div class="swiper test-swiper">
            <div class="swiper-wrapper">
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

export function initializeTestimonials(containerId: string = 'testimonials-container') {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID "${containerId}" not found for Testimonials.`);
    return;
  }

  container.innerHTML = TestimonialsHTML;

  const swiperWrapper = container.querySelector(".test-swiper .swiper-wrapper");
  const prevButton = container.querySelector(".swiper-button-prev-custom") as HTMLElement;
  const nextButton = container.querySelector(".swiper-button-next-custom") as HTMLElement;

  if (!swiperWrapper || !prevButton || !nextButton) {
      console.error("Required Swiper elements not found in Testimonials HTML.");
      return;
  }

  testimonialsData.forEach((item) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.innerHTML = `
      <div class="Slides-content">
        <div class="Comment">${item.comment}</div>
        <div class="Infomation">
          ${Line()}
          <div class="Infomation__detail">
            <img
              class="Infomation__detail-avatar"
              src="${item.avatar}"
              alt=""
            />
            <div class="Infomation__detail-info">
              <div class="Name">${item.name}</div>
              <div class="Address">${item.address}</div>
            </div>
          </div>
        </div>
      </div>
    `;
    swiperWrapper.appendChild(slide);
  });

  new Swiper('.test-swiper', {
    modules: [Navigation],
    spaceBetween: -350,
    slidesPerView: 2.5,
    centeredSlides: false,
    loop: true,
    watchOverflow: false,
    navigation: {
      prevEl: prevButton,
      nextEl: nextButton,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: true,

      },
      768: {
        slidesPerView: 2.5,
        spaceBetween: -350,
        centeredSlides: false,
        navigation: {
          prevEl: prevButton,
          nextEl: nextButton,
        },
      },
      1280: {
        slidesPerView: 2.5,
        spaceBetween: -350,
        centeredSlides: false,
        navigation: {
          prevEl: prevButton,
          nextEl: nextButton,
        },
      },
    },
  });
}