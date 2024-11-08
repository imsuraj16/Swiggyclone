import React, { useState } from "react";
const RestaurantMenuTopPicks = ({ data}) => {
  // console.log(data);
  

    const formattedPrice = (data.dish.info.price) ? data.dish.info.price/100 : data.dish.info.defaultPrice/100
 
  return (
    <>
      <div  className="min-w-[300px] max-w-[400px] max-h-[500px] mt-5 rounded-lg overflow-hidden shadow-lg relative"
        style={{ width: "100%", height: "auto" }} >
        <img className="w-full h-full object-cover"
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${data.creativeId}`}
          alt="Restaurant Top Pick"
        />
      </div>
      <div className="flex items-center justify-between absolute bottom-4 left-2 right-2 p-2 rounded-md">
        <p className="text-white font-semibold">{`₹${formattedPrice}`}</p>
        <button className="px-[40px] py-2 text-green-500 bg-white rounded-md font-bold">Add</button>
      </div>
    </>
  );
};

export default RestaurantMenuTopPicks;
