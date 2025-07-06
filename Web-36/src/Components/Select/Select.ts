import "./Select.scss";
import { createProductCardHtml } from '../ProductCard/ProductCard'; 
import { products } from '../../Data/ProductData';

function ArrowDown(): string {
  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M11.9773 16.1707L19.17 8.97562C19.4849 8.6599 19.4849 8.14839 19.17 7.83187C18.8551 7.51616 18.3436 7.51616 18.0286 7.83187L11.4066 14.4538C11.1079 14.7525 10.6129 14.7525 10.3142 14.4538L3.69223 7.83187C3.37731 7.51616 2.8658 7.51616 2.55088 7.83187C2.23596 8.14839 2.23596 8.6599 2.55088 8.97562L9.74381 16.1707C10.4578 16.8906 11.2633 16.8906 11.9773 16.1707Z"
        fill="#161C24"
      />
    </svg>
  `;
}

function getCardCount(): number {
  if (window.matchMedia("(min-width: 1280px)").matches) {
    return 9;
  } else if (
    window.matchMedia("(min-width: 768px) and (max-width: 1279px)").matches
  ) {
    return 6;
  } else {
    return 6;
  }
}

function renderProductList(count: number): string {
  return products.slice(0, count).map(product => createProductCardHtml(product)).join('');
}

export function initializeSelect(containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }

  let currentCardCount = getCardCount(); 

  const renderSelectComponent = () => {
    const selectHtml = `
      <div class="Select">
        <div class="Select__filter">
          <div class="Select__filter-options">
            <div class="Select__filter-title">Mục lục</div>
            <div class="Select__filter-items">
              <label class="Select__filter-item">
                <span>Vòng cổ</span>
                <input type="checkbox" />
              </label>
              <label class="Select__filter-item">
                <span>Bông tai</span>
                <input type="checkbox" />
              </label>
              <label class="Select__filter-item">
                <span>Dây chuyền</span>
                <input type="checkbox" />
              </label>
              <div class="Select__filter-item">
                <span>Xem thêm</span>
                <span class="Select__filter-arrow">
                  ${ArrowDown()}
                </span>
                </div>
            </div>
          </div>
          <div class="Select__divider"></div> <div class="Select__filter-price">
            <div class="Select__filter-title">Giá</div>
            <div class="Select__filter-price-inputs">
              <input type="text" placeholder="Từ" />
              <input type="text" placeholder="Đến" />
            </div>
            <button class="Select__filter-search">Tìm kiếm</button>
          </div>
        </div>
        <div class="Select__products">
          <div class="Select__product-sort">
            <div class="Select__product-name">Sắp xếp theo: </div>
            <div class="Select__product-action">
              <span>Được đề xuất</span>
              <span class="Select__product-arrow">
                ${ArrowDown()}
              </span>
            </div>
          </div>
          <div class="Select__product-list">
            ${renderProductList(currentCardCount)}
          </div>
          <div class="Select__product-page"></div>
        </div>
      </div>
    `;
    container.innerHTML = selectHtml;
  };

  renderSelectComponent();

  window.addEventListener('resize', () => {
    const newCardCount = getCardCount();
    if (newCardCount !== currentCardCount) {
      currentCardCount = newCardCount;
      const productListElement = container.querySelector('.Select__product-list');
      if (productListElement) {
        productListElement.innerHTML = renderProductList(currentCardCount);
      }
    }
  });
}