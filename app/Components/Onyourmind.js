import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const Onyourmind = ({data}) => {

  const [scroll, setnextScroll] = useState(0);
  
  function handlePrev() {
    scroll == 0 ? "" : setnextScroll((preVal) => preVal - 550);
  }

  function handleNext() {
    scroll < 1650 ? setnextScroll((preVal) => preVal + 550) : "";
  }


  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">What's on your mind?</h1>
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
              scroll == 1650 ? "bg-gray-200" : "bg-gray-400"
            }`}
          >
            <FaArrowRight className="fa-solid fa-user text-sm " />
          </div>
        </div>
      </div>

      <div className="flex overflow-x-auto hide-scroll-bar mt-2 ">
        {data.map((item, i) => (
          <img
            key={i}
            style={{ translate: `-${scroll}%` }}
            className="w-[140px] duration-500 mx-[21px] hover:cursor-pointer hover:hover:scale-90"
            src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
          ></img>
        ))}
      </div>
      <hr className="border"/>
    </>
  );
};


export default Onyourmind;
