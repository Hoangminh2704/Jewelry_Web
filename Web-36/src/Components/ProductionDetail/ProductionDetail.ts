import "./ProductionDetail.scss";
import type { ProductItem } from "../../Data/ProductDataType.ts";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  createProductCardHtml,
  linkToProductDetail,
} from "../ProductCard/ProductCard.ts";
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
export function setupHeader() {
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
    menuList.innerHTML = "";
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

export function setupNewProductsSection() {
  const addProductNewCard = document.querySelector(".NewProduct__content");
  if (addProductNewCard) {
    const newProductCard = products.filter((p) => p.isNew === true).slice(0, 4);
    const createNewElement = newProductCard
      .map((product) => createProductCardHtml(product))
      .join("");
    addProductNewCard.innerHTML = createNewElement;
  }
}

export function setupLinkToCart() {
  const linkToCartPage = document.querySelector(
    ".header--search-cart"
  ) as HTMLElement;
  if (linkToCartPage) {
    linkToCartPage.addEventListener("click", (event) => {
      event.preventDefault();
      const cartPageUrl = "/src/Components/Card/Card.html";
      window.location.href = cartPageUrl;
    });
  }
  linkToProductDetail();
}

document.addEventListener("DOMContentLoaded", async () => {
  products = await loadProducts();
  setupHeader();
  setupNewProductsSection();
  setupLinkToCart();
});
