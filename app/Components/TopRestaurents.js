import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

import { GoDotFill } from "react-icons/go";
import RestaurantCards from "./RestaurantCards";

const TopRestaurents = ({ data }) => {
  // console.log(data);

  const [scroll, setnextScroll] = useState(0);

  function handleNext() {
    scroll < 1700 ? setnextScroll((preVal) => preVal + 425) : "";
  }

  function handlePrev() {
    scroll == 0 ? "" : setnextScroll((preVal) => preVal - 425);
  }

  return (
    <div className="mt-[35px]">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold ">
          Top restaurant chains in Lucknow
        </h1>
        <div className="flex gap-2">
          <div
            onClick={handlePrev}
            className={`p-3 rounded-full hover:cursor-pointer ${
              scroll == 0 ? "bg-gray-200" : "bg-gray-400"
            }`}
          >
            <FaArrowLeft className="fa-solid fa-user text-sm" />
          </div>
          <div
            onClick={handleNext}
            className={`p-3 rounded-full hover:cursor-pointer ${
              scroll == 1700 ? "bg-gray-200" : "bg-gray-400"
            }`}
          >
            <FaArrowRight className="fa-solid fa-user text-sm " />
          </div>
        </div>
      </div>

      <div className="flex overflow-x-auto hide-scroll-bar mt-[30px] gap-5 ">
        {data.map(({info,cta:{link}},i) => (
          <div key={i} className="hover:scale-90 duration-500 cursor-pointer " style={{ translate: `-${scroll}%` }}>
           <RestaurantCards info={{ ...info, link }}/>
          </div>
        ))}
      </div>
      <hr className="border" />
    </div>
  );
};

export default TopRestaurents;
