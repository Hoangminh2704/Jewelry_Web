import "./Products.scss";
import {
  createProductCardHtml,
  linkToProductDetail,
  deleteBadge,
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

interface FilterOptions {
  type: string;
  minPrice: number | null;
  maxPrice: number | null;
}
let DefaultFilter: FilterOptions = {
  type: "",
  minPrice: null,
  maxPrice: null,
};
function getProductsPerPage(): number {
  if (window.innerWidth >= 1280) {
    return 9;
  }
  return 6;
}
function getCurrentFilter(): FilterOptions {
  const Necklet = document.querySelector(
    ".Select__filter-Necklet"
  ) as HTMLInputElement;
  const Earring = document.querySelector(
    ".Select__filter-Earring"
  ) as HTMLInputElement;
  const Chain = document.querySelector(
    ".Select__filter-Chain"
  ) as HTMLInputElement;
  const PriceFrom = document.querySelector(
    ".Select__filter-price-from"
  ) as HTMLInputElement;
  const PriceTo = document.querySelector(
    ".Select__filter-price-to"
  ) as HTMLInputElement;
  let type = "";
  if (Necklet?.checked) {
    type = "Necklet";
  } else if (Earring?.checked) {
    type = "Earring";
  } else if (Chain?.checked) {
    type = "Chain";
  }
  const minPrice = PriceFrom?.value ? parseInt(PriceFrom.value) : null;
  const maxPrice = PriceTo?.value ? parseInt(PriceTo.value) : null;
  console.log("DoubleCheck", { type, minPrice, maxPrice });
  return { type, minPrice, maxPrice };
}
function getProductsByFilter(options: FilterOptions) {
  const result = [];
  for (let i = 0; i < products.length; i++) {
    const currentProducts = products[i];
    let typeMatch = true;
    let PriceMatch = true;
    if (options.type != "") {
      if (currentProducts.type != options.type) typeMatch = false;
    }
    if (options.minPrice != null) {
      if (currentProducts.price < options.minPrice) PriceMatch = false;
    }
    if (options.maxPrice != null) {
      if (currentProducts.price > options.maxPrice) PriceMatch = false;
    }
    if (typeMatch && PriceMatch) {
      result.push(currentProducts);
    }
  }
  return result;
}
const testType = getProductsByFilter({
  type: "Earring",
  minPrice: null,
  maxPrice: null,
});
console.log("checkType", testType);
function totalPagesbyFilter(options: FilterOptions) {
  const filteredProducts = getProductsByFilter(options);
  return Math.ceil(filteredProducts.length / getProductsPerPage());
}
const checkTotal = totalPagesbyFilter({
  type: "Earring",
  minPrice: 8000000,
  maxPrice: null,
});
console.log(checkTotal);

function renderProductsByFilter(page: number, options?: FilterOptions) {
  const productContainer = document.querySelector(
    ".products-grid"
  ) as HTMLElement;
  if (!productContainer) return;
  const filterOptions = options || DefaultFilter;
  const filteredProducts = getProductsByFilter(filterOptions);
  console.log(filteredProducts);
  const countProducts = getProductsPerPage();
  const startIndex = (page - 1) * countProducts;
  const endIndex = startIndex + countProducts;
  const pageProducts = filteredProducts.slice(startIndex, endIndex);
  console.log(pageProducts);
  setTimeout(() => {
    productContainer.innerHTML = pageProducts
      .map((product) => createProductCardHtml(product))
      .join("");
    deleteBadge();
    linkToProductDetail();
  }, 100);
  console.log(productContainer);
}
function updatePagination(options: FilterOptions) {
  const paginationContainer = document.querySelector(
    ".products-pagination-current"
  ) as HTMLElement;
  if (!paginationContainer) return;
  DefaultFilter = { ...options };
  let totalPage = totalPagesbyFilter(options);
  if (totalPage < 1) {
    totalPage = 1;
  }
  paginationContainer.innerHTML = "";
  for (let i = 1; i <= totalPage; i++) {
    paginationContainer.innerHTML += `
    <div class="products-pagination-link" data-page-products="${i}">${i}</div>
    `;
  }
  const paginationLinks = document.querySelectorAll(
    ".products-pagination-link"
  ) as NodeListOf<HTMLElement>;
  paginationLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = event.currentTarget as HTMLElement;
      const page = parseInt(target.dataset.pageProducts || "1");
      renderProductsByFilter(page, DefaultFilter);
      paginationLinks.forEach((l) => {
        l.classList.remove("active");
      });
      target.classList.add("active");
    });
  });
  if (paginationLinks.length > 0) {
    paginationLinks[0].classList.add("active");
  }
  renderProductsByFilter(1, options);
}
function applyFilters() {
  const options = getCurrentFilter();
  updatePagination(options);
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
  updatePagination({ type: "", minPrice: null, maxPrice: null });
  Necklet.addEventListener("click", () => {
    if (Necklet.checked) {
      Earring.checked = false;
      Chain.checked = false;
    }
    applyFilters();
  });
  Earring.addEventListener("click", () => {
    if (Earring.checked) {
      Necklet.checked = false;
      Chain.checked = false;
    }
    console.log("Current", getCurrentFilter());
    applyFilters();
  });

  Chain.addEventListener("click", () => {
    if (Chain.checked) {
      Necklet.checked = false;
      Earring.checked = false;
    }
    applyFilters();
  });
}
function updatePriceFilter() {
  const PriceFrom = document.querySelector(
    ".Select__filter-price-from"
  ) as HTMLInputElement;
  const PriceTo = document.querySelector(
    ".Select__filter-price-to"
  ) as HTMLInputElement;
  const buttonActive = document.querySelector(".Select__filter-search");
  if (!buttonActive) return;
  buttonActive.addEventListener("click", (event) => {
    console.log("click button search");
    event.preventDefault();
    const fromValue = PriceFrom?.value;
    const toValue = PriceTo?.value;
    if (fromValue && toValue) {
      const from = parseInt(fromValue);
      const to = parseInt(toValue);
      if (from > to) {
        alert("Error");
        return;
      }
    }
    console.log("Filter after price: ", getCurrentFilter());
    applyFilters();
  });
}
function updatePaginationArrow() {
  const prev = document.querySelector(
    ".products-pagination-prev"
  ) as HTMLElement;
  const next = document.querySelector(
    ".products-pagination-next"
  ) as HTMLElement;
  if (!prev && !next) return;
  prev.addEventListener("click", () => {
    const activeLink = document.querySelector(
      ".products-pagination-link.active"
    ) as HTMLElement;
    if (activeLink) {
      const currentPage = parseInt(activeLink.dataset.pageProducts || "1");
      if (currentPage > 1) {
        const prevPage = currentPage - 1;
        renderProductsByFilter(prevPage, DefaultFilter);
        const paginationLinks = document.querySelectorAll(
          ".products-pagination-link"
        ) as NodeListOf<HTMLElement>;
        paginationLinks.forEach((link) => {
          link.classList.remove("active");
        });
        const newActive = document.querySelector(`
          .products-pagination-link[data-page-products="${prevPage}"]
          `);
        newActive?.classList.add("active");
      }
    }
  });
  next.addEventListener("click", () => {
    const activeLink = document.querySelector(
      ".products-pagination-link.active"
    ) as HTMLElement;
    if (activeLink) {
      const currentPage = parseInt(activeLink.dataset.pageProducts || "1");
      const total = totalPagesbyFilter(DefaultFilter);
      if (currentPage < total) {
        const nextPage = currentPage + 1;
        renderProductsByFilter(nextPage, DefaultFilter);
        const paginationLinks = document.querySelectorAll(
          ".products-pagination-link"
        ) as NodeListOf<HTMLElement>;
        paginationLinks.forEach((link) => {
          link.classList.remove("active");
        });
        const newActive = document.querySelector(`
          .products-pagination-link[data-page-products="${nextPage}"]
          `);
        newActive?.classList.add("active");
      }
    }
  });
}
function setupSort() {
  const sortSelect = document.querySelector(
    ".Select__product-arrow"
  ) as HTMLSelectElement;
  const sortOptions = document.querySelector(
    ".Select__product-sort-overall"
  ) as HTMLElement;
  const sortText = document.querySelector(
    ".Select_product-text"
  ) as HTMLElement;

  const sortNewest = document.querySelector(
    ".Select__product-sort-options.newest"
  ) as HTMLElement;
  const sortPriceLTH = document.querySelector(
    ".Select__product-sort-options.lowToHigh"
  ) as HTMLElement;
  const sortPriceHTL = document.querySelector(
    ".Select__product-sort-options.highToLow"
  ) as HTMLElement;
  if (
    !sortSelect ||
    !sortOptions ||
    !sortText ||
    !sortNewest ||
    !sortPriceLTH ||
    !sortPriceHTL
  )
    return;
  sortSelect.addEventListener("click", () => {
    // console.log("Sort click");
    sortOptions.classList.toggle("active");
  });
  sortNewest.addEventListener("click", () => {
    sortOptions.classList.remove("active");
    sortText.textContent = "Mới nhất";
    applyFilters();
  });
  sortPriceLTH.addEventListener("click", () => {
    sortOptions.classList.remove("active");
    sortText.textContent = "Giá thấp đến cao";
  });
  sortPriceHTL.addEventListener("click", () => {
    sortOptions.classList.remove("active");
    sortText.textContent = "Giá cao đến thấp";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupHeader();
  setupEventListeners();
  // getCurrentFilter();

  updatePriceFilter();
  // applyFilters();
  renderProduct();
  updatePaginationArrow();
  renderProductsByFilter(1, { type: "", minPrice: null, maxPrice: null });
  setupSort();
});
