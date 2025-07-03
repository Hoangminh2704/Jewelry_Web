// import React from "react";
import "./Select.scss";
import "../Testimotionals/Testimonials";
import ProductCard from "../ProductCard/ProductCard";
import { products } from "../../Data/ProductData";

const Select = () => {
  return (
    <div className="Select">
      <div className="Select__filter">
        <div className="Select__filter-options">
          <div className="Select__filter-title">Mục lục</div>
          <div className="Select__filter-items">
            <label className="Select__filter-item">
              <span>Vòng cổ</span>
              <input type="checkbox" />
            </label>
            <label className="Select__filter-item">
              <span>Bông tai</span>
              <input type="checkbox" />
            </label>
            <label className="Select__filter-item">
              <span>Dây chuyền</span>
              <input type="checkbox" />
            </label>
            <div className="Select__filter-item">
              <span>Xem thêm</span>
              <span className="Select__filter-arrow">
                <ArrowDown></ArrowDown>
              </span>
              {/* <select name="item" id=""></select> */}
            </div>
          </div>
        </div>
        <Line></Line>
        <div className="Select__filter-price">
          <div className="Select__filter-title">Giá</div>
          <div className="Select__filter-price-inputs">
            <input type="text" placeholder="Từ" />
            <input type="text" placeholder="Đến" />
          </div>
          <button className="Select__filter-search">Tìm kiếm</button>
        </div>
      </div>
      <div className="Select__products">
        <div className="Select__product-sort">
          <div className="Select__product-name">Sắp xếp theo: </div>
          <div className="Select__product-action">
            <span>Được đề xuất</span>
            <span className="Select__product-arrow">
              <ArrowDown></ArrowDown>
            </span>
          </div>
        </div>
        <div className="Select__product-list">
          {products.slice(0, 6).map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
        <div className="Select__product-page"></div>
      </div>
    </div>
  );
};
export default Select;
const ArrowDown = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M11.9773 16.1707L19.17 8.97562C19.4849 8.6599 19.4849 8.14839 19.17 7.83187C18.8551 7.51616 18.3436 7.51616 18.0286 7.83187L11.4066 14.4563L4.78459 7.83267C4.46967 7.51695 3.95816 7.51695 3.64244 7.83267C3.32752 8.14839 3.32752 8.6607 3.64244 8.97641L10.8351 16.1715C11.1468 16.4824 11.6663 16.4824 11.9773 16.1707Z"
        fill="#919EAB"
      />
    </svg>
  );
};
const Line = () => {
  return (
    <svg
      className="line"
      xmlns="http://www.w3.org/2000/svg"
      width="373"
      height="1"
      viewBox="0 0 373 1"
      fill="none"
    >
      <rect x="0.247559" width="371.927" height="1" fill="#E2E7ED" />
    </svg>
  );
};
