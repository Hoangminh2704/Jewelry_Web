export interface ProductItem {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice: number;
  discount: number;
  type: "Necklet" | "Earring" | "Chain";
  isNew?: boolean;
  isSale?: boolean;
  isTop?: boolean;
  isFeatured?: boolean;
  datePublished: string;
  ShortDescription: string;
  Description: string;
  Material: string;
  Rating: {
    star: number;
    count: number;
  };
  Size: string[];
}
