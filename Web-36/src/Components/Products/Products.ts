import "./Products.scss";
import { createProductCardHtml } from "../ProductCard/ProductCard";
import { products } from "../../Data/ProductData";
document.addEventListener("DOMContentLoaded", () => {
  const menuItems = [
    {
      label: "Trang chủ",
      href: "/src/Components/Home/Home.html",
    },
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

  function getCardCount(): number {
    if (window.matchMedia("(min-width: 1280px)").matches) {
      return 9;
    } else if (
      window.matchMedia("(min-width: 768px) and (max-width: 1279px)").matches
    ) {
      return 6;
    } else {
      return 6;
    }
  }

  function renderProductList(count: number): string {
    return products
      .slice(0, count)
      .map((product) => createProductCardHtml(product))
      .join("");
  }

  const productListElement = document.querySelector(".Select__product-list");
  if (productListElement) {
    let currentCardCount = getCardCount();

    productListElement.innerHTML = renderProductList(currentCardCount);

    window.addEventListener("resize", () => {
      const newCardCount = getCardCount();
      if (newCardCount !== currentCardCount) {
        currentCardCount = newCardCount;
        productListElement.innerHTML = renderProductList(currentCardCount);
      }
    });
  }
  // change margin-bottom of banner style
  const bannerMargin = document.querySelector(".Banner");
  bannerMargin?.setAttribute("style", "margin-bottom: 80px;");
  bannerMargin?.setAttribute("style", "margin-top: 80px;");
});
