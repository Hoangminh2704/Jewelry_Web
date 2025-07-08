import "./Card.scss";
// import { createProductCardHtml } from "../ProductCard/ProductCard";
import { products } from "../../Data/ProductData";
// import Swiper from "swiper";
// import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { createProductCardHtml } from "../ProductCard/ProductCard";
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

  //   const productSwiperWrapper = document.querySelector(
  //     ".product-swiper .swiper-wrapper"
  //   );

  //   if (productSwiperWrapper) {
  //     function productsPerPage(): number {
  //       if (window.matchMedia("(min-width: 1280px)").matches) {
  //         return 9;
  //       } else {
  //         return 6;
  //       }
  //     }
  //     const totalPages = Math.ceil(products.length / productsPerPage());

  //     for (let i = 0; i < totalPages; i++) {
  //       const slide = document.createElement("div");
  //       slide.className = "swiper-slide";

  //       const productsOnPage = products.slice(
  //         i * productsPerPage(),
  //         (i + 1) * productsPerPage()
  //       );

  //       const pageHtml = productsOnPage
  //         .map((product) => createProductCardHtml(product))
  //         .join("");

  //       slide.innerHTML = `<div class="Select__product-list">${pageHtml}</div>`;
  //       const badges = slide.querySelectorAll(".product-badge");
  //       badges.forEach((badge) => badge.remove());
  //       productSwiperWrapper.appendChild(slide);
  //     }
  //     const prevButton = document.querySelector(
  //       ".product-swiper-prev"
  //     ) as HTMLElement;
  //     const nextButton = document.querySelector(
  //       ".product-swiper-next"
  //     ) as HTMLElement;

  //     new Swiper(".product-swiper", {
  //       modules: [Navigation, Pagination],
  //       spaceBetween: 24,

  //       pagination: {
  //         el: ".product-swiper-pagination",
  //         clickable: true,
  //         renderBullet: function (index, className) {
  //           return '<span class="' + className + '">' + (index + 1) + "</span>";
  //         },
  //       },

  //       navigation: {
  //         nextEl: nextButton,
  //         prevEl: prevButton,
  //       },
  //     });
  //   }

  const addProductNewCard = document.querySelector(".NewProduct__content");
  //   console.log(addProductNewCard);

  if (addProductNewCard) {
    const newProductCard = products.filter((p) => p.isNew === true).slice(0, 4);
    const createNewElement = newProductCard
      .map((product) => createProductCardHtml(product))
      .join("");
    // console.log(newProductCard);
    // console.log(createNewElement);
    addProductNewCard.innerHTML = createNewElement;
  }
});
