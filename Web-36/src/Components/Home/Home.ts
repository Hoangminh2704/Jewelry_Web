import "./Home.scss";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { initCart } from "../Card/Card";
import { addToCart, SELECT_STORAGE_KEY } from "../ProductCard/ProductCard";
import type { ProductItem } from "../../Data/ProductDataType.ts";

let products: ProductItem[] = [];
async function loadProducts(): Promise<ProductItem[]> {
  try {
    const response = await fetch("../../Data/ProductData.json");
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const productsData = await response.json();
    return productsData;
  } catch (error) {
    console.error(error);
    return [];
  }
}
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
    {
      label: "Sản phẩm",
      href: "/src/Components/Products/Products.html",
    },
    { label: "Giới thiệu", href: "/src/Components/About/About.html" },
    { label: "Liên hệ", href: "/src/Components/Contact/Contact.html" },
  ];

  const menuList = document.querySelector(".header--menu");
  const hamburgerButtons = document.querySelectorAll(
    ".header-hamberger-mobile"
  ) as NodeListOf<HTMLElement>;

  const menu = document.querySelector(
    ".header--sub-menu"
  ) as HTMLElement | null;

  if (menuList) {
    menuList.innerHTML = "";
    menuItems.forEach((item) => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.label;
      link.className = `header--menu-link${item.active ? " active" : ""}`;

      link.addEventListener("click", () => {
        menu?.classList.remove("opened");
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
    menu?.classList.toggle("opened");
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const isClickInsideMenu = menu?.contains(target);
    const isClickOnHamburger = Array.from(hamburgerButtons).some((button) =>
      button.contains(target)
    );

    if (!isClickInsideMenu && !isClickOnHamburger) {
      menu?.classList.remove("opened");
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

async function setupFeaturedProducts() {
  products = await loadProducts();
  const topProductContainer = document.getElementById("top-product-container");
  const otherProductsContainer = document.getElementById(
    "other-products-container"
  );

  if (topProductContainer && otherProductsContainer) {
    const topProduct = products.find((p) => p.isTop === true) || products[0];
    const topProductPriceContainer =
      topProductContainer.querySelector(".Production-price");
    const topProductImage =
      topProductContainer.querySelector(".Production-image");
    const buttonTop1 = document.querySelector(
      ".Production__top1-button"
    ) as HTMLElement;
    if (buttonTop1) {
      buttonTop1.setAttribute("data-product-id", topProduct.id.toString());
      buttonTop1.addEventListener("click", (event) => {
        event.preventDefault();
        localStorage.setItem(SELECT_STORAGE_KEY, JSON.stringify(topProduct));
        const productDetailPageUrl =
          "/src/Components/ProductionDetail/ProductionDetail.html?productId=" +
          topProduct.id;
        window.location.href = productDetailPageUrl;
      });
    }
    if (topProductPriceContainer && topProductImage) {
      topProductPriceContainer.innerHTML = `
        <div class="Name">${topProduct.name}</div>
        <div class="Price">${topProduct.price.toLocaleString("vi-VN")} đ</div>
        <div class="Discount">
          <span class="Discount-old">${topProduct.oldPrice.toLocaleString(
            "vi-VN"
          )} đ</span>
          <span class="Discount-percent">(${topProduct.discount}%)</span>
        </div>
      `;
      topProductImage.setAttribute("src", topProduct.image);
      topProductImage.setAttribute("alt", topProduct.name);
      topProductImage.setAttribute("title", topProduct.name);
    }

    const saleProducts = products.filter((p) => p.isSale === true).slice(0, 2);
    const newProducts = products.filter((p) => p.isNew === true).slice(0, 2);
    const featuredProducts = [...saleProducts, ...newProducts];
    otherProductsContainer.innerHTML = featuredProducts
      .map((product) => createProductCardHtml(product))
      .join("");
    linkToProductDetail();
    addToCart();
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
    new Swiper(".test-swiper", {
      modules: [Navigation, Pagination],
      spaceBetween: 20,
      slidesPerView: 2.5,
      centeredSlides: false,
      loop: true,
      watchOverflow: false,
      navigation: {
        prevEl: prevButton,
        nextEl: nextButton,
      },
      pagination: {
        el: ".test-swiper-pagination",
        clickable: true,
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

document.addEventListener("DOMContentLoaded", async () => {
  products = await loadProducts();
  console.log("Products loaded:", products.length);
  setupHeader();
  setupMainSlider();
  await setupFeaturedProducts();
  setupTestimonials();
  setupEventListeners();
  initCart();
});
