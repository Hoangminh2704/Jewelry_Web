import './banner.scss';

export function initializeBanner(containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID "${containerId}" not found.`);
    return;
  }

  const bannerHtml = `
    <div class="Banner">
      <div class="Necklet">
        <div class="Necklet-img"></div>
        <div class="Necklet-features">
          <div class="name">Vòng cổ</div>
          <div class="caption">Bộ sưu tập vòng cổ</div>
          <a class="link">
            <div>Xem Thêm</div>
            ${Arrow()}
          </a>
        </div>
      </div>
      <div class="Ring">
        <div class="Ring-img"></div>
        <div class="Ring-features">
          <div class="name">Nhẫn</div>
          <div class="caption">Bộ sưu tập nhẫn</div>
          <a class="link">
            <div>Xem Thêm</div>
            ${Arrow()}
          </a>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = bannerHtml;
}

const Arrow = () => `
  <svg
    class="arrow"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clip-path="url(#clip0_5807_2655)">
      <path
        d="M5 12H19"
        stroke="#003468"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 16L19 12"
        stroke="#003468"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 8L19 12"
        stroke="#003468"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_5807_2655">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
`;