const hamburgerButtons = document.querySelectorAll(
  ".header-hamberger-mobile"
) as NodeListOf<HTMLElement>;
const menu = document.querySelector(".open") as HTMLElement | null;

const handleToggle = (event: MouseEvent) => {
  event.preventDefault();
  const button = event.currentTarget as HTMLElement;

  button.classList.toggle("is-active");
  if (menu) {
    menu.classList.toggle("oppenned");
  }
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

hamburgerButtons.forEach((button) => {
  button.addEventListener("click", handleToggle);
});

document.addEventListener("click", handleClickOutside);

const menuLinks = document.querySelectorAll(".header--sub-menu li a");

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (menu) {
      menu.classList.remove("oppenned");
    }
    hamburgerButtons.forEach((btn) => btn.classList.remove("is-active"));
  });
});

import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

document.addEventListener("DOMContentLoaded", () => {
  const swiperElement = document.querySelector(".mySwiper");
  if (swiperElement) {
    new Swiper(".mySwiper", {
      modules: [Pagination],
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }
});
