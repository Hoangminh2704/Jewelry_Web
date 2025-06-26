// import "./Home.scss";

// document.addEventListener(
//   "dblclick",
//   function (event) {
//     event.preventDefault();
//   },
//   { passive: false }
// );

// const hamburgerButtons = document.querySelectorAll(".header-hamberger-mobile");
// const menu = document.querySelector(".open");

// const handleToggle = (event) => {
//   event.preventDefault();
//   const button = event.currentTarget;

//   button.classList.toggle("is-active");
//   if (menu) {
//     menu.classList.toggle("oppenned");
//   }
// };

// hamburgerButtons.forEach((button) => {
//   button.addEventListener("click", handleToggle);
// });

// const menuLinks = document.querySelectorAll(".header--sub-menu li a");

// menuLinks.forEach((link) => {
//   link.addEventListener("click", () => {
//     if (menu) {
//       menu.classList.remove("oppenned");
//     }
//     hamburgerButtons.forEach((btn) => btn.classList.remove("is-active"));
//   });
// });
