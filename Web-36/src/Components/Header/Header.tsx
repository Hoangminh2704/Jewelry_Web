import React, { useEffect } from "react";
import "./header.scss";
import logo from "../Payment/Logo.png";
import { createRoot } from "react-dom/client";
import { Link } from "react-router-dom";

const menuItems = [
  { label: "Trang chủ", href: "/", active: true },
  { label: "Sản phẩm", href: "products" },
  { label: "Giới thiệu", href: "#" },
  { label: "Liên hệ", href: "#" },
];

const Header = () => {
  useEffect(() => {
    const hamburgerButtons = document.querySelectorAll(
      ".header-hamberger-mobile"
    ) as NodeListOf<HTMLElement>;

    const menu = document.querySelector(".open") as HTMLElement | null;

    const handleToggle = (event: Event) => {
      event.preventDefault();
      const button = event.currentTarget as HTMLElement;
      button.classList.toggle("is-active");
      menu?.classList.toggle("oppenned");
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isClickInsideMenu = menu?.contains(target);
      const isClickOnHamburger = Array.from(hamburgerButtons).some((button) =>
        button.contains(target)
      );
      if (!isClickInsideMenu && !isClickOnHamburger) {
        menu?.classList.remove("oppenned");
        hamburgerButtons.forEach((btn) => btn.classList.remove("is-active"));
      }
    };

    hamburgerButtons.forEach((btn) =>
      btn.addEventListener("click", handleToggle)
    );
    document.addEventListener("click", handleClickOutside);

    const menuLinks = document.querySelectorAll(".header--sub-menu li a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menu?.classList.remove("oppenned");
        hamburgerButtons.forEach((btn) => btn.classList.remove("is-active"));
      });
    });

    return () => {
      hamburgerButtons.forEach((btn) =>
        btn.removeEventListener("click", handleToggle)
      );
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="header">
      <div className="header--wrapper">
        <button
          title="hamburger"
          type="button"
          className="header-hamberger-mobile header-hamberger-mobile--htx"
        >
          <span className="header-hamberger-mobile-line"></span>
        </button>

        <div className="header--logo">
          <img src={logo} alt="Logo" />
        </div>

        <nav className="header--sub-menu open">
          <ul className="header--menu">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.href}
                  className={`header--menu-link${item.active ? " active" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header--right">
          <div className="header--search_bar">
            <SearchIcon />
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="header--search-input"
            />
          </div>

          <Divider />

          <div className="header--search-cart">
            <CartIcon />
            <p className="header--search-cart-counting">0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

const SearchIcon = () => (
  <svg
    className="header--search-icon"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 3.75C6.55 3.75 3.75 6.55 3.75 10s2.8 6.25 6.25 6.25S16.25 13.45 16.25 10 13.45 3.75 10 3.75ZM2.25 10C2.25 5.72 5.72 2.25 10 2.25s7.75 3.47 7.75 7.75S14.28 17.75 10 17.75 2.25 14.28 2.25 10Z"
      fill="var(--my-color)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.47 14.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06Z"
      fill="var(--my-color)"
    />
  </svg>
);

const Divider = () => (
  <svg
    className="header--search-column"
    xmlns="http://www.w3.org/2000/svg"
    width="1"
    height="16"
    viewBox="0 0 1 16"
    fill="none"
  >
    <path d="M1 16H0V0H1V16Z" fill="#E2E7ED" />
  </svg>
);

const CartIcon = () => (
  <svg
    className="header--search-cart-icon"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="#161C24"
  >
    <g clipPath="url(#clip0_5628_1274)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 17.75C5.30964 17.75 4.75 18.3096 4.75 19C4.75 19.6904 5.30964 20.25 6 20.25C6.69036 20.25 7.25 19.6904 7.25 19C7.25 18.3096 6.69036 17.75 6 17.75ZM3.25 19C3.25 17.4812 4.48122 16.25 6 16.25C7.51878 16.25 8.75 17.4812 8.75 19C8.75 20.5188 7.51878 21.75 6 21.75C4.48122 21.75 3.25 20.5188 3.25 19Z"
        fill="#161C24"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 17.75C16.3096 17.75 15.75 18.3096 15.75 19C15.75 19.6904 16.3096 20.25 17 20.25C17.6904 20.25 18.25 19.6904 18.25 19C18.25 18.3096 17.6904 17.75 17 17.75ZM14.25 19C14.25 17.4812 15.4812 16.25 17 16.25C18.5188 16.25 19.75 17.4812 19.75 19C19.75 20.5188 18.5188 21.75 17 21.75C15.4812 21.75 14.25 20.5188 14.25 19Z"
        fill="#161C24"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.25 3C3.25 2.58579 3.58579 2.25 4 2.25H6C6.41421 2.25 6.75 2.58579 6.75 3V16.25H17C17.4142 16.25 17.75 16.5858 17.75 17C17.75 17.4142 17.4142 17.75 17 17.75H6C5.58579 17.75 5.25 17.4142 5.25 17V3.75H4C3.58579 3.75 3.25 3.41421 3.25 3Z"
        fill="#161C24"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.25194 4.9466C5.28145 4.53344 5.64031 4.22243 6.05347 4.25194L20.0535 5.25194C20.261 5.26676 20.4531 5.36717 20.5838 5.52914C20.7144 5.69111 20.7719 5.90009 20.7425 6.1061L19.7425 13.1061C19.6897 13.4756 19.3733 13.75 19 13.75H6.00003C5.58582 13.75 5.25003 13.4142 5.25003 13C5.25003 12.5858 5.58582 12.25 6.00003 12.25H18.3496L19.1437 6.69078L5.9466 5.74813C5.53344 5.71861 5.22243 5.35976 5.25194 4.9466Z"
        fill="#161C24"
      />
    </g>
    <defs>
      <clipPath id="clip0_5628_1274">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<Header />);
}
