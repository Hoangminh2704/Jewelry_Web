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
          <ProductionTop />
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
        <div className="Production__others">
          <div className="Production__card">
            <div className="Production__card-image"></div>
            <div className="Production__card-information">
              <div className="Production__card-text">
                <div className="Production__card-name">
                  Nhẫn cưới Kim cương, Chung Đôi Vàng trắng
                </div>
                <div className="Production__card-price">15.000.000 đ</div>
                <div className="Production__card-discount">
                  <span className="Production__card-discount-old">
                    22.000.000 đ{" "}
                  </span>
                  <span className="Production__card-discount-percent">
                    (-15%)
                  </span>
                </div>
              </div>
              <div className="Production__card-select">
                <div className="Production__card-select-watch">
                  <div className="icon">
                    <EyeLine></EyeLine>
                  </div>
                  <p className="text">Xem</p>
                </div>
                <div className="Production__card-select-more">
                  <div className="icon">
                    <CartLine></CartLine>
                  </div>
                  <p className="text">Thêm</p>
                </div>
              </div>
            </div>
          </div>
          <div className="Production__card">
            <div className="Production__card-image"></div>
            <div className="Production__card-information">
              <div className="Production__card-text">
                <div className="Production__card-name">
                  Nhẫn cưới Kim cương, Chung Đôi Vàng trắng
                </div>
                <div className="Production__card-price">15.000.000 đ</div>
                <div className="Production__card-discount">
                  <span className="Production__card-discount-old">
                    22.000.000 đ{" "}
                  </span>
                  <span className="Production__card-discount-percent">
                    (-15%)
                  </span>
                </div>
              </div>
              <div className="Production__card-select">
                <div className="Production__card-select-watch">
                  <div className="icon">
                    <EyeLine></EyeLine>
                  </div>
                  <p className="text">Xem</p>
                </div>
                <div className="Production__card-select-more">
                  <div className="icon">
                    <CartLine></CartLine>
                  </div>
                  <p className="text">Thêm</p>
                </div>
              </div>
            </div>
          </div>
          <div className="Production__card">
            <div className="Production__card-image"></div>
            <div className="Production__card-information">
              <div className="Production__card-text">
                <div className="Production__card-name">
                  Nhẫn cưới Kim cương, Chung Đôi Vàng trắng
                </div>
                <div className="Production__card-price">15.000.000 đ</div>
                <div className="Production__card-discount">
                  <span className="Production__card-discount-old">
                    22.000.000 đ{" "}
                  </span>
                  <span className="Production__card-discount-percent">
                    (-15%)
                  </span>
                </div>
              </div>
              <div className="Production__card-select">
                <div className="Production__card-select-watch">
                  <div className="icon">
                    <EyeLine></EyeLine>
                  </div>
                  <p className="text">Xem</p>
                </div>
                <div className="Production__card-select-more">
                  <div className="icon">
                    <CartLine></CartLine>
                  </div>
                  <p className="text">Thêm</p>
                </div>
              </div>
            </div>
          </div>
          <div className="Production__card">
            <div className="Production__card-image"></div>
            <div className="Production__card-information">
              <div className="Production__card-text">
                <div className="Production__card-name">
                  Nhẫn cưới Kim cương, Chung Đôi Vàng trắng
                </div>
                <div className="Production__card-price">15.000.000 đ</div>
                <div className="Production__card-discount">
                  <span className="Production__card-discount-old">
                    22.000.000 đ{" "}
                  </span>
                  <span className="Production__card-discount-percent">
                    (-15%)
                  </span>
                </div>
              </div>
              <div className="Production__card-select">
                <div className="Production__card-select-watch">
                  <div className="icon">
                    <EyeLine></EyeLine>
                  </div>
                  <p className="text">Xem</p>
                </div>
                <div className="Production__card-select-more">
                  <div className="icon">
                    <CartLine></CartLine>
                  </div>
                  <p className="text">Thêm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Production;

const ProductionTop = () => {
  return (
    <svg
      className="Production__top1-svg"
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="94"
      viewBox="0 0 64 94"
      fill="none"
    >
      <path d="M0 0H64V93.5756L32 60.6265L0 93.5756V0Z" fill="#2B88FB" />
      <path
        d="M22.082 24.7388V25.7748H19.422V34.4968H18.148V25.7748H15.474V24.7388H22.082ZM26.9963 34.6228C26.2776 34.6228 25.6243 34.4595 25.0363 34.1328C24.4576 33.8062 24.0003 33.3442 23.6643 32.7468C23.3376 32.1402 23.1743 31.4402 23.1743 30.6468C23.1743 29.8628 23.3423 29.1722 23.6783 28.5748C24.0236 27.9682 24.4903 27.5062 25.0783 27.1888C25.6663 26.8622 26.3243 26.6988 27.0523 26.6988C27.7803 26.6988 28.4383 26.8622 29.0263 27.1888C29.6143 27.5062 30.0763 27.9635 30.4123 28.5608C30.7576 29.1582 30.9303 29.8535 30.9303 30.6468C30.9303 31.4402 30.7529 32.1402 30.3983 32.7468C30.0529 33.3442 29.5816 33.8062 28.9843 34.1328C28.3869 34.4595 27.7243 34.6228 26.9963 34.6228ZM26.9963 33.5028C27.4536 33.5028 27.8829 33.3955 28.2843 33.1808C28.6856 32.9662 29.0076 32.6442 29.2503 32.2148C29.5023 31.7855 29.6283 31.2628 29.6283 30.6468C29.6283 30.0308 29.5069 29.5082 29.2643 29.0788C29.0216 28.6495 28.7043 28.3322 28.3123 28.1268C27.9203 27.9122 27.4956 27.8048 27.0383 27.8048C26.5716 27.8048 26.1423 27.9122 25.7503 28.1268C25.3676 28.3322 25.0596 28.6495 24.8263 29.0788C24.5929 29.5082 24.4763 30.0308 24.4763 30.6468C24.4763 31.2722 24.5883 31.7995 24.8123 32.2288C25.0456 32.6582 25.3536 32.9802 25.7363 33.1948C26.1189 33.4002 26.5389 33.5028 26.9963 33.5028ZM33.8793 28.2388C34.1313 27.8002 34.5047 27.4362 34.9993 27.1468C35.5033 26.8482 36.0867 26.6988 36.7493 26.6988C37.4307 26.6988 38.0467 26.8622 38.5973 27.1888C39.1573 27.5155 39.596 27.9775 39.9133 28.5748C40.2307 29.1628 40.3893 29.8488 40.3893 30.6328C40.3893 31.4075 40.2307 32.0982 39.9133 32.7048C39.596 33.3115 39.1573 33.7828 38.5973 34.1188C38.0467 34.4548 37.4307 34.6228 36.7493 34.6228C36.096 34.6228 35.5173 34.4782 35.0133 34.1888C34.5187 33.8902 34.1407 33.5215 33.8793 33.0828V38.1368H32.6053V26.8248H33.8793V28.2388ZM39.0873 30.6328C39.0873 30.0542 38.9707 29.5502 38.7373 29.1208C38.504 28.6915 38.1867 28.3648 37.7853 28.1408C37.3933 27.9168 36.9593 27.8048 36.4833 27.8048C36.0167 27.8048 35.5827 27.9215 35.1813 28.1548C34.7893 28.3788 34.472 28.7102 34.2293 29.1488C33.996 29.5782 33.8793 30.0775 33.8793 30.6468C33.8793 31.2255 33.996 31.7342 34.2293 32.1728C34.472 32.6022 34.7893 32.9335 35.1813 33.1668C35.5827 33.3908 36.0167 33.5028 36.4833 33.5028C36.9593 33.5028 37.3933 33.3908 37.7853 33.1668C38.1867 32.9335 38.504 32.6022 38.7373 32.1728C38.9707 31.7342 39.0873 31.2208 39.0873 30.6328ZM45.2527 25.5368V24.3748H47.8847V34.4968H46.5967V25.5368H45.2527Z"
        fill="white"
      />
    </svg>
  );
};
const CartLine = () => {
  return (
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
  );
};
const EyeLine = () => {
  return (
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
  );
};

// const products = [
//   {
//     id: 1,
//     image: "url1.png",
//     name: "Nhẫn cưới Kim cương, Chung Đôi Vàng trắng",
//     price: "15.000.000 đ",
//     oldPrice: "22.000.000 đ",
//     discount: "-15%",
//     isNew: false,
//     isSale: true,
//   },
//   {
//     id: 2,
//     image: "url2.png",
//     name: "Nhẫn cưới Kim cương, Chung Đôi Vàng trắng",
//     price: "15.000.000 đ",
//     oldPrice: "22.000.000 đ",
//     discount: "-15%",
//     isNew: false,
//     isSale: true,
//   },
//   {
//     id: 3,
//     image: "url3.png",
//     name: "Nhẫn cưới Kim cương, Chung Đôi Vàng trắng",
//     price: "15.000.000 đ",
//     oldPrice: "22.000.000 đ",
//     discount: "-15%",
//     isNew: true,
//     isSale: false,
//   },
// ];
