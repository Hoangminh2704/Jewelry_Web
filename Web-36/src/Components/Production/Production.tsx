import React from "react";
import "./Production.scss";
function Production() {
  return (
    <div className="Production">
      <div className="Production__header">
        <div className="Production__header-caption">
          Sản phẩm nổi bật trong tháng
        </div>
        <div className="Production__header-detail">
          Mua sắm ngay các sản phẩm bán chạy nhất của tháng, có thể bạn cũng sẽ
          thích những mặt hàng này, <br /> hãy thêm chúng vào giỏ hàng của bạn
          ngay bây giờ.
        </div>
      </div>
      <div className="Production__items">
        <div className="Production__top1">
          <div className="Production__top1-infomation">
            <div className="Production-image"></div>
            <div className="Production-price">
              <div className="Name">
                Nhẫn cưới Kim cương, Chung Đôi Vàng trắng
              </div>
              <div className="Price">15.000.000 đ</div>
              <div className="Discount">
                <span className="Discount-old">22.000.000 đ </span>

                <span className="Discount-percent">(-15%)</span>
              </div>
            </div>
          </div>
          <button
            className="Production__top1-button"
            title="Production__top1-button"
          >
            XEM THÊM
          </button>
        </div>
        <div className="Production__others"></div>
      </div>
    </div>
  );
}
export default Production;
