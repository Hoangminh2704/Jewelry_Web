export interface ProductItem {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice: number;
  discount: number;
  type: "Necklet" | "Earring" | "Chain" | "Ring";
  isNew?: boolean;
  isSale?: boolean;
  isTop?: boolean;
  isFeatured?: boolean;
  datePublished: string;
  ShortDescription: string;
  Description: string;
  ProductionDetail_1: string;
  ProductionDetail_2: string;

  Material: string;
  Rating: {
    star: number;
    count: number;
  };
  Size: string[];
}
