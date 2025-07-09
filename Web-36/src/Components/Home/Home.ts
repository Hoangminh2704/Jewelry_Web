import "./Home.scss";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { products } from "../../Data/ProductData.ts";
import { testimonialsData } from "../../Data/TestimonialsData.ts";
import {
  createProductCardHtml,
  linkToProductDetail,
} from "../ProductCard/ProductCard.ts";

function setupHeader() {
  const menuItems = [
    {
      label: "Trang chủ",
      href: "/src/Components/Home/Home.html",
      active: true,
    },
    { label: "Sản phẩm", href: "/src/Components/Products/Products.html" },
    { label: "Giới thiệu", href: "/src/Components/About/About.html" },
    { label: "Liên hệ", href: "/src/Components/Contact/Contact.html" },
  ];

  const menuList = document.querySelector(".header--menu");
  const hamburgerButtons = document.querySelectorAll(
    ".header-hamberger-mobile"
  ) as NodeListOf<HTMLElement>;
  const menu = document.querySelector(
    ".header--sub-menu.open"
  ) as HTMLElement | null;

  if (menuList) {
    menuItems.forEach((item) => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.label;
      link.className = `header--menu-link${item.active ? " active" : ""}`;
      link.addEventListener("click", () => {
        menu?.classList.remove("oppenned");
        hamburgerButtons.forEach((btn) => btn.classList.remove("is-active"));
      });
      listItem.appendChild(link);
      menuList.appendChild(listItem);
    });
  }

  const handleToggle = (event: Event) => {
    event.preventDefault();
    const button = event.currentTarget as HTMLElement;
    button.classList.toggle("is-active");
    menu?.classList.toggle("oppenned");
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const isClickInsideMenu = menu?.contains(target);
    const isClickOnHamburger = Array.from(hamburgerButtons).some((button) =>
      button.contains(target)
    );
    if (!isClickInsideMenu && !isClickOnHamburger) {
      menu?.classList.remove("oppenned");
      hamburgerButtons.forEach((btn) => btn.classList.remove("is-active"));
    }
  };

  hamburgerButtons.forEach((btn) =>
    btn.addEventListener("click", handleToggle)
  );
  document.addEventListener("click", handleClickOutside);
}

function setupMainSlider() {
  new Swiper(".slides-swiper", {
    modules: [Pagination],
    spaceBetween: 30,
    pagination: {
      el: ".slides-pagination",
      clickable: true,
    },
  });
}

function setupFeaturedProducts() {
  const topProductContainer = document.getElementById("top-product-container");
  const otherProductsContainer = document.getElementById(
    "other-products-container"
  );

  if (topProductContainer && otherProductsContainer) {
    const topProduct = products.find((p) => p.isTop === true) || products[0];
    const topProductPriceContainer =
      topProductContainer.querySelector(".Production-price");
    if (topProductPriceContainer) {
      topProductPriceContainer.innerHTML = `
        <div class="Name">${topProduct.name}</div>
        <div class="Price">${topProduct.price}</div>
        <div class="Discount">
          <span class="Discount-old">${topProduct.oldPrice} </span>
          <span class="Discount-percent">${topProduct.discount}</span>
        </div>
      `;
    }

    const saleProducts = products.filter((p) => p.isSale === true).slice(0, 2);
    const newProducts = products.filter((p) => p.isNew === true).slice(0, 2);
    const featuredProducts = [...saleProducts, ...newProducts];
    otherProductsContainer.innerHTML = featuredProducts
      .map((product) => createProductCardHtml(product))
      .join("");
  }
}

function setupTestimonials() {
  const swiperWrapper = document.querySelector(".test-swiper .swiper-wrapper");
  const prevButton = document.querySelector(
    ".swiper-button-prev-custom"
  ) as HTMLElement;
  const nextButton = document.querySelector(
    ".swiper-button-next-custom"
  ) as HTMLElement;

  if (swiperWrapper && prevButton && nextButton) {
    testimonialsData.forEach((item) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.innerHTML = `
        <div class="Slides-content">
          <div class="Comment">${item.comment}</div>
          <div class="Infomation">
            <svg xmlns="http://www.w3.org/2000/svg" width="373" height="1" viewBox="0 0 373 1" fill="none">
              <rect x="0.247559" width="371.927" height="1" fill="#E2E7ED" />
            </svg>
            <div class="Infomation__detail">
              <img class="Infomation__detail-avatar" src="${item.avatar}" alt="avatar" />
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

    new Swiper(".test-swiper", {
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
        0: { slidesPerView: 1, spaceBetween: 0, centeredSlides: true },
        768: { slidesPerView: 2.5, spaceBetween: -350, centeredSlides: false },
        1280: { slidesPerView: 2.5, spaceBetween: -350, centeredSlides: false },
      },
    });
  }
}

function setupEventListeners() {
  const linkToCartPage = document.querySelector(
    ".header--search-cart"
  ) as HTMLElement;
  if (linkToCartPage) {
    linkToCartPage.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "/src/Components/Card/Card.html";
    });
  }
  linkToProductDetail();
}

document.addEventListener("DOMContentLoaded", () => {
  setupHeader();
  setupMainSlider();
  setupFeaturedProducts();
  setupTestimonials();
  setupEventListeners();
});
