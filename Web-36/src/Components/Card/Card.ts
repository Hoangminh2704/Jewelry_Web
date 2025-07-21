import "./Card.scss";
import type { ProductItem } from "../../Data/ProductDataType.ts";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  createProductCardHtml,
  linkToProductDetail,
  addToCart as addToCartFromProductCard,
} from "../ProductCard/ProductCard.ts";
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
    ".header--sub-menu.open"
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

async function setupNewProductsSection() {
  if (products.length === 0) {
    products = await loadProducts();
  }
  const addProductNewCard = document.querySelector(".NewProduct__content");
  if (addProductNewCard) {
    const newProductCard = products.filter((p) => p.isNew === true).slice(0, 4);
    const createNewElement = newProductCard
      .map((product) => createProductCardHtml(product))
      .join("");

    addProductNewCard.innerHTML = createNewElement;
    addToCartFromProductCard();
    linkToProductDetail();
  }
}

function setupEventListeners() {
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

export let cart: Array<{
  productId: number;
  quantity: number;
  isCheck: boolean;
  price: number;
  size: string[];
  sizeSelected: string;
}> = [];
const CART_STORAGE_KEY = "cart";

function loadFromStorage() {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);
  if (storedCart) {
    try {
      cart = JSON.parse(storedCart);
    } catch (error) {
      console.error(error);
      cart = [];
    }
  } else {
    cart = [];
  }
}

function saveToStorage() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateCartDisplay();
  renderCartHover();
}
export function getCartCount(): number {
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });
  return totalQuantity;
}

export function addToCart(productId: number, size: string = "0"): void {
  const matchingItem = cart.find(
    (item) => item.productId === productId && item.sizeSelected === size
  );

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      isCheck: true,
      price: products.find((p) => p.id === productId)?.price || 0,
      size: products.find((p) => p.id === productId)?.Size || [],
      sizeSelected: size,
    });
  }
  saveToStorage();
  console.log("Cart updated:", cart);
  console.log("Total items:", getCartCount());
}

function removeFromCart(productId: number, size: string = ""): void {
  const itemIndex = cart.findIndex(
    (item) =>
      item.productId === productId && (size ? item.sizeSelected === size : true)
  );
  if (itemIndex !== -1) {
    cart[itemIndex].quantity -= 1;
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }
    saveToStorage();
  }
}
function addFromCart(productId: number, size: string = ""): void {
  const itemIndex = cart.findIndex(
    (item) =>
      item.productId === productId && (size ? item.sizeSelected === size : true)
  );
  if (itemIndex !== -1) {
    cart[itemIndex].quantity += 1;
    saveToStorage();
  }
}
function removeItemFromCart(productId: number, size: string = ""): void {
  cart = cart.filter(
    (item) =>
      !(
        item.productId === productId &&
        (size ? item.sizeSelected === size : true)
      )
  );
  saveToStorage();
}

function updateCartDisplay(): void {
  const cartCountElements = document.querySelectorAll(
    ".header--search-cart-counting"
  );
  const count = getCartCount();

  cartCountElements.forEach((element) => {
    if (element) {
      element.textContent = count.toString();
    }
  });
}
function headerHover() {
  const cartIcons = document.querySelectorAll(".header--search-cart");
  if (!cartIcons.length) return;

  cartIcons.forEach((cartIcon) => {
    const showMenu = () => {
      renderCartHover();
      const menu = document.querySelector(
        ".header--search-hover"
      ) as HTMLElement;
      if (menu) {
        menu.classList.add("active");
      }
    };

    const hideMenu = () => {
      const menu = document.querySelector(
        ".header--search-hover"
      ) as HTMLElement;
      if (menu) {
        menu.classList.remove("active");
      }
    };
    cartIcon.addEventListener("mouseenter", showMenu);
    cartIcon.addEventListener("mouseleave", hideMenu);

    const menu = document.querySelector(".header--search-hover");
    if (menu) {
      menu.addEventListener("mouseenter", showMenu);
      menu.addEventListener("mouseleave", hideMenu);
    }
  });
}
function renderCartHover() {
  const cartHoverBody = document.querySelector(".header--search-hover-body");
  const cartHoverButton = document.querySelector(
    ".header--search-hover-button"
  );

  if (!cartHoverBody) return;
  cartHoverBody.innerHTML = "";

  if (cart.length === 0) {
    cartHoverBody.innerHTML = `
      <div style="text-align: center; padding: 10px; color: #999;">
        <img src="../../assets/cart_empty.jpg" alt="Empty Cart" style="width: 100px; height: 100px; margin-bottom: 10px;" />
        <p>Giỏ hàng của bạn đang trống</p>
      </div>
    `;
    if (cartHoverButton) {
      (cartHoverButton as HTMLButtonElement).textContent = "Quay lại trang chủ";
      (cartHoverButton as HTMLButtonElement).onclick = () => {
        window.location.href = "/src/Components/Home/Home.html";
      };
    }
    return;
  }
  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (product) {
      cartHoverBody.innerHTML += `
        <div class="header--search-hover-item">
          <div class="header--search-hover-item-content">
            <img
              src="${product.image}"
              alt="${product.name}"
              class="header--search-hover-item-image"
            />
            <div class="header--search-hover-item-info">
              <div class="header--search-hover-item-overall">
                <h1 class="header--search-hover-item-title">
                  ${product.name}
                </h1>
                <div class="header--search-hover-item-price">
                  ${product.price.toLocaleString("vi-VN")} đ
                </div>
              </div>
              <div class="header--search-hover-item-option">
                <div class="header--search-hover-item-size">
                  Size: ${item.sizeSelected}
                </div>
                <div class="header--search-hover-item-quantity">
                  x${item.quantity}
                </div>
              </div>
            </div>
            
            <button class="header--search-hover-item-remove" data-product-id="${
              item.productId
            }" data-size="${item.sizeSelected}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4.26665 12.6663L3.33331 11.733L7.06665 7.99967L3.33331 4.26634L4.26665 3.33301L7.99998 7.06634L11.7333 3.33301L12.6666 4.26634L8.93331 7.99967L12.6666 11.733L11.7333 12.6663L7.99998 8.93301L4.26665 12.6663Z" fill="currentColor"></path></svg>
            </button>
          </div>
          <div class="header--search-hover-item-divider"></div>
        </div>
      `;
    }
  });

  if (cartHoverButton) {
    (cartHoverButton as HTMLButtonElement).textContent = "Xem giỏ hàng";
    (cartHoverButton as HTMLButtonElement).onclick = () => {
      window.location.href = "/src/Components/Card/Card.html";
    };
  }
  const removeButtons = document.querySelectorAll(
    ".header--search-hover-item-remove"
  ) as NodeListOf<HTMLElement>;
  removeButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      console.log("Remove id:", button.dataset.productId);
      console.log("Remove size:", button.dataset.size);
      const productId = parseInt(button.dataset.productId || "0");
      const size = button.dataset.size || "";
      removeItemFromCart(productId, size);
      await renderCartItems();
      CartEmpty();
      renderCartHover();
      updateCartDisplay();
      headerHover();
      updateCartOverall();
      cartAction();
    });
  });
}

function clearCart(): void {
  cart = [];
  saveToStorage();
}

function getCartData(): Array<{ productId: number; quantity: number }> {
  return [...cart];
}

function initCart(): void {
  loadFromStorage();
  updateCartDisplay();
  console.log(cart);
}
async function renderCartItems(): Promise<void> {
  if (products.length === 0) {
    products = await loadProducts();
  }
  const cartContainer = document.querySelector(
    ".Card__item-body"
  ) as HTMLElement;

  initCart();
  if (cartContainer) {
    cartContainer.innerHTML = "";
    cart.forEach((item, index) => {
      const product = products.find((p) => p.id === item.productId);
      if (product) {
        cartContainer.innerHTML += `
          <div class="Card__item-detail" data-cart-index="${index}">
            <input
              type="checkbox"
              class="Card__item-checkbox"
              title="checkbox"
              data-product-id="${item.productId}"
              data-size="${item.sizeSelected}"
            />
            <img
              src="${product.image}"
              class="Card__item-img"
              alt="Product Image"
            />
            <div class="Card__item-content">
              <div class="Card__item-content-name">
                ${product.name}
              </div>
              <div class="Card__item-content-price">
                <span class="Card__item-content-price-label">Giá:</span>
                <span class="Card__item-content-price-value"
                  >${product.price.toLocaleString("vi-VN")} đ</span>
              </div>
            </div>
            <div class="Card__item-content-others">
              <div class="Card__item-content-size">
                <span class="Card__item-content-size-label">Size:</span>
                <div class="Card__item-content-size-selected">
                  <select
                    title="Size"
                    class="Card__item-content-size-select"
                    data-product-id="${item.productId}"
                    data-cart-index="${index}"
                  >
                    ${item.size
                      .map(
                        (size) =>
                          `<option value="${size}" ${
                            size === item.sizeSelected ? "selected" : ""
                          }>${size}</option>`
                      )
                      .join("")}
                  </select>
                  ${arrowSVG()}
                </div>
              </div>
              <div class="Card__item-content-count">
                <div class="Card__item-content-count-label">Số lượng:</div>
                <div class="Card__item-content-count-value">
                  <div class="Card__item-content-count-minus" 
                       data-product-id="${item.productId}"
                       data-size="${item.sizeSelected}">
                    ${plusSVG()}
                  </div>
                  <div class="Card__item-content-count-number">${
                    item.quantity
                  }</div>
                  <div class="Card__item-content-count-plus" 
                       data-product-id="${item.productId}"
                       data-size="${item.sizeSelected}">
                    ${minusSVG()}
                  </div>
                </div>
              </div>
              <div class="Card__item-content-remove" 
                   data-product-id="${item.productId}"
                   data-size="${item.sizeSelected}">
                ${removeSVG()}
                <span>Xoá</span>
              </div>
            </div>
          </div>
        `;
      }
    });
  }
}
// function setDefaultCartSize() {}

function cartAction() {
  const minusButtons = document.querySelectorAll(
    ".Card__item-content-count-minus"
  ) as NodeListOf<HTMLElement>;
  const plusButtons = document.querySelectorAll(
    ".Card__item-content-count-plus"
  ) as NodeListOf<HTMLElement>;
  const removeButtons = document.querySelectorAll(
    ".Card__item-content-remove"
  ) as NodeListOf<HTMLElement>;
  const removeAll = document.querySelector(
    ".Card__item-header-delete"
  ) as HTMLElement;
  const checkboxes = document.querySelectorAll(
    ".Card__item-checkbox"
  ) as NodeListOf<HTMLInputElement>;

  const sizeSelects = document.querySelectorAll(
    ".Card__item-content-size-select"
  ) as NodeListOf<HTMLSelectElement>;
  const removeItemFromCartIcon = document.querySelectorAll(
    ".header--search-hover-item-remove"
  ) as NodeListOf<HTMLElement>;

  sizeSelects.forEach((select) => {
    select.addEventListener("change", async () => {
      const productId = parseInt(select.dataset.productId || "0");
      const cartIndex = parseInt(select.dataset.cartIndex || "0");
      const newSize = select.value;

      if (cart[cartIndex]) {
        const oldSize = cart[cartIndex].sizeSelected;
        const existingNewItem = cart.find(
          (item) =>
            item.productId === productId && item.sizeSelected === newSize
        );

        if (existingNewItem && newSize !== oldSize) {
          existingNewItem.quantity += cart[cartIndex].quantity;
          cart.splice(cartIndex, 1);
        } else {
          cart[cartIndex].sizeSelected = newSize;
        }

        saveToStorage();
        await renderCartItems();
        CartEmpty();
        updateCartOverall();
        cartAction();
      }
    });
  });

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", async (event) => {
      const target = event.target as HTMLInputElement;
      const productId = parseInt(target.dataset.productId || "0");
      const size = target.dataset.size || "";

      if (productId) {
        updateCheckboxStatus(productId, target.checked, size);

        await renderCartItems();
        CartEmpty();
        updateCartOverall();
        cartAction();
      }
    });
  });

  if (removeAll) {
    removeAll.addEventListener("click", async (event) => {
      event.preventDefault();
      clearCart();
      await renderCartItems();
      CartEmpty();
      updateCartOverall();
      cartAction();
    });
  }

  minusButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      const productId = parseInt(button.dataset.productId || "0");
      const size = button.dataset.size || "";
      if (productId) {
        removeFromCart(productId, size);
        await renderCartItems();
        CartEmpty();
        updateCartOverall();
        cartAction();
      }
    });
  });

  plusButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      const productId = parseInt(button.dataset.productId || "0");
      const size = button.dataset.size || "";
      if (productId) {
        addFromCart(productId, size);
        await renderCartItems();
        CartEmpty();
        updateCartOverall();
        cartAction();
      }
    });
  });
  removeItemFromCartIcon.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      console.log("Remove item from cart icon clicked");
      const productId = parseInt(button.dataset.productId || "0");
      const size = button.dataset.size || "";
      if (productId) {
        removeItemFromCart(productId, size);
        await renderCartItems();
        CartEmpty();
        updateCartOverall();
        cartAction();
      }
    });
  });
  removeButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      const productId = parseInt(button.dataset.productId || "0");
      const size = button.dataset.size || "";
      if (productId) {
        removeItemFromCart(productId, size);
        await renderCartItems();
        CartEmpty();
        updateCartOverall();
        cartAction();
      }
    });
  });
}
// function updateCheckboxStatus(productId: number, isChecked: boolean): void {
//   const item = cart.find((item) => item.productId === productId);
//   if (item) {
//     item.isCheck = isChecked;
//     saveToStorage();
//     updateCartOverall();
//   }
// }
function updateCheckboxStatus(
  productId: number,
  isChecked: boolean,
  size: string = ""
): void {
  const item = cart.find(
    (item) =>
      item.productId === productId && (size ? item.sizeSelected === size : true)
  );
  if (item) {
    item.isCheck = isChecked;
    saveToStorage();
    updateCartOverall();
  }
}
function updateCartOverall() {
  if (!window.location.pathname.includes("Card.html")) {
    return;
  }

  const cartCount = getCartCount();
  let discount = 0;
  let shipping = 0;

  if (cartCount > 0) {
    discount = 10;
    shipping = 25000;
  }

  const totalItem = document.querySelector(".Card__total-value");
  const totalPrice = document.querySelector(".Card__price-value");
  const totaldiscount = document.querySelector(".Card__discount-value");
  const totalAfterDiscount = document.querySelector(
    ".Card__total-after-discount-value"
  );
  const totalShip = document.querySelector(".Card__shipping-value");
  const totalOverall = document.querySelector(".Card__total-price-value");
  const totalItemHeader = document.querySelector(".Card__title-count-number");
  const isCheck = document.querySelectorAll(
    ".Card__item-checkbox"
  ) as NodeListOf<HTMLInputElement>;

  if (
    !totalItem ||
    !totalPrice ||
    !totaldiscount ||
    !totalAfterDiscount ||
    !totalShip ||
    !totalOverall ||
    !totalItemHeader
  ) {
    console.log("Cart elements not found");
    return;
  }

  isCheck.forEach((checkbox) => {
    const productId = parseInt(checkbox.dataset.productId || "0");
    const item = cart.find(
      (item) =>
        item.productId === productId &&
        item.sizeSelected === checkbox.dataset.size
    );
    if (item) {
      checkbox.checked = item.isCheck;
    }
  });

  const total = cart.reduce((acc, item) => {
    const product = products.find((p) => p.id === item.productId);
    if (product && item.isCheck) {
      return acc + product.price * item.quantity;
    }
    return acc;
  }, 0);

  totalItem.innerHTML = cartCount.toString();
  totalItemHeader.innerHTML = cartCount.toString();
  totalPrice.innerHTML = `${total.toLocaleString("vi-VN")} đ`;
  totaldiscount.innerHTML = `${discount}%`;
  totalAfterDiscount.innerHTML = `${(
    total -
    (total * discount) / 100
  ).toLocaleString("vi-VN")} đ`;
  totalShip.innerHTML = `${shipping.toLocaleString("vi-VN")} đ`;
  totalOverall.innerHTML = `${(
    total -
    (total * discount) / 100 +
    shipping
  ).toLocaleString("vi-VN")} đ`;
}
function checkCartEmpty(): boolean {
  return cart.length === 0;
}
function CartEmpty() {
  const cartContainer = document.querySelector(".Card") as HTMLElement;
  const cartEmpty = document.querySelector(".Card__empty") as HTMLElement;
  if (!cartContainer || !cartEmpty) return;
  if (checkCartEmpty()) {
    cartContainer.style.display = "none";
    cartEmpty.style.display = "flex";
  } else {
    cartContainer.style.display = "flex";
    cartEmpty.style.display = "none";
  }
}

export {
  removeFromCart,
  removeItemFromCart,
  getCartData,
  clearCart,
  updateCartDisplay,
  initCart,
};

document.addEventListener("DOMContentLoaded", async () => {
  products = await loadProducts();
  console.log("Products loaded:", products.length);

  setupHeader();
  await setupNewProductsSection();
  setupEventListeners();
  // initCart();
  await renderCartItems();
  updateCartOverall();
  cartAction();
  CartEmpty();
  // cartSize();
  // setSizeSelected();
  headerHover();
});

const arrowSVG = () => {
  return `
    <svg
    class="Card__item-content-size-arrow"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M3.76922 5.90104L7.39722 10.521C7.43168 10.5572 7.47311 10.5859 7.51901 10.6056C7.5649 10.6252 7.6143 10.6353 7.66422 10.6353C7.71415 10.6353 7.76355 10.6252 7.80944 10.6056C7.85534 10.5859 7.89677 10.5572 7.93122 10.521L11.5632 5.90104C11.6024 5.85988 11.6287 5.80811 11.6387 5.75216C11.6487 5.69621 11.6421 5.63855 11.6196 5.58635C11.5971 5.53414 11.5598 5.48969 11.5122 5.45852C11.4647 5.42736 11.4091 5.41085 11.3522 5.41104H3.97622C3.91972 5.41162 3.86463 5.4287 3.8177 5.46017C3.77077 5.49163 3.73406 5.53613 3.71207 5.58817C3.69008 5.64022 3.68378 5.69756 3.69393 5.75314C3.70408 5.80872 3.73025 5.86013 3.76922 5.90104Z"
      fill="#161C24"
    />
  </svg>
  
  `;
};
const plusSVG = () => {
  return `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
  >
    <rect width="26" height="26" fill="white" />
    <path
      d="M23.4722 13.3611C23.4722 14.1589 22.8255 14.8056 22.0278 14.8056H4.69444C3.8967 14.8056 3.25 14.1589 3.25 13.3611C3.25 12.5634 3.8967 11.9167 4.69444 11.9167H22.0278C22.8255 11.9167 23.4722 12.5634 23.4722 13.3611Z"
      fill="#003468"
    />
  </svg>
  
  `;
};
const minusSVG = () => {
  return `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
  >
    <rect width="26" height="26" fill="white" />
    <path
      d="M22.0275 14.8056H14.8053V22.0278C14.8053 22.4109 14.6531 22.7783 14.3822 23.0492C14.1114 23.3201 13.744 23.4723 13.3609 23.4723C12.9778 23.4723 12.6104 23.3201 12.3395 23.0492C12.0686 22.7783 11.9164 22.4109 11.9164 22.0278V14.8056H4.6942C4.31111 14.8056 3.94371 14.6534 3.67282 14.3825C3.40194 14.1117 3.24976 13.7443 3.24976 13.3612C3.24976 12.9781 3.40194 12.6107 3.67282 12.3398C3.94371 12.0689 4.31111 11.9167 4.6942 11.9167H11.9164V4.69451C11.9164 4.31142 12.0686 3.94401 12.3395 3.67313C12.6104 3.40224 12.9778 3.25006 13.3609 3.25006C13.744 3.25006 14.1114 3.40224 14.3822 3.67313C14.6531 3.94401 14.8053 4.31142 14.8053 4.69451V11.9167H22.0275C22.4106 11.9167 22.778 12.0689 23.0489 12.3398C23.3198 12.6107 23.472 12.9781 23.472 13.3612C23.472 13.7443 23.3198 14.1117 23.0489 14.3825C22.778 14.6534 22.4106 14.8056 22.0275 14.8056Z"
      fill="#003468"
    />
  </svg>
  
  `;
};
const removeSVG = () => {
  return `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <g clip-path="url(#clip0_4327_4871)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.70825 5.83333C2.70825 5.48815 2.98807 5.20833 3.33325 5.20833H16.6666C17.0118 5.20833 17.2916 5.48815 17.2916 5.83333C17.2916 6.17851 17.0118 6.45833 16.6666 6.45833H3.33325C2.98807 6.45833 2.70825 6.17851 2.70825 5.83333Z"
        fill="#161C24"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.33325 8.54167C8.67843 8.54167 8.95825 8.82149 8.95825 9.16667V14.1667C8.95825 14.5118 8.67843 14.7917 8.33325 14.7917C7.98807 14.7917 7.70825 14.5118 7.70825 14.1667V9.16667C7.70825 8.82149 7.98807 8.54167 8.33325 8.54167Z"
        fill="#161C24"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.6667 8.54167C12.0119 8.54167 12.2917 8.82149 12.2917 9.16667V14.1667C12.2917 14.5118 12.0119 14.7917 11.6667 14.7917C11.3216 14.7917 11.0417 14.5118 11.0417 14.1667V9.16667C11.0417 8.82149 11.3216 8.54167 11.6667 8.54167Z"
        fill="#161C24"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.11488 5.21049C4.45887 5.18183 4.76096 5.43744 4.78962 5.78143L5.62296 15.7814C5.6244 15.7987 5.62512 15.816 5.62512 15.8333C5.62512 16.1096 5.73486 16.3746 5.93021 16.5699C6.12556 16.7653 6.39052 16.875 6.66678 16.875H13.3335C13.6097 16.875 13.8747 16.7653 14.07 16.5699C14.2654 16.3746 14.3751 16.1096 14.3751 15.8333C14.3751 15.816 14.3758 15.7987 14.3773 15.7814L15.2106 5.78143C15.2393 5.43744 15.5414 5.18183 15.8854 5.21049C16.2293 5.23916 16.485 5.54125 16.4563 5.88524L15.6249 15.8614C15.6176 16.459 15.3771 17.0306 14.9539 17.4538C14.5241 17.8836 13.9412 18.125 13.3335 18.125H6.66678C6.05899 18.125 5.4761 17.8836 5.04633 17.4538C4.62318 17.0306 4.3826 16.459 4.37529 15.8614L3.54394 5.88524C3.51528 5.54125 3.77089 5.23916 4.11488 5.21049Z"
        fill="#161C24"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.33333 3.125C8.27808 3.125 8.22509 3.14695 8.18602 3.18602C8.14695 3.22509 8.125 3.27808 8.125 3.33333V5.83333C8.125 6.17851 7.84518 6.45833 7.5 6.45833C7.15482 6.45833 6.875 6.17851 6.875 5.83333V3.33333C6.875 2.94656 7.02865 2.57563 7.30214 2.30214C7.57563 2.02865 7.94656 1.875 8.33333 1.875H11.6667C12.0534 1.875 12.4244 2.02865 12.6979 2.30214C12.9714 2.57563 13.125 2.94656 13.125 3.33333V5.83333C13.125 6.17851 12.8452 6.45833 12.5 6.45833C12.1548 6.45833 11.875 6.17851 11.875 5.83333V3.33333C11.875 3.27808 11.8531 3.22509 11.814 3.18602C11.7749 3.14695 11.7219 3.125 11.6667 3.125H8.33333Z"
        fill="#161C24"
      />
    </g>
    <defs>
      <clipPath id="clip0_4327_4871">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
  
  `;
};
