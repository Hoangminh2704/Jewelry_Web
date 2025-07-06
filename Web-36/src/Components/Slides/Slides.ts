import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './slides.scss';
import ellipse from '../../assets/Ellipse 6.png'; 
export function initializeSlides(containerId: string = 'slides-container') {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }

  container.innerHTML = `
    <div class="slides-container">
      <div class="slides-swiper swiper">
        <div class="swiper-wrapper">
          </div>
        <div class="slides-pagination swiper-pagination"></div>
      </div>
    </div>
  `;

  const slideContentHtml = `
    <div class="body__intro">
      <div class="body__intro-header">
        <h1 class="body__intro-header-title">
          Bộ sưu tập mới
          <span class="body__intro-header-subtitle">
            <span class="body__discount">Giảm 15%</span> giá sản phẩm
          </span>
        </h1>
        <img class="body__intro-header-ellipse" src="${ellipse}" alt="ellipse" />
      </div>
      <div class="body__intro-caption">
        Chúng tôi tự tin cung cấp cho quý khách những sản phẩm đá quý tốt nhất,
        dịch vụ của chúng tôi đã có mặt hơn 12 tỉnh thành Việt Nam. Sang trọng,
        quý phái là những gì chúng tôi mang lại cho khách hàng.
      </div>
      <button type="button" class="body__intro-more">
        XEM THÊM
      </button>
    </div>
  `;

  const swiperWrapper = container.querySelector('.swiper-wrapper');
  if (swiperWrapper) {
    const numberOfSlides = 5;
    for (let i = 0; i < numberOfSlides; i++) {
      const slideDiv = document.createElement('div');
      slideDiv.classList.add('swiper-slide', 'slides-slide');
      slideDiv.innerHTML = slideContentHtml;
      swiperWrapper.appendChild(slideDiv);
    }
  }

  new Swiper('.slides-swiper', {
    modules: [Pagination],
    spaceBetween: 30,
    pagination: {
      el: '.slides-pagination',
      clickable: true,
    },
  });

  
}