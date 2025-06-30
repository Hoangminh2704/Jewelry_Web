import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import ProductListPage from "../pages/Product/ProductListPage";
import ProductDetailPage from "../pages/Product/ProductDetailPage";
import CartPage from "../pages/Cart/CartPage";
import AboutPage from "../pages/About/AboutPage";
import ContactPage from "../pages/Contact/ContactPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
