import "./Products.scss";
import {
  createProductCardHtml,
  linkToProductDetail,
} from "../ProductCard/ProductCard";
import { products } from "../../Data/ProductData";

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

// function totalPages(type: string): number {
//   if (type === "Necklet") {
//     return Math.ceil(
//       products.filter((product) => product.type === "Necklet").length /
//         getProductsPerPage()
//     );
//   }
//   if (type === "Earring") {
//     return Math.ceil(
//       products.filter((product) => product.type === "Earring").length /
//         getProductsPerPage()
//     );
//   }
//   if (type === "Chain") {
//     return Math.ceil(
//       products.filter((product) => product.type === "Chain").length /
//         getProductsPerPage()
//     );
//   }
//   return Math.ceil(products.length / getProductsPerPage());
// }
// const startPage = 1;

// function renderProducts(page: number) {
//   const productContainer = document.querySelector(
//     ".products-grid"
//   ) as HTMLElement;
//   // console.log(productContainer);
//   if (!productContainer) return;
//   const countProducts = getProductsPerPage();
//   const startIndex = (page - 1) * countProducts;
//   const endIndex = startIndex + countProducts;
//   const pageProducts = products.slice(startIndex, endIndex);
//   setTimeout(() => {
//     productContainer.innerHTML = pageProducts
//       .map((product) => {
//         return createProductCardHtml(product);
//       })
//       .join("");
//   }, 100);

//   linkToProductDetail();
//   // console.log(productContainer);
// }
// function updatePagination(filterType: string) {
//   const paginationContainer = document.querySelector(
//     ".products-pagination-current"
//   ) as HTMLElement;
//   let currentFilter = "";
//   let total = totalPages("");
//   currentFilter = filterType;
//   total = totalPages(filterType);
//   if (total < 1) {
//     total = 1;
//   }
//   paginationContainer.innerHTML = "";
//   for (let i = 1; i <= total; i++) {
//     paginationContainer.innerHTML += `
//         <div class="products-pagination-link" data-page-products="${i}">${i}</div>`;
//   }
//   const paginationLinks = document.querySelectorAll(
//     ".products-pagination-link"
//   ) as NodeListOf<HTMLElement>;

//   paginationLinks.forEach((link) => {
//     link.addEventListener("click", (event) => {
//       const target = event.currentTarget as HTMLElement;
//       const page = parseInt(target.dataset.pageProducts || "1", 10);
//       renderFilteredProducts(page, currentFilter);
//       paginationLinks.forEach((l) => l.classList.remove("active"));
//       target.classList.add("active");
//     });
//   });

//   if (paginationLinks.length > 0) {
//     paginationLinks[0].classList.add("active");
//   }

//   renderFilteredProducts(1, filterType);
// }
// function setupPagination() {
//   const paginationContainer = document.querySelector(
//     ".products-pagination-current"
//   ) as HTMLElement;
//   if (!paginationContainer) return;
//   const Necklet = document.querySelector(
//     ".Select__filter-Necklet"
//   ) as HTMLInputElement;
//   const Earring = document.querySelector(
//     ".Select__filter-Earring"
//   ) as HTMLInputElement;
//   const Chain = document.querySelector(
//     ".Select__filter-Chain"
//   ) as HTMLInputElement;

//   Necklet.addEventListener("click", () => {
//     console.log("Necklet clicked:", Necklet.checked);
//     if (Necklet.checked) {
//       Earring.checked = false;
//       Chain.checked = false;
//       updatePagination("Necklet");
//     } else {
//       updatePagination("");
//     }
//   });

//   Earring.addEventListener("click", () => {
//     console.log("Earring clicked:", Earring.checked);
//     if (Earring.checked) {
//       Necklet.checked = false;
//       Chain.checked = false;
//       updatePagination("Earring");
//     } else {
//       updatePagination("");
//     }
//   });
//   Chain.addEventListener("click", () => {
//     console.log("Chain clicked:", Chain.checked);
//     if (Chain.checked) {
//       Earring.checked = false;
//       Necklet.checked = false;

//       updatePagination("Chain");
//     } else {
//       updatePagination("");
//     }
//   });
//   updatePagination("");
// }

// function renderFilteredProducts(page: number, filterType: string) {
//   const productContainer = document.querySelector(
//     ".products-grid"
//   ) as HTMLElement;
//   if (!productContainer) return;

//   let filteredProducts = products;
//   if (filterType === "Necklet") {
//     filteredProducts = products.filter((product) => product.type === "Necklet");
//   } else if (filterType === "Earring") {
//     filteredProducts = products.filter((product) => product.type === "Earring");
//   } else if (filterType === "Chain") {
//     filteredProducts = products.filter((product) => product.type === "Chain");
//   }

//   const countProducts = getProductsPerPage();
//   const startIndex = (page - 1) * countProducts;
//   const endIndex = startIndex + countProducts;
//   const pageProducts = filteredProducts.slice(startIndex, endIndex);

//   setTimeout(() => {
//     productContainer.innerHTML = pageProducts
//       .map((product) => {
//         return createProductCardHtml(product);
//       })
//       .join("");
//   }, 100);

//   linkToProductDetail();
// }
// function setupPaginationArrow() {
//   const prevButton = document.querySelector(
//     ".products-pagination-prev"
//   ) as HTMLElement;
//   const nextButton = document.querySelector(
//     ".products-pagination-next"
//   ) as HTMLElement;
//   const paginationLinks = document.querySelectorAll(
//     ".products-pagination-link"
//   ) as NodeListOf<HTMLElement>;
//   prevButton.addEventListener("click", (event) => {
//     console.log(event);
//     const activeLink = document.querySelector(
//       ".products-pagination-link.active"
//     ) as HTMLElement;

//     if (activeLink) {
//       const currentPage = parseInt(activeLink.dataset.pageProducts || "1", 10);
//       if (currentPage > 1) {
//         const newPage = currentPage - 1;
//         renderProducts(newPage);
//         paginationLinks.forEach((link) => link.classList.remove("active"));
//         activeLink.classList.remove("active");
//         paginationLinks[newPage - 1].classList.add("active");
//       }
//     }
//   });
//   nextButton.addEventListener("click", (event) => {
//     console.log(event);

//     const activeLink = document.querySelector(
//       ".products-pagination-link.active"
//     ) as HTMLElement;
//     if (activeLink) {
//       const total = totalPages("");
//       const currentPage = parseInt(activeLink.dataset.pageProducts || "1", 10);
//       if (currentPage < total) {
//         const newPage = currentPage + 1;
//         renderProducts(newPage);
//         paginationLinks.forEach((link) => link.classList.remove("active"));
//         activeLink.classList.remove("active");
//         paginationLinks[newPage - 1].classList.add("active");
//       }
//     }
//   });
// }
// function getDataFromInputPrice() {
//   const PriceFrom = document.querySelector(
//     ".Select__filter-price-from"
//   ) as HTMLInputElement;
//   const PriceTo = document.querySelector(
//     ".Select__filter-price-to"
//   ) as HTMLInputElement;
//   const buttonActive = document.querySelector(".Select__filter-search");
//   if (!buttonActive) return;

//   buttonActive.addEventListener("click", () => {
//     console.log(PriceFrom.value);
//     console.log(PriceTo.value);
//     const priceFrom = parseFloat(PriceFrom.value);
//     const priceTo = parseFloat(PriceTo.value);
//     if (isNaN(priceFrom) || isNaN(priceTo)) {
//       console.error("Invalid price input");
//       return;
//     }
//     const filteredProducts = products.filter((p) => {
//       return p.price >= priceFrom && p.price <= priceTo;
//     });
//     console.log(filteredProducts);
//     const productContainer = document.querySelector(
//       ".products-grid"
//     ) as HTMLElement;
//     if (!productContainer) return;
//     productContainer.innerHTML = filteredProducts
//       .map((product) => {
//         return createProductCardHtml(product);
//       })
//       .join("");
//     linkToProductDetail();
//     const paginationContainer = document.querySelector(
//       ".products-pagination-current"
//     ) as HTMLElement;
//     if (!paginationContainer) return;
//     paginationContainer.innerHTML = "";
//     const total = Math.ceil(filteredProducts.length / getProductsPerPage());
//     for (let i = 1; i <= total; i++) {
//       paginationContainer.innerHTML += `
//         <div class="products-pagination-link" data-page-products="${i}">${i}</div>`;
//     }
//   });
// }

function totalPages(type: string): number {
  if (type === "Necklet") {
    return Math.ceil(
      products.filter((product) => product.type === "Necklet").length /
        getProductsPerPage()
    );
  }
  if (type === "Earring") {
    return Math.ceil(
      products.filter((product) => product.type === "Earring").length /
        getProductsPerPage()
    );
  }
  if (type === "Chain") {
    return Math.ceil(
      products.filter((product) => product.type === "Chain").length /
        getProductsPerPage()
    );
  }
  return Math.ceil(products.length / getProductsPerPage());
}
// console.log(totalPages("Earring"));
function renderProductsByFilter(page: number, filterType: string) {
  const productContainer = document.querySelector(
    ".products-grid"
  ) as HTMLElement;
  if (!productContainer) return;

  const filteredProducts = products.filter(
    (product) => product.type === filterType
  );
  if (filterType === "") {
    filteredProducts.push(...products);
  }
  console.log(filteredProducts);
  const countProducts = getProductsPerPage();
  const startIndex = (page - 1) * countProducts;
  const endIndex = startIndex + countProducts;
  const pageProducts = filteredProducts.slice(startIndex, endIndex);
  setTimeout(() => {
    productContainer.innerHTML = pageProducts
      .map((product) => {
        return createProductCardHtml(product);
      })
      .join("");
  }, 100);
}
function renderProduct() {
  const Necklet = document.querySelector(
    ".Select__filter-Necklet"
  ) as HTMLInputElement;
  const Earring = document.querySelector(
    ".Select__filter-Earring"
  ) as HTMLInputElement;
  const Chain = document.querySelector(
    ".Select__filter-Chain"
  ) as HTMLInputElement;
  updatePagination("");

  Necklet.addEventListener("click", () => {
    if (Necklet.checked) {
      Earring.checked = false;
      Chain.checked = false;
      updatePagination("Necklet");
    } else {
      updatePagination("");
    }
  });

  Earring.addEventListener("click", () => {
    if (Earring.checked) {
      Necklet.checked = false;
      Chain.checked = false;
      updatePagination("Earring");
    } else {
      updatePagination("");
    }
  });

  Chain.addEventListener("click", () => {
    if (Chain.checked) {
      Necklet.checked = false;
      Earring.checked = false;
      updatePagination("Chain");
    } else {
      updatePagination("");
    }
  });
}
function updatePagination(filterType: string) {
  const paginationContainer = document.querySelector(
    ".products-pagination-current"
  ) as HTMLElement;
  let currentFilter = "";
  let total = totalPages("");
  currentFilter = filterType;
  total = totalPages(filterType);
  if (total < 1) {
    total = 1;
  }
  paginationContainer.innerHTML = "";
  for (let i = 1; i <= total; i++) {
    paginationContainer.innerHTML += `
        <div class="products-pagination-link" data-page-products="${i}">${i}</div>`;
  }
  const paginationLinks = document.querySelectorAll(
    ".products-pagination-link"
  ) as NodeListOf<HTMLElement>;

  paginationLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = event.currentTarget as HTMLElement;
      const page = parseInt(target.dataset.pageProducts || "1", 10);
      renderProductsByFilter(page, currentFilter);
      paginationLinks.forEach((l) => l.classList.remove("active"));
      target.classList.add("active");
    });
  });

  if (paginationLinks.length > 0) {
    paginationLinks[0].classList.add("active");
  }

  renderProductsByFilter(1, filterType);
}
function setupPaginationArrow() {
  const prevButton = document.querySelector(
    ".products-pagination-prev"
  ) as HTMLElement;
  const nextButton = document.querySelector(
    ".products-pagination-next"
  ) as HTMLElement;

  if (!prevButton || !nextButton) return;

  prevButton.addEventListener("click", (event) => {
    event.preventDefault();
    const activeLink = document.querySelector(
      ".products-pagination-link.active"
    ) as HTMLElement;

    if (activeLink) {
      const currentPage = parseInt(activeLink.dataset.pageProducts || "1", 10);
      if (currentPage > 1) {
        const newPage = currentPage - 1;

        const currentFilter = getCurrentFilter();

        renderProductsByFilter(newPage, currentFilter);

        const paginationLinks = document.querySelectorAll(
          ".products-pagination-link"
        ) as NodeListOf<HTMLElement>;
        paginationLinks.forEach((link) => link.classList.remove("active"));

        const newActiveLink = document.querySelector(
          `.products-pagination-link[data-page-products="${newPage}"]`
        ) as HTMLElement;
        if (newActiveLink) {
          newActiveLink.classList.add("active");
        }
      }
    }
  });

  nextButton.addEventListener("click", (event) => {
    event.preventDefault();
    const activeLink = document.querySelector(
      ".products-pagination-link.active"
    ) as HTMLElement;

    if (activeLink) {
      const currentFilter = getCurrentFilter();
      const total = totalPages(currentFilter);
      const currentPage = parseInt(activeLink.dataset.pageProducts || "1", 10);

      if (currentPage < total) {
        const newPage = currentPage + 1;

        renderProductsByFilter(newPage, currentFilter);

        const paginationLinks = document.querySelectorAll(
          ".products-pagination-link"
        ) as NodeListOf<HTMLElement>;
        paginationLinks.forEach((link) => link.classList.remove("active"));

        const newActiveLink = document.querySelector(
          `.products-pagination-link[data-page-products="${newPage}"]`
        ) as HTMLElement;
        if (newActiveLink) {
          newActiveLink.classList.add("active");
        }
      }
    }
  });
}

function getCurrentFilter(): string {
  const Necklet = document.querySelector(
    ".Select__filter-Necklet"
  ) as HTMLInputElement;
  const Earring = document.querySelector(
    ".Select__filter-Earring"
  ) as HTMLInputElement;
  const Chain = document.querySelector(
    ".Select__filter-Chain"
  ) as HTMLInputElement;

  if (Necklet?.checked) return "Necklet";
  if (Earring?.checked) return "Earring";
  if (Chain?.checked) return "Chain";
  return "";
}
function setupPriceFilter() {
  const PriceFrom = document.querySelector(
    ".Select__filter-price-from"
  ) as HTMLInputElement;
  const PriceTo = document.querySelector(
    ".Select__filter-price-to"
  ) as HTMLInputElement;
  const buttonActive = document.querySelector(".Select__filter-search");
  if (!buttonActive) return;

  buttonActive.addEventListener("click", () => {
    console.log(PriceFrom.value);
    console.log(PriceTo.value);
    const priceFrom = parseFloat(PriceFrom.value);
    const priceTo = parseFloat(PriceTo.value);

    const filteredProducts = products.filter((p) => {
      return p.price >= priceFrom && p.price <= priceTo;
    });
    console.log(filteredProducts);
    const productContainer = document.querySelector(
      ".products-grid"
    ) as HTMLElement;
    if (!productContainer) return;
    productContainer.innerHTML = filteredProducts
      .map((product) => {
        return createProductCardHtml(product);
      })
      .join("");
    linkToProductDetail();
    const paginationContainer = document.querySelector(
      ".products-pagination-current"
    ) as HTMLElement;
    if (!paginationContainer) return;
    paginationContainer.innerHTML = "";
    const total = Math.ceil(filteredProducts.length / getProductsPerPage());
    for (let i = 1; i <= total; i++) {
      paginationContainer.innerHTML += `
        <div class="products-pagination-link" data-page-products="${i}">${i}</div>`;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupHeader();
  setupEventListeners();
  renderProduct();
  setupPriceFilter();
  setupPaginationArrow();
});
