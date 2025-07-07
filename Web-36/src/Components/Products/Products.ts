// src/pages/home/home.ts
// import './.scss';
import "./Products.scss";
// import { initializeHeader } from '../Header/Header.ts';
// import { initializeBanner } from '../Banner/Banner.ts';
// import {initializeFooter} from '../Footer/Footer.ts';
import { initializeSelect } from "../Select/Select.ts";
import { initializeIntroduction } from "../Introduction/Introduction";
document.addEventListener("DOMContentLoaded", () => {
  // initializeHeader('header-container');
  initializeIntroduction("introduction-container");
  initializeSelect("select-container");
  // initializeBanner('banner-container');
  // initializeFooter('footer-container');
});
