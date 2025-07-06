import './categories.scss';
import arrow from "../Home_Image/Arrow-Right.svg";
export function initializeCategories(containerId: string = 'categories-container') {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }

  const categoryData = [
    { title: 'NHẪN CƯỚI', imageClass: 'first', itemClass: 'item1' },
    { title: 'VÒNG CỔ', imageClass: 'second', itemClass: 'item2' },
    { title: 'VÒNG TAY', imageClass: 'third', itemClass: 'item3' },
    { title: 'BÔNG TAI', imageClass: 'four', itemClass: 'item4' },
  ];

  let categoriesHtml = '<div class="categories">';

  categoryData.forEach((category) => {
    categoriesHtml += `
      <div class="categories__item ${category.itemClass}">
        <div class="categories__item-image ${category.imageClass}"></div>
        <div class="categories__item-text">
          <a class="categories__item-text-link">${category.title}</a>
          <div class="categories__item-text-arrow">
            <img src="${arrow}" alt="" />
          </div>
        </div>
      </div>
    `;
  });

  categoriesHtml += '</div>';
  container.innerHTML = categoriesHtml;
}