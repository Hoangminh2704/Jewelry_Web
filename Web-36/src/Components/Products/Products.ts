import "./Products.scss";
import {
  createProductCardHtml,
  linkToProductDetail,
} from "../ProductCard/ProductCard";
import { products } from "../../Data/ProductData";
// import Swiper from "swiper";
// import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";

function setupHeader() {
  const menuItems = [
    { label: "Trang chủ", href: "/src/Components/Home/Home.html" },
    {
      label: "Sản phẩm",
      href: "/src/Components/Products/Products.html",
      active: true,
    },
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
  // console.log("header");
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
function getProductsPerPage(): number {
  if (window.innerWidth >= 1280) {
    return 9;
  }
  return 6;
}
function totalPages(): number {
  return Math.ceil(products.length / getProductsPerPage());
}
const startPage = 1;
function renderProducts(page: number) {
  const productContainer = document.querySelector(
    ".products-grid"
  ) as HTMLElement;
  if (!productContainer) return;
  const countProducts = getProductsPerPage();
  const startIndex = (page - 1) * countProducts;
  const endIndex = startIndex + countProducts;
  const pageProducts = products.slice(startIndex, endIndex);
  setTimeout(() => {
    productContainer.innerHTML = pageProducts
      .map((product) => {
        return createProductCardHtml(product);
        // console.log(product);
      })
      .join("");
  }, 1000);
  productContainer.innerHTML = pageProducts
    .map((product) => {
      return createProductCardHtml(product);
      // console.log(product);
    })
    .join("");
  linkToProductDetail();
  // console.log(productContainer);
  // console.log("hahaha");
}
function setupPagination() {
  const paginationContainer = document.querySelector(
    ".products-pagination-current"
  ) as HTMLElement;
  if (!paginationContainer) return;
  const total = totalPages();
  for (let i = 1; i <= total; i++) {
    paginationContainer.innerHTML += `
  <div class="products-pagination-link" data-page-products="${i}">${i}</div>`;
  }
  const paginationLinks = document.querySelectorAll(
    ".products-pagination-link"
  ) as NodeListOf<HTMLElement>;
  paginationLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      console.log(event);
      const target = event.currentTarget as HTMLElement;
      console.log(target);
      console.log(typeof target.dataset.pageProducts);
      const page = parseInt(target.dataset.pageProducts || "1", 10);
      renderProducts(page);
      paginationLinks.forEach((l) => l.classList.remove("active"));
      target.classList.add("active");
    });
  });
  if (paginationLinks.length > 0) {
    paginationLinks[0].classList.add("active");
  }
}
function setupPaginationArrow() {
  const prevButton = document.querySelector(
    ".products-pagination-prev"
  ) as HTMLElement;
  const nextButton = document.querySelector(
    ".products-pagination-next"
  ) as HTMLElement;
  const paginationLinks = document.querySelectorAll(
    ".products-pagination-link"
  ) as NodeListOf<HTMLElement>;
  prevButton.addEventListener("click", (event) => {
    console.log(event);
    const activeLink = document.querySelector(
      ".products-pagination-link.active"
    ) as HTMLElement;
    if (activeLink) {
      const currentPage = parseInt(activeLink.dataset.pageProducts || "1", 10);
      if (currentPage > 1) {
        const newPage = currentPage - 1;
        renderProducts(newPage);
        paginationLinks.forEach((link) => link.classList.remove("active"));
        activeLink.classList.remove("active");
        paginationLinks[newPage - 1].classList.add("active");
      }
    }
  });
  nextButton.addEventListener("click", (event) => {
    console.log(event);

    const activeLink = document.querySelector(
      ".products-pagination-link.active"
    ) as HTMLElement;
    if (activeLink) {
      const currentPage = parseInt(activeLink.dataset.pageProducts || "1", 10);
      if (currentPage < 10) {
        const newPage = currentPage + 1;
        renderProducts(newPage);
        paginationLinks.forEach((link) => link.classList.remove("active"));
        activeLink.classList.remove("active");
        paginationLinks[newPage - 1].classList.add("active");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupHeader();
  setupPagination();
  setupEventListeners();
  renderProducts(startPage);
  setupPaginationArrow();
});
