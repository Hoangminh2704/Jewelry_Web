// import React from "react";
import "./Categories.scss";
import arrow from "../Home_Image/Arrow-Right.svg";

const categoryData = [
  { title: "NHẪN CƯỚI", imageClass: "first", itemClass: "item1" },
  { title: "VÒNG CỔ", imageClass: "second", itemClass: "item2" },
  { title: "VÒNG TAY", imageClass: "third", itemClass: "item3" },
  { title: "BÔNG TAI", imageClass: "four", itemClass: "item4" },
];

const Categories = () => {
  return (
    <div className="categories">
      {categoryData.map((category, index) => (
        <div className={`categories__item ${category.itemClass}`} key={index}>
          <div
            className={`categories__item-image ${category.imageClass}`}
          ></div>
          <div className="categories__item-text">
            <a className="categories__item-text-link">{category.title}</a>
            <div className="categories__item-text-arrow">
              <img src={arrow} alt="" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
