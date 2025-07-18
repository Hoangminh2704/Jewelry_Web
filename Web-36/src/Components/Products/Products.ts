import "./Products.scss";
import {
  createProductCardHtml,
  linkToProductDetail,
  addToCart,
  deleteBadge,
} from "../ProductCard/ProductCard";
import type { ProductItem } from "../../Data/ProductDataType.ts";
import { initCart } from "../Card/Card";

import "swiper/css/pagination";
import "swiper/css/navigation";
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
  sortBy?: string;
}
let DefaultFilter: FilterOptions = {
  type: "",
  minPrice: null,
  maxPrice: null,
  sortBy: "",
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
  const sortText = document.querySelector(
    ".Select_product-text"
  ) as HTMLElement;
  let sortBy = "";
  if (sortText) {
    const currentChoice = sortText.textContent || "";
    if (currentChoice === "Mới nhất") {
      sortBy = "newest";
    } else if (currentChoice === "Giá thấp đến cao") {
      sortBy = "lowToHigh";
    } else if (currentChoice === "Giá cao đến thấp") {
      sortBy = "highToLow";
    }
  }
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
  return { type, minPrice, maxPrice, sortBy };
}
async function getProductsByFilter(options: FilterOptions) {
  if (products.length === 0) {
    products = await loadProducts();
  }
  const hiddenProductList = document.querySelector(
    ".Select__product-list-container"
  ) as HTMLElement;
  const hiddenDiv = document.querySelector(
    ".Select__product-list-empty"
  ) as HTMLElement;
  if (!hiddenProductList && !hiddenDiv) return [];
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
    if (options.sortBy) {
      if (options.sortBy === "newest") {
        result.sort((a, b) => {
          const dataA = new Date(a.datePublished);
          const dataB = new Date(b.datePublished);
          return dataB.getTime() - dataA.getTime();
        });
      } else if (options.sortBy === "lowToHigh") {
        result.sort((a, b) => a.price - b.price);
      } else if (options.sortBy === "highToLow") {
        result.sort((a, b) => b.price - a.price);
      }
    }
  }
  console.log("result", result);
  if (result.length === 0) {
    hiddenProductList.classList.add("non-active");
    hiddenDiv.style.display = "inline-block";
  } else {
    hiddenProductList.classList.remove("non-active");
    hiddenDiv.style.display = "none";
  }
  return result;
}

async function totalPagesbyFilter(options: FilterOptions) {
  const filteredProducts = await getProductsByFilter(options);
  return Math.ceil(filteredProducts.length / getProductsPerPage());
}

async function renderProductsByFilter(page: number, options?: FilterOptions) {
  const productContainer = document.querySelector(
    ".products-grid"
  ) as HTMLElement;
  if (!productContainer) return;
  const filterOptions = options || DefaultFilter;
  const filteredProducts = await getProductsByFilter(filterOptions);
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
    addToCart();
  }, 100);
  console.log(productContainer);
}
async function updatePagination(options: FilterOptions) {
  const paginationContainer = document.querySelector(
    ".products-pagination-current"
  ) as HTMLElement;
  if (!paginationContainer) return;
  DefaultFilter = { ...options };
  let totalPage = await totalPagesbyFilter(options);
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
    link.addEventListener("click", async (event) => {
      // Thêm async
      const target = event.currentTarget as HTMLElement;
      const page = parseInt(target.dataset.pageProducts || "1");
      await renderProductsByFilter(page, DefaultFilter); // Thêm await
      paginationLinks.forEach((l) => {
        l.classList.remove("active");
      });
      target.classList.add("active");
    });
  });
  if (paginationLinks.length > 0) {
    paginationLinks[0].classList.add("active");
  }
  await renderProductsByFilter(1, options); // Thêm await
}
async function applyFilters() {
  const options = getCurrentFilter();
  await updatePagination(options);
}
async function renderProduct() {
  const Necklet = document.querySelector(
    ".Select__filter-Necklet"
  ) as HTMLInputElement;
  const Earring = document.querySelector(
    ".Select__filter-Earring"
  ) as HTMLInputElement;
  const Chain = document.querySelector(
    ".Select__filter-Chain"
  ) as HTMLInputElement;
  await updatePagination({ type: "", minPrice: null, maxPrice: null });
  Necklet.addEventListener("click", async () => {
    if (Necklet.checked) {
      Earring.checked = false;
      Chain.checked = false;
    }
    await applyFilters();
  });
  Earring.addEventListener("click", async () => {
    if (Earring.checked) {
      Necklet.checked = false;
      Chain.checked = false;
    }
    console.log("Current", getCurrentFilter());
    await applyFilters();
  });

  Chain.addEventListener("click", async () => {
    if (Chain.checked) {
      Necklet.checked = false;
      Earring.checked = false;
    }
    await applyFilters();
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
  buttonActive.addEventListener("click", async (event) => {
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
    await applyFilters();
  });
}
async function updatePaginationArrow() {
  // Thêm async
  const prev = document.querySelector(
    ".products-pagination-prev"
  ) as HTMLElement;
  const next = document.querySelector(
    ".products-pagination-next"
  ) as HTMLElement;
  if (!prev && !next) return;

  prev.addEventListener("click", async () => {
    // Thêm async
    const activeLink = document.querySelector(
      ".products-pagination-link.active"
    ) as HTMLElement;
    if (activeLink) {
      const currentPage = parseInt(activeLink.dataset.pageProducts || "1");
      if (currentPage > 1) {
        const prevPage = currentPage - 1;
        await renderProductsByFilter(prevPage, DefaultFilter); // Thêm await
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

  next.addEventListener("click", async () => {
    const activeLink = document.querySelector(
      ".products-pagination-link.active"
    ) as HTMLElement;
    if (activeLink) {
      const currentPage = parseInt(activeLink.dataset.pageProducts || "1");
      const total = await totalPagesbyFilter(DefaultFilter); // Thêm await
      if (currentPage < total) {
        const nextPage = currentPage + 1;
        await renderProductsByFilter(nextPage, DefaultFilter);
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

  const Links = document.querySelectorAll(
    ".products-pagination-link"
  ) as NodeListOf<HTMLElement>;
  if (Links) {
    const totalPages = await totalPagesbyFilter(DefaultFilter); // Thêm await
    Links.forEach((link) => {
      if (
        link.classList.contains("active") &&
        link.dataset.pageProducts === "1"
      ) {
        console.log("Disable prev");
      } else if (
        link.classList.contains("active") &&
        link.dataset.pageProducts === `${totalPages}` // Sửa dòng này
      ) {
        console.log("Disable next");
      }
    });
  }
  console.log("Update pagination arrow");
}
function setupSort() {
  const sortSelect = document.querySelector(
    ".Select__product-action"
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
    applyFilters();
  });
  sortPriceHTL.addEventListener("click", () => {
    sortOptions.classList.remove("active");
    sortText.textContent = "Giá cao đến thấp";
    applyFilters();
  });
}
function moreOptions() {
  const moreOptionsArrow = document.querySelector(
    ".Select__filter-arrow-icon"
  ) as HTMLElement;
  const moreOptions = document.querySelector(
    ".Select__filter-more"
  ) as HTMLElement;
  if (!moreOptionsArrow || !moreOptions) return;
  moreOptionsArrow.addEventListener("click", () => {
    moreOptionsArrow.classList.toggle("active");
    if (moreOptionsArrow.classList.contains("active")) {
      moreOptions.style.display = "block";
    } else {
      moreOptions.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  products = await loadProducts();
  console.log("Products loaded:", products.length);

  setupHeader();
  setupEventListeners();
  updatePriceFilter();
  await renderProduct();
  await updatePaginationArrow();
  await renderProductsByFilter(1, { type: "", minPrice: null, maxPrice: null });
  setupSort();
  initCart();
  moreOptions();
});
