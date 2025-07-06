// import './.scss';
import "./Home.scss";
import { initializeHeader } from '../Header/Header.ts';
import { initializeSlides } from '../Slides/Slides.ts';
import { initializeFeatures } from '../Features/Features.ts';
import { initializeCategories } from '../Categories/Categories.ts'
import { initializeCollection } from '../Collection/Collection.ts';
import { initializeShipping } from '../Shipping/Shipping.ts';
import { initializeProduction } from '../Production/Production.ts';
import { initializeBanner } from '../Banner/Banner.ts';
import { initializeTestimonials } from '../Testimonials/Testimonials.ts';
import {initializeFooter} from '../Footer/Footer.ts';
document.addEventListener('DOMContentLoaded', () => {
  initializeHeader('header-container');
  initializeSlides('slides-container');
  initializeFeatures('features-container');
  initializeCategories('categories-container');
  initializeCollection('collection-container');
  initializeShipping('shipping-container');
  initializeProduction('production-container');
  initializeBanner('banner-container');
  initializeTestimonials('testimonials-container');
  initializeFooter('footer-container');
});