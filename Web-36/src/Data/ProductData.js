export interface ProductItem {
  id: number;
  name: string;
  image: string;
  price: string;
  oldPrice: string;
  discount: string;
  isNew?: boolean;
  isSale?: boolean;
  isTop?: boolean;
  isFeatured?: boolean; // dùng để xác định sản phẩm xuất hiện ở "Production page"
}

export const products: ProductItem[] = [
  {
    id: 1,
    name: "Nhẫn Kim Cương Đôi Vàng Trắng",
    image: "/images/p1.png",
    price: "15.000.000 đ",
    oldPrice: "22.000.000 đ",
    discount: "-15%",
    isTop: true,
    isFeatured: true,
  },
  {
    id: 2,
    name: "Vòng tay ngọc trai tự nhiên",
    image: "/images/p2.png",
    price: "5.500.000 đ",
    oldPrice: "7.000.000 đ",
    discount: "-21%",
    isNew: true,
    isFeatured: true,
  },
  {
    id: 3,
    name: "Dây chuyền vàng trắng 18k",
    image: "/images/p3.png",
    price: "9.900.000 đ",
    oldPrice: "12.000.000 đ",
    discount: "-17%",
    isSale: true,
    isFeatured: true,
  },
  {
    id: 4,
    name: "Bông tai kim cương tự nhiên",
    image: "/images/p4.png",
    price: "6.000.000 đ",
    oldPrice: "8.000.000 đ",
    discount: "-25%",
    isNew: true,
    isFeatured: true,
  },
  {
    id: 5,
    name: "Nhẫn cưới vàng 24K trơn",
    image: "/images/p5.png",
    price: "4.200.000 đ",
    oldPrice: "6.000.000 đ",
    discount: "-30%",
    isSale: true,
    isFeatured: true,
  },
  {
    id: 6,
    name: "Lắc tay phong thủy vàng tây",
    image: "/images/p6.png",
    price: "3.500.000 đ",
    oldPrice: "4.500.000 đ",
    discount: "-22%",
    // Không phải top/new/sale nhưng vẫn featured
  },
  // Các sản phẩm khác...
];
