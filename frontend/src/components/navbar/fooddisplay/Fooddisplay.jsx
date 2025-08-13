import React, { useState,useContext, useEffect, useMemo } from "react";
import "./fooddisplay.css";
import { StoreContext } from "../../../context/StoreContext.jsx";
import Fooditem from "../../fooditem/Fooditem.jsx";

const Fooddisplay = ({ category ,setCategory}) => {
  const { food_list ,searchQuery,addRecentSearches} = useContext(StoreContext);
  const [loading, setLaoding] = useState(true);
 
  const filterFood = useMemo(()=>{
  if(!searchQuery && !searchQuery.trim()){
    return food_list;
  }
 const lowerQuery = String(searchQuery).toLowerCase();
 if(!lowerQuery){
  return category === "All"
  ? food_list : food_list.filter(item=>item.category === category)

 }
  return food_list
  .filter((item)=>item.name.toLowerCase().includes(lowerQuery))
  .sort((a,b)=>{
    const aMatch = a.name.toLowerCase().startsWith(lowerQuery);
    const bMatch = b.name.toLowerCase().startsWith(lowerQuery)

    return bMatch-aMatch;
  })
  },[food_list,searchQuery,category,addRecentSearches])

  useEffect(() => {
    setInterval(() => setLaoding(false), 4000);
  }, []);

 return (
  <>
    {loading ? (
      <div className="mt-[30px] p-[30px]">
        
        <div className="h-6 bg-gray-300 rounded w-48 animate-pulse"></div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mt-[30px] gap-[30px] row-gap-[50px]">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="flex flex-col gap-3 animate-pulse">
              <div className="w-full h-[200px] bg-gray-300 rounded-lg"></div>
              <div className="h-4 bg-gray-300 rounded w-6"></div>
            
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="mt-[30px] p-[30px]" id="food-display">
        <h2 className="text-[max(2vw,24px)] font-semibold">
          Top dishes near
        </h2>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mt-[30px] gap-[30px] row-gap-[50px]">
          
          {filterFood.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <Fooditem 
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
          })}
        </div>
      </div>
    )}
  </>
);

};

export default Fooddisplay;
