import "./Introduction.scss";

function MoreIcon(): string {
  return `
     <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M11.1776 7.61931L6.38085 2.82415C6.17037 2.61421 5.82936 2.61421 5.61835 2.82415C5.40788 3.0341 5.40787 3.37511 5.61835 3.58505L10.0346 7.99974L5.61888 12.4144C5.40841 12.6244 5.40841 12.9654 5.61888 13.1759C5.82936 13.3858 6.1709 13.3858 6.38138 13.1759L11.1781 8.38074C11.3854 8.17297 11.3854 7.8266 11.1776 7.61931Z"
        fill="white"
      />
    </svg>
  `;
}

export function initializeIntroduction(containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }

  const introductionHtml = `
    <div class="Introduction">
      <div class="Introduction__link">
        <div class="Introduction__link-name">Sản phẩm</div>
        <div class="Introduction__link-path">
          <p class="Introduction__link-path-from">Trang chủ</p>
          ${MoreIcon()}
          <p class="Introduction__link-path-to">Sản phẩm</p>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = introductionHtml;
}