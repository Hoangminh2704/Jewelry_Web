// import "./Home.scss";

// // Initialize Swiper
// const swiper = new swiper(".mySwiper", {
//   spaceBetween: 30,
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
// });

// // Select hamburger buttons and menu
// const hamburgerButtons = document.querySelectorAll(".header-hamberger-mobile");
// const menu = document.querySelector(".open");

// // Toggle menu open/close
// const handleToggle = (event: Event) => {
//   event.preventDefault();
//   const button = event.currentTarget as HTMLElement;

//   button.classList.toggle("is-active");
//   if (menu) {
//     menu.classList.toggle("oppenned");
//   }
// };

// // Close menu when clicking outside
// const handleClickOutside = (event: Event) => {
//   const target = event.target as HTMLElement;
//   const isClickInsideMenu = menu?.contains(target);
//   const isClickOnHamburger = Array.from(hamburgerButtons).some((button) =>
//     button.contains(target)
//   );

//   if (!isClickInsideMenu && !isClickOnHamburger) {
//     menu?.classList.remove("oppenned");
//     hamburgerButtons.forEach((btn) => btn.classList.remove("is-active"));
//   }
// };

// // Add event listeners to hamburger buttons
// hamburgerButtons.forEach((button) => {
//   button.addEventListener("click", handleToggle);
// });

// // Add event listener to close menu when clicking outside
// document.addEventListener("click", handleClickOutside);

// // Close menu when clicking on menu links
// const menuLinks = document.querySelectorAll(".header--sub-menu li a");

// menuLinks.forEach((link) => {
//   link.addEventListener("click", () => {
//     if (menu) {
//       menu.classList.remove("oppenned");
//     }
//     hamburgerButtons.forEach((btn) => btn.classList.remove("is-active"));
//   });
// });
