import "./Contact.scss";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { linkToProductDetail } from "../ProductCard/ProductCard.ts";

function setupHeader() {
  const menuItems = [
    { label: "Trang chủ", href: "/src/Components/Home/Home.html" },
    {
      label: "Sản phẩm",
      href: "/src/Components/Products/Products.html",
      active: false,
    },
    { label: "Giới thiệu", href: "/src/Components/About/About.html" },
    {
      label: "Liên hệ",
      href: "/src/Components/Contact/Contact.html",
      active: true,
    },
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

document.addEventListener("DOMContentLoaded", () => {
  setupHeader();
  setupLinkToCart();
});
