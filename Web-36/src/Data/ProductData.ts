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
  isFeatured?: boolean;
}

export const products: ProductItem[] = [
  {
    id: 1,
    name: "Nhẫn Kim Cương Đôi Vàng Trắng",
    image: "../../assets/Product1.png",
    price: "19.000.000 đ",
    oldPrice: "22.000.000 đ",
    discount: "(-15%)",
    isTop: true,
    isFeatured: true,
  },
  {
    id: 2,
    name: "Nhẫn Kim Cương Đôi Vàng Trắng",
    image: "../../assets/Product2.png",
    price: "5.500.000 đ",
    oldPrice: "7.000.000 đ",
    discount: "(-21%)",
    isNew: true,
    isFeatured: true,
  },
  {
    id: 3,
    name: "Nhẫn Kim Cương Đôi Vàng Trắng",
    image: "../../assets/Product2.png",
    price: "9.900.000 đ",
    oldPrice: "12.000.000 đ",
    discount: "(-17%)",
    isSale: true,
    isFeatured: true,
  },
  {
    id: 4,
    name: "Nhẫn Kim Cương Đôi Vàng Trắng",
    image: "../../assets/Product2.png",
    price: "6.000.000 đ",
    oldPrice: "8.000.000 đ",
    discount: "(-25%)",
    isNew: true,
    isFeatured: true,
  },
  {
    id: 5,
    name: "Nhẫn Kim Cương Đôi Vàng Trắng",
    image: "../../assets/Product2.png",
    price: "4.200.000 đ",
    oldPrice: "6.000.000 đ",
    discount: "(-30%)",
    isSale: true,
    isFeatured: true,
  },
  {
    id: 6,
    name: "Nhẫn Kim Cương Đôi Vàng Trắng",
    image: "../../assets/Product2.png",
    price: "3.500.000 đ",
    oldPrice: "4.500.000 đ",
    discount: "(-22%)",
  },
  {
    id: 7,
    name: "Nhẫn Kim Cương Đôi Vàng Trắng",
    image: "../../assets/Product2.png",
    price: "3.500.000 đ",
    oldPrice: "4.500.000 đ",
    discount: "(-22%)",
  },
  {
    id: 8,
    name: "Nhẫn Kim Cương Đôi Vàng Trắng",
    image: "../../assets/Product2.png",
    price: "3.500.000 đ",
    oldPrice: "4.500.000 đ",
    discount: "(-22%)",
  },
  {
    id: 9,
    name: "Nhẫn Kim Cương Đôi Vàng Trắng",
    image: "../../assets/Product2.png",
    price: "3.500.000 đ",
    oldPrice: "4.500.000 đ",
    discount: "(-22%)",
  },
];
