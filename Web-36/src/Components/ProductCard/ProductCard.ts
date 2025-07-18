import type { ProductItem } from "../../Data/ProductDataType";
import "./ProductCard.scss";
import { addToCart as addToCartCount } from "../Card/Card";
let products: ProductItem[] = [];

async function loadProducts(): Promise<ProductItem[]> {
  try {
    const response = await fetch("../../Data/ProductData.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const productsData = await response.json();
    return productsData;
  } catch (error) {
    console.error(error);
    return [];
  }
}
export function createProductCardHtml(product: ProductItem): string {
  let badgeHtml = "";
  if (product.isSale) {
    badgeHtml = '<div class="product-badge sale-badge">Sale</div>';
  } else if (product.isNew) {
    badgeHtml = '<div class="product-badge new-badge">New</div>';
  }
  return `
    <div class="Production__card">
      ${badgeHtml}

      <img class="Production__card-image" src=${product.image} alt="">
      

      <div class="Production__card-information">
        <div class="Production__card-text">
          <div class="Production__card-name">${product.name}</div>
          <div class="Production__card-price">${convertPriceToString(
            product.price
          )} </div>
          <div class="Production__card-discount">
            <span class="Production__card-discount-old">
              ${convertPriceToString(product.oldPrice)}
            </span>
            <span class="Production__card-discount-percent">
              (${product.discount}%)
            </span>
          </div>
        </div>
        <div class="Production__card-select">
          <div class="Production__card-select-watch">
            <div class="icon">
              ${EyeLine()}
            </div>
            <p class="text">Xem</p>
          </div>
          <div class="Production__card-select-more" data-product-id="${
            product.id
          }">
            <div class="icon">
              ${CartLine()}
            </div>
            <p class="text">Thêm</p>
          </div>
        </div>
      </div>
    </div>
  `;
}
export function linkToProductDetail() {
  const linkToProductDetail = document.querySelectorAll(
    ".Production__card-select-watch"
  ) as NodeListOf<HTMLElement>;
  linkToProductDetail.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const productDetailPageUrl =
        "/src/Components/ProductionDetail/ProductionDetail.html";
      window.location.href = productDetailPageUrl;
    });
  });
}
export function deleteBadge() {
  const badges = document.querySelectorAll(".product-badge");
  badges.forEach((badge) => {
    badge.remove();
  });
}
export function convertPriceToString(price: number): string {
  return price.toLocaleString("vi-VN") + " đ";
}

export async function addToCart() {
  if (products.length === 0) {
    products = await loadProducts();
  }

  const addToCartButtons = document.querySelectorAll(
    ".Production__card-select-more"
  ) as NodeListOf<HTMLElement>;

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const button = event.currentTarget as HTMLElement;
      const productId = button.dataset.productId;

      if (productId) {
        const id = parseInt(productId);
        // addToCartCount(id);
        // showAddToCartNotification(id);
        showProductSelector(id);
      }
    });
  });
}

function createNotificationHtml(
  product: ProductItem,
  quantity: number = 1,
  size: string
): string {
  return `
    <div class="add-to-cart-notification" id="cartNotification" data-product-id="${
      product.id
    }">
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
}

function showAddToCartNotification(
  productId: number,
  quantity: number = 1,
  size: string
) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const notificationHtml = createNotificationHtml(product, quantity, size);
  const existingNotification = document.getElementById("cartNotification");
  if (existingNotification) {
    existingNotification.remove();
  }
  document.body.insertAdjacentHTML("beforeend", notificationHtml);

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
function createSelectorHtml(product: ProductItem): string {
  return `
        <div class="Product__option">
        <div class="Product__option-header">Thêm vào giỏ hàng</div>
        <div class="Product__option-line"></div>
        <div class="Product__option-item">
          <img
            class="Product__option-img"
            src="${product.image}"
            alt=""
          />

          <div class="Product__option-info">
            <div class="Product__option-name">
              ${product.name}
            </div>
            <div class="Product__option-oldPrice">${convertPriceToString(
              product.oldPrice
            )}</div>
            <div class="Product__option-Price">${convertPriceToString(
              product.price
            )}</div>
          </div>
          <div class="Product__option-quantity">
            <div class="Product__option-count">
              <div class="Product__option-count-label">Số lượng:</div>
              <div class="Product__option-count-value">
                <div
                  class="Product__option-count-value-minus"
                  data-product-id="${product.id}"
                >
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
                </div>
                <div class="Product__option-count-value-number">0</div>
                <div
                  class="Product__option-count-value-plus"
                  data-product-id="${product.id}"
                >
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
                </div>
              </div>
            </div>
            <div class="Product__option-size">
              <div class="Product__option-size-label">Kích thước:</div>
              <div class="Product__option-size-value" data-product-id="${
                product.id
              }">
                
                ${product.Size.map((item) => {
                  return `<div class="Product__option-size-item">${item}</div>`;
                }).join("")}
              </div>
            </div>
          </div>
        </div>
        <div class="Product__option-button">
          <button class="Product__option-button-cancel">Hủy</button>
          <button class="Product__option-button-add">Thêm vào giỏ hàng</button>
        </div>
      </div>
  `;
}
function showProductSelector(productId: number) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;
  const existingSelector = document.querySelector(".Product__option");
  if (existingSelector) {
    existingSelector.remove();
  }
  const selectorHtml = createSelectorHtml(product);
  document.body.insertAdjacentHTML("beforeend", selectorHtml);
  setupSelectorEvent(productId);
}

function setupSelectorEvent(productId: number) {
  const selector = document.querySelector(".Product__option") as HTMLElement;
  if (!selector) return;
  const cancelButton = selector.querySelector(
    ".Product__option-button-cancel"
  ) as HTMLButtonElement;
  if (cancelButton) {
    cancelButton.addEventListener("click", () => {
      selector.remove();
    });
  }
  const addButton = selector.querySelector(
    ".Product__option-button-add"
  ) as HTMLButtonElement;
  if (addButton) {
    addButton.addEventListener("click", () => {
      const quantity = getSelectedQuantity();
      const size = getSelectedSize();
      for (let i = 0; i < quantity; i++) {
        addToCartCount(productId, size);
      }
      showAddToCartNotification(productId, quantity, size);
      selector.remove();
    });
  }

  const minusButton = selector.querySelector(
    ".Product__option-count-value-minus"
  ) as HTMLElement;
  const plusButton = selector.querySelector(
    ".Product__option-count-value-plus"
  ) as HTMLElement;
  const quantityDisplay = selector.querySelector(
    ".Product__option-count-value-number"
  ) as HTMLElement;

  let currentQuantity = 1;
  quantityDisplay.textContent = currentQuantity.toString();

  if (minusButton) {
    minusButton.addEventListener("click", () => {
      if (currentQuantity > 1) {
        currentQuantity--;
        quantityDisplay.textContent = currentQuantity.toString();
      }
    });
  }

  if (plusButton) {
    plusButton.addEventListener("click", () => {
      currentQuantity++;
      quantityDisplay.textContent = currentQuantity.toString();
    });
  }

  const sizeItems = selector.querySelectorAll(
    ".Product__option-size-item"
  ) as NodeListOf<HTMLElement>;
  sizeItems.forEach((item) => {
    item.addEventListener("click", () => {
      sizeItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
    });
  });

  if (sizeItems.length > 0) {
    sizeItems[0].classList.add("active");
  }
}

function getSelectedQuantity(): number {
  const quantityDisplay = document.querySelector(
    ".Product__option-count-value-number"
  ) as HTMLElement;
  return parseInt(quantityDisplay?.textContent || "1");
}

function getSelectedSize(): string {
  const activeSize = document.querySelector(
    ".Product__option-size-item.active"
  ) as HTMLElement;
  return activeSize?.textContent || "0";
}
document.addEventListener("DOMContentLoaded", async () => {
  products = await loadProducts();
  await addToCart();
});
const CartLine = () => `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <g clip-path="url(#clip0_4316_4014)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.00016 14.7917C4.42487 14.7917 3.9585 15.2581 3.9585 15.8334C3.9585 16.4087 4.42487 16.8751 5.00016 16.8751C5.57546 16.8751 6.04183 16.4087 6.04183 15.8334C6.04183 15.2581 5.57546 14.7917 5.00016 14.7917ZM2.7085 15.8334C2.7085 14.5678 3.73451 13.5417 5.00016 13.5417C6.26582 13.5417 7.29183 14.5678 7.29183 15.8334C7.29183 17.0991 6.26582 18.1251 5.00016 18.1251C3.73451 18.1251 2.7085 17.0991 2.7085 15.8334Z"
        fill="#161C24"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.1667 14.7917C13.5914 14.7917 13.125 15.2581 13.125 15.8334C13.125 16.4087 13.5914 16.8751 14.1667 16.8751C14.742 16.8751 15.2083 16.4087 15.2083 15.8334C15.2083 15.2581 14.742 14.7917 14.1667 14.7917ZM11.875 15.8334C11.875 14.5678 12.901 13.5417 14.1667 13.5417C15.4323 13.5417 16.4583 14.5678 16.4583 15.8334C16.4583 17.0991 15.4323 18.1251 14.1667 18.1251C12.901 18.1251 11.875 17.0991 11.875 15.8334Z"
        fill="#161C24"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.7085 2.5C2.7085 2.15482 2.98832 1.875 3.3335 1.875H5.00016C5.34534 1.875 5.62516 2.15482 5.62516 2.5V13.5417H14.1668C14.512 13.5417 14.7918 13.8215 14.7918 14.1667C14.7918 14.5118 14.512 14.7917 14.1668 14.7917H5.00016C4.65498 14.7917 4.37516 14.5118 4.37516 14.1667V3.125H3.3335C2.98832 3.125 2.7085 2.84518 2.7085 2.5Z"
        fill="#161C24"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.37662 4.12225C4.40121 3.77794 4.70026 3.51877 5.04456 3.54336L16.7112 4.3767C16.8842 4.38905 17.0443 4.47272 17.1531 4.6077C17.262 4.74267 17.3099 4.91682 17.2854 5.0885L16.4521 10.9218C16.4081 11.2297 16.1444 11.4584 15.8334 11.4584H5.00003C4.65485 11.4584 4.37503 11.1786 4.37503 10.8334C4.37503 10.4883 4.65485 10.2084 5.00003 10.2084H15.2913L15.9531 5.57573L4.9555 4.79019C4.6112 4.76559 4.35202 4.46655 4.37662 4.12225Z"
        fill="#161C24"
      />
    </g>
    <defs>
      <clipPath id="clip0_4316_4014">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
`;

const EyeLine = () => `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <g clip-path="url(#clip0_4316_4011)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.0002 8.95825C9.42487 8.95825 8.9585 9.42462 8.9585 9.99992C8.9585 10.5752 9.42487 11.0416 10.0002 11.0416C10.5755 11.0416 11.0418 10.5752 11.0418 9.99992C11.0418 9.42462 10.5755 8.95825 10.0002 8.95825ZM7.7085 9.99992C7.7085 8.73427 8.73451 7.70825 10.0002 7.70825C11.2658 7.70825 12.2918 8.73427 12.2918 9.99992C12.2918 11.2656 11.2658 12.2916 10.0002 12.2916C8.73451 12.2916 7.7085 11.2656 7.7085 9.99992Z"
        fill="#161C24"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.39008 10.0001C4.50907 13.5565 7.05093 15.2084 9.99984 15.2084C12.9487 15.2084 15.4906 13.5565 17.6096 10.0001C15.4906 6.44368 12.9487 4.79175 9.99984 4.79175C7.05093 4.79175 4.50907 6.44368 2.39008 10.0001ZM1.12386 9.68998C3.41413 5.68222 6.3665 3.54175 9.99984 3.54175C13.6332 3.54175 16.5855 5.68222 18.8758 9.68998C18.9856 9.88213 18.9856 10.118 18.8758 10.3102C16.5855 14.3179 13.6332 16.4584 9.99984 16.4584C6.3665 16.4584 3.41413 14.3179 1.12386 10.3102C1.01405 10.118 1.01405 9.88213 1.12386 9.68998Z"
        fill="#161C24"
      />
    </g>
    <defs>
      <clipPath id="clip0_4316_4011">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
`;
