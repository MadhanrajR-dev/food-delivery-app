import React, { useState, useContext, useEffect, useMemo } from "react";
import "./fooddisplay.css";
import { StoreContext } from "../../../context/StoreContext.jsx";
import Fooditem from "../../fooditem/Fooditem.jsx";

const Fooddisplay = ({ category }) => {
  const { food_list, searchQuery } = useContext(StoreContext);
  const filterFood = useMemo(() => {
  const lowerQuery = String(searchQuery || "")
      .trim()
      .toLowerCase();
    if (!lowerQuery) {
      return category === "All"
        ? food_list
        : food_list.filter((item) => item.category === category);
    }
    return food_list.filter((item) =>
      item.name.toLowerCase().includes(lowerQuery)
    );
  }, [food_list, searchQuery, category]);

  return (
    <div className=" w-full mt-[20px] p-[20px]" id="food-display">
      <h2 className="text-[max(2vw,24px)] font-semibold">Top dishes near</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mt-[30px] gap-[30px] row-gap-[50px]">
        {filterFood.map((item, index) => (
          <Fooditem
            key={index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Fooddisplay;
