import "./ProductionDetail.scss";
import type { ProductItem } from "../../Data/ProductDataType.ts";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Swiper from "swiper";
import {
  createProductCardHtml,
  linkToProductDetail,
  SELECT_STORAGE_KEY,
  convertPriceToString,
  addToCart,
} from "../ProductCard/ProductCard.ts";
import { Navigation, Pagination } from "swiper/modules";

let products: ProductItem[] = [];
let currentProduct: ProductItem | null = null;
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
function getSelectedProduct(): ProductItem | null {
  try {
    const productData = localStorage.getItem(SELECT_STORAGE_KEY);
    if (productData) {
      return JSON.parse(productData);
    }
    return null;
  } catch (error) {
    console.error("Error parsing selected product from localStorage:", error);
    return null;
  }
}

function renderProductDetail(product: ProductItem) {
  const breadcrumbProduct = document.querySelector(
    ".Introduction__link-path-to"
  );
  if (breadcrumbProduct) {
    breadcrumbProduct.textContent = product.name;
  }
  const productImage = document.querySelector(
    ".Information__img"
  ) as HTMLImageElement;
  if (productImage) {
    productImage.src = product.image;
    productImage.alt = product.name;
  }

  const productName = document.querySelector(".Information__content-name");
  if (productName) {
    productName.textContent = product.name;
  }

  const ratingCount = document.querySelector(
    ".Information__content-evalute-count"
  );
  if (ratingCount) {
    ratingCount.textContent = `${product.Rating.count} đánh giá`;
  }

  const productPrice = document.querySelector(".Information__content-price");
  if (productPrice) {
    productPrice.textContent = `${product.price.toLocaleString("vi-VN")} đ`;
  }

  const materialValue = document.querySelector(
    ".Information__content-material-value"
  );
  if (materialValue) {
    materialValue.textContent = product.Material;
  }

  const sizeSelect = document.querySelector(
    ".Information__content-size-select-selected"
  ) as HTMLSelectElement;
  if (sizeSelect) {
    sizeSelect.innerHTML = '<option value="">Chọn kích cỡ</option>';

    product.Size.forEach((size) => {
      const option = document.createElement("option");
      option.value = size;
      option.textContent = `Size ${size}`;
      sizeSelect.appendChild(option);
    });
  }

  const productDescription = document.querySelector(
    ".Information__content-description"
  );
  if (productDescription) {
    productDescription.textContent = product.ShortDescription;
  }
  collapseInfomation(product);
}

function setupAddToCartButton() {
  const addToCartBtn = document.querySelector(
    ".Information__content-button"
  ) as HTMLButtonElement;
  const sizeSelect = document.querySelector(
    ".Information__content-size-select-selected"
  ) as HTMLSelectElement;

  if (addToCartBtn && currentProduct) {
    addToCartBtn.addEventListener("click", () => {
      const selectedSize = sizeSelect.value;

      if (!selectedSize) {
        alert("Chưa chọn size");
        return;
      }

      import("../Card/Card.js").then(({ addToCart }) => {
        addToCart(currentProduct!.id, selectedSize);
        showAddToCartNotification(currentProduct!, 1, selectedSize);
      });
    });
  }
}

function showAddToCartNotification(
  product: ProductItem,
  quantity: number,
  size: string
) {
  const existingNotification = document.getElementById("cartNotification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notificationHtml = `
    
    <div class="add-to-cart-notification" id="cartNotification">
      <div class="notification-content">
        <div class="notification-header">
          <h3 class="notification-title">Đã thêm vào giỏ hàng!</h3>
        </div>
        <div class="notification-line"></div>
        <div class="notification-body">
                  <div class="product-info">
                    <img src="${product.image}" alt="${
    product.name
  }" class="product-image">
                    <div class="product-details">
                      <h1 class="product-name">${product.name}</h1>
                      <div class="product-price">${convertPriceToString(
                        product.price
                      )}</div>
                      <div class="product-option">
                        <div class="product-size">Size: ${size}</div>
                        <div class="product-quantity">X${quantity}</div>
                      </div>
                      
                    </div>
                  </div>
                </div>
        <div class="notification-actions">
          <button class="btn-view-cart">Xem giỏ hàng</button>
        </div>
      </div>
    </div>
      
  `;

  document.body.insertAdjacentHTML("beforeend", notificationHtml);

  const viewCartBtn = document.querySelector(".btn-view-cart");

  // const closeNotification = () => {
  //   document.getElementById("cartNotification")?.remove();
  // };

  viewCartBtn?.addEventListener("click", viewCart);

  setTimeout(() => {
    const notification = document.getElementById("cartNotification");
    if (notification) {
      notification.classList.add("show");

      const viewCartBtn = notification.querySelector(".btn-view-cart");
      if (viewCartBtn) {
        viewCartBtn.addEventListener("click", viewCart);
      }
    }
  }, 10);

  setTimeout(() => {
    const notification = document.getElementById("cartNotification");
    if (notification) {
      notification.classList.add("hide");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }
  }, 5000);
}
function viewCart() {
  window.location.href = "/src/Components/Card/Card.html";
}

export function setupHeader() {
  const menuItems = [
    {
      label: "Trang chủ",
      href: "/src/Components/Home/Home.html",
      active: false,
    },
    {
      label: "Sản phẩm",
      href: "/src/Components/Products/Products.html",
      active: true,
    },
    {
      label: "Giới thiệu",
      href: "/src/Components/About/About.html",
      active: false,
    },
    {
      label: "Liên hệ",
      href: "/src/Components/Contact/Contact.html",
      active: false,
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
}

export function setupNewProductsSection() {
  const swiperWrapper = document.querySelector(".NewProduct__content");
  const swiperContainer = document.querySelector(
    ".NewProduct__swiper"
  ) as HTMLElement;
  const NewProduct_next = document.querySelector(
    ".NewProduct__header-arrow-next"
  ) as HTMLElement;
  const NewProduct_prev = document.querySelector(
    ".NewProduct__header-arrow-back"
  ) as HTMLElement;

  if (swiperContainer && swiperWrapper) {
    const newProducts = products.filter((p) => p.isNew === true);

    // if (newProducts.length === 0) {
    //   swiperWrapper.innerHTML =
    //     '<div class="swiper-slide"><p class="no-products">Không có sản phẩm mới nào.</p></div>';
    //   return;
    // }
    let productsPerSlide = 4; // Default for larger screens
    if (window.innerWidth < 768) {
      productsPerSlide = 1;
    } else if (window.innerWidth < 1280) {
      productsPerSlide = 4;
    } else {
      productsPerSlide = 4;
    }
    const productGroups: ProductItem[][] = [];

    for (let i = 0; i < newProducts.length; i += productsPerSlide) {
      productGroups.push(newProducts.slice(i, i + productsPerSlide));
    }
    console.log(productGroups);
    setTimeout(() => {
      linkToProductDetail();
      addToCart();
    }, 100);
    const slidesHTML = productGroups
      .map(
        (group) => `
      <div class="swiper-slide">
        <div class="slide-products-grid">
          ${group.map((product) => createProductCardHtml(product)).join("")}
        </div>
      </div>
    `
      )
      .join("");

    swiperWrapper.innerHTML = slidesHTML;

    setTimeout(() => {
      linkToProductDetail();
    }, 100);

    setTimeout(() => {
      initializeSwiper(
        swiperContainer,
        NewProduct_next,
        NewProduct_prev,
        productGroups.length
      );
    }, 200);
  }
}

export function initializeSwiper(
  swiperContainer: HTMLElement,
  nextButton: HTMLElement,
  prevButton: HTMLElement,
  totalSlides: number
) {
  new Swiper(swiperContainer, {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: false,
    watchOverflow: true,
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },

    pagination: {
      el: ".NewProduct__pagination",
      clickable: true,
    },
  });

  if (nextButton) nextButton.style.display = totalSlides > 1 ? "flex" : "none";
  if (prevButton) prevButton.style.display = totalSlides > 1 ? "flex" : "none";
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

async function initProductDetail() {
  currentProduct = getSelectedProduct();

  if (!currentProduct) {
    console.error("No product selected");
    window.location.href = "/src/Components/Products/Products.html";
    return;
  }

  products = await loadProducts();

  renderProductDetail(currentProduct);

  setupAddToCartButton();
}
function collapseInfomation(product: ProductItem) {
  const description = document.querySelector(
    ".CardFeatures__information-title"
  ) as HTMLElement;
  const descriptionContent = document.querySelector(
    ".CardFeatures__information-content"
  ) as HTMLElement;
  const descriptionIcon = document.querySelector(
    ".CardFeatures__information-title-icon"
  ) as HTMLElement;
  const detail_1 = document.querySelector(
    ".CardFeatures__detail-title"
  ) as HTMLElement;
  const detail_1Content = document.querySelector(
    ".CardFeatures__detail-content"
  ) as HTMLElement;
  const detail_1Icon = document.querySelector(
    ".CardFeatures__detail-title-icon"
  ) as HTMLElement;

  const detail_2 = document.querySelector(
    ".CardFeatures__question-title"
  ) as HTMLElement;
  const detail_2Content = document.querySelector(
    ".CardFeatures__question-content"
  ) as HTMLElement;
  const detail_2Icon = document.querySelector(
    ".CardFeatures__question-title-icon"
  ) as HTMLElement;
  descriptionContent.textContent = product.Description;
  detail_1Content.textContent = product.ProductionDetail_1;
  detail_2Content.textContent = product.ProductionDetail_2;
  console.log(product);
  console.log("Description:", product.Description);
  // let descriptionFlag = false;
  // let detail_1Flag = false;
  // let detail_2Flag = false;
  // if (descriptionFlag) {
  //   detail_1Flag = false;
  //   detail_2Flag = false;

  // }
  description.addEventListener("click", () => {
    description.classList.toggle("collapsed");
    if (description.classList.contains("collapsed")) {
      descriptionContent.style.display = "none";
      descriptionIcon.classList.add("collapsed");
      // detail_1Content.style.display = "none";
      // detail_1Icon.classList.remove("collapsed");
      // detail_2Content.style.display = "none";
      // detail_2Icon.classList.remove("collapsed");
    } else {
      descriptionContent.style.display = "block";
      descriptionIcon.classList.remove("collapsed");
    }
    // toggleCollapseInfomation();
  });
  detail_1.addEventListener("click", () => {
    detail_1.classList.toggle("collapsed");
    if (detail_1.classList.contains("collapsed")) {
      detail_1Content.style.display = "block";
      detail_1Icon.classList.add("collapsed");
      // detail_2Content.style.display = "none";
      // detail_2Icon.classList.remove("collapsed");
      // descriptionContent.style.display = "none";
      // descriptionIcon.classList.remove("collapsed");
    } else {
      detail_1Content.style.display = "none";
      detail_1Icon.classList.remove("collapsed");
    }
    // toggleCollapseInfomation();
  });
  detail_2.addEventListener("click", () => {
    detail_2.classList.toggle("collapsed");
    if (detail_2.classList.contains("collapsed")) {
      detail_2Content.style.display = "block";
      detail_2Icon.classList.add("collapsed");
      // descriptionContent.style.display = "none";
      // descriptionIcon.classList.remove("collapsed");
      // detail_1Content.style.display = "none";
      // detail_1Icon.classList.remove("collapsed");
    } else {
      detail_2Content.style.display = "none";
      detail_2Icon.classList.remove("collapsed");
    }
    // toggleCollapseInfomation();
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await initProductDetail();
  setupHeader();
  setupNewProductsSection();
  setupLinkToCart();
  // collapseInfomation();
  // toggleCollapseInfomation();
});
