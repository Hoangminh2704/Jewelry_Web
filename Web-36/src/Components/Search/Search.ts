import "./Search.scss";

// export class Search {
//   constructor() {
//     const ele = document.querySelector(".jr-search");

//     if (ele) {
//       ele.innerHTML = `
//                 <button class="jr-search-button">
//                     <img src="./assets/icons/search-line.png" alt="Search Icon" class="jr-search-icon" />
//                 </button>
//                 <input type="text" placeholder="Tìm kiếm" class="jr-search-input" />
//                 <div class="jr-cart-icon-wrapper">
//                     <img src="./assets/icons/cart-line.png" alt="Cart Icon" class="jr-cart-icon" />
//                 </div>
//             `;
//     }
//     document.addEventListener("DOMContentLoaded", () => {
//       new Search();
//     });
//   }
// }

const element = document.querySelector(".jr-search");
console.log("abc");
if (element) {
  element.innerHTML = `
                <button class="jr-search-button">
                    <img src="./assets/icons/search-line.png" alt="Search Icon" class="jr-search-icon" />
                </button>
                <input type="text" placeholder="Tìm kiếm" class="jr-search-input" />
                <div class="jr-cart-icon-wrapper">
                    <img src="./assets/icons/cart-line.png" alt="Cart Icon" class="jr-cart-icon" />
                </div>
            `;
}
