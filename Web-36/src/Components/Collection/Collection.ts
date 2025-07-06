import './collection.scss';

export function initializeCollection(containerId: string = 'collection-container') {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }

  container.innerHTML = `
    <div class="Collection">
      <div class="Collection__category">
        <div class="Collection__category-title">
          Bộ sưu tập của chúng tôi
        </div>
        <div class="Collection__category-links">
          <div class="Collection__category-links-title">
            ${Divider()}
            <div class="Collection__category-links-title-detail">
              Nhẫn cưới
            </div>
            ${Divider()}
          </div>

          <div class="Collection__category-links-elements">
            Trang sức bạc
          </div>
          <div class="Collection__category-links-elements">
            Trang sức vàng
          </div>
          <div class="Collection__category-links-elements">
            Dây chuyền bạc
          </div>
          <div class="Collection__category-links-elements">
            Dây chuyền vàng
          </div>
          <div class="Collection__category-links-elements">
            Bông tai bạc
          </div>
        </div>
      </div>
      <div class="Collection__explore">
        <div class="Collection__explore-img">
          <div class="first-img"></div>
          <div class="second-img"></div>
        </div>
        <div class="Collection__explore-newest">
          <div class="Collection__explore-newest-content">
            KHÁM PHÁ BỘ SƯU TẬP MỚI NHẤT
          </div>
          ${ArrowIcon()}
        </div>
      </div>
    </div>
  `;
}

const ArrowIcon = () => `
  <svg
    class="Collection__explore-newest-arrow"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clip-path="url(#clip0_5745_2019)">
      <path
        d="M5 12H19"
        stroke="#003468"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 16L19 12"
        stroke="#003468"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 8L19 12"
        stroke="#003468"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_5745_2019">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
`;

const Divider = () => `
  <svg
    class="Collection__category-links-title-img"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="2"
    viewBox="0 0 16 2"
    fill="none"
  >
    <rect width="16" height="2" fill="#003468" />
  </svg>
`;