import React, { useState } from "react";
import "./RestaurantCategory.css";
import ItemList from "../ItemList/ItemList";

const RestaurantCategory = ({ data ,isOpen,setIsOpenInd}) => {
   // State to toggle accordion
   const handleClick = () =>{
     setIsOpenInd()
   }

  return (
    <div className="category">
      <div className="accordion">
        {/* Header with title, arrow, and click functionality */}
        <div className="heading" onClick={handleClick}>
          <span className="title">{data.title} ({data.itemCards.length})</span>
          <span className="arrow">{isOpen ? "⬆" : "⬇"}</span>
        </div>

        {/* Show ItemList when accordion is open */}
        {isOpen  && (
          <div className="content">
            <ItemList Items={data.itemCards} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantCategory;
