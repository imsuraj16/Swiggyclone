import Link from 'next/link';
import React from 'react'
import { MdStars } from "react-icons/md";

const RestaurantCards = ({info}) => {
  // console.log(info.link.split("/")[-1]);
  
  return (
    <>
       <Link href={`/Restaurantmenu/${info.link.split("/").at(-1)}`}>
       <div
              className="min-w-[290px] h-[160px] relative "
            >
              <img
                className="w-[400px] h-[160px] object-cover  rounded-2xl relative "
                src={`https://media-assets.swiggy.com/swiggy/image/upload/${info?.cloudinaryImageId}`}
              ></img>
              <div className="bg-gradient-to-t from-black from-1% to-transparent to-40%  w-full h-full absolute top-0 rounded-2xl"></div>
              <p className="absolute bottom-0 text-white text-xl left-3 font-bold">
                {
                    info?.aggregatedDiscountInfoV3 ? info?.aggregatedDiscountInfoV3?.header +
                    " " +
                  info?.aggregatedDiscountInfoV3?.subHeader : ""
                }
              </p>
            </div>
            <div className="mb-4 mt-2 ">
              <h5 className="font-bold">{info?.name}</h5>
              <div className="flex items-center">
                <MdStars className="mt-[1.5px] text-green-700 text-[18px]"/>
                <p>{info?.avgRating}</p>
                <p className="font-extrabold pr-1 pl-1 text-2xl pb-2">.</p>
                <span className="font-semibold">{info?.sla?.slaString}</span>
              </div>
              <p className="text-gray-500 font-semibold line-clamp-1">{info?.cuisines.join(", ")}</p>
              <p className="text-gray-500 font-semibold">{info?.locality}</p>
            </div></Link>
    </>
  )
}

export default RestaurantCards
