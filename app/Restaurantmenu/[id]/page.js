"use client";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdStars } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import MenuCard from "./MenuCard";
import RestaurantMenuTopPicks from "./RestaurantMenuTopPicks";

const page = () => {
  const params = useParams();
  // console.log(params);

  const id = params?.id;
  const name = id
    .split("-")
    .at(-1)
    .split("")
    .filter((item) => !isNaN(item))
    .join("");
  // console.log(name);

  const [menuData, setMenuData] = useState([]);
  const [restaurantInfo, setrestaurantInfo] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [topPicks, setTopPicks] = useState([]);
  // console.log(restaurantInfo);

  const [scroll, setnextScroll] = useState(0);
  const [scrollTp, setScrollTp] = useState(0);

  async function fetchMenu() {
    const API = await axios.get(
      `https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.87560&lng=80.91150&restaurantId=${name}&catalog_qa=undefined&submitAction=ENTER`
    );
    const result = API.data;
    // console.log(result);

    const finalRes = result?.data?.cards[2]?.card?.card?.info;

    setrestaurantInfo(finalRes);

    setDiscountData(
      result?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );

    setTopPicks(
      result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
        ?.card?.carousel
    );

    let actualMenu =
      (result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
        (data) => data?.card?.card?.itemCards || data?.card?.card?.categories
      );
    setMenuData(actualMenu);
    // console.log(result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);
    // console.log(actualMenu);

    // console.log(result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.carousel);
  }

  useEffect(() => {
    fetchMenu();
  }, []);

  function handleNext() {
    scroll < 270 ? setnextScroll((preVal) => preVal + 90) : "";
  }
  // console.log(scroll);
  // console.log(scrollTp);

  function handlePrev() {
    scroll == 0 ? "" : setnextScroll((preVal) => preVal - 90);
  }

  //for top picks...
  function handleNextTop() {
    scrollTp < 360 ? setScrollTp((preVal) => preVal + 120) : "";
  }

  function handlePrevTop() {
    scrollTp == 0 ? "" : setScrollTp((preVal) => preVal - 120);
  }

  return (
    <div className="w-full">
      <div className="w-[800px] mx-auto pt-7">
        <p className="text-[10px] text-gray-400 font-semibold">
          <Link href="/">
            <span className="hover:text-black hover:cursor-pointer">Home</span>
          </Link>{" "}
          /{" "}
          <Link href="/">
            <span className="hover:text-black hover:cursor-pointer">
              {restaurantInfo?.city}
            </span>
          </Link>{" "}
          / <span className="text-black">{restaurantInfo.name}</span>
        </p>
        <h1 className="font-bold pt-6 text-2xl">{restaurantInfo.name}</h1>
        <div className="w-full h-[180px] mt-4 rounded-[30px] bg-gradient-to-t from-slate-300 px-4 pb-4">
          <div className="w-full h-full bg-white rounded-[30px] border p-4">
            <div className="flex items-center gap-1">
              <MdStars className="text-green-700 text-2xl" />
              <p className="font-bold pb-1">{restaurantInfo.avgRating}</p>
              <p className="font-bold pb-1">
                ({restaurantInfo.totalRatingsString})
              </p>
              <p>.</p>
              <p className="font-bold pb-1">
                {restaurantInfo.costForTwoMessage}
              </p>
            </div>

            <p className="font-bold underline text-orange-600 text-[14px]">
              {restaurantInfo?.cuisines?.join(",")}
            </p>

            <div className="mt-5 flex gap-2">
              <div className="w-[8px] flex flex-col justify-center items-center">
                <div className="w-[7px] h-[7px] rounded-full bg-gray-400"></div>
                <div className="w-[1px] h-[25px] bg-gray-400"></div>
                <div className="w-[7px] h-[7px] rounded-full bg-gray-400"></div>
              </div>
              <div className="flex gap-1 flex-col">
                <p className="font-bold text-[14px] pb-1">
                  Outlet{" "}
                  <span className="text-gray-400">
                    {restaurantInfo.areaName}
                  </span>
                </p>
                <p className="font-bold text-black text-[14px]">
                  {restaurantInfo?.sla?.slaString}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between mt-7">
            <h1 className="text-xl font-extrabold">Deals for you</h1>
            <div className="flex gap-2">
              <div
                onClick={handlePrev}
                className={`p-3 rounded-full hover:cursor-pointer ${scroll == 0 ? "bg-gray-200" : "bg-gray-400"
                  }`}
              >
                <FaArrowLeft className="fa-solid fa-user text-sm" />
              </div>
              <div
                onClick={handleNext}
                className={`p-3 rounded-full hover:cursor-pointer ${scroll == 270 ? "bg-gray-200" : "bg-gray-400"
                  }`}
              >
                <FaArrowRight className="fa-solid fa-user text-sm " />
              </div>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto mt-3 ">
            {discountData.map((data, i) => (
              <div
                key={i}
                className="duration-500"
                style={{ translate: `-${scroll}%` }}
              >
                <Discount data={data} />
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-center mt-[45px]">---M E N U---</h2>
        <div className="bg-slate-300 text-center p-3 rounded-2xl font-bold mt-5 text-black relative hover:cursor-pointer">
          Serach for dishes
          <IoSearchOutline className="absolute right-3 top-4" />
        </div>

        {
          topPicks && <div>
            <div className="flex items-center justify-between mt-7">
              <h1 className="text-xl font-extrabold">Top Picks</h1>
              <div className="flex gap-2">
                <div
                  onClick={handlePrevTop}
                  className={`p-3 rounded-full hover:cursor-pointer ${scrollTp == 0 ? "bg-gray-200" : "bg-gray-400"
                    }`}
                >
                  <FaArrowLeft className="fa-solid fa-user text-sm" />
                </div>
                <div
                  onClick={handleNextTop}
                  className={`p-3 rounded-full hover:cursor-pointer ${scrollTp == 270 ? "bg-gray-200" : "bg-gray-400"
                    }`}
                >
                  <FaArrowRight className="fa-solid fa-user text-sm " />
                </div>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto mt-3 ">
              {topPicks.map((data, i) => (
                <div
                  key={i}
                  className="duration-500"
                  style={{ translate: `-${scrollTp}%` }}
                >
                  <RestaurantMenuTopPicks data={data} />
                </div>
              ))}
            </div>
          </div>
        }

        <div>
          {
            menuData.map(({ card: { card } }, i) => (
              <MenuCard card={card} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

function Discount({
  data: {
    info: { header, offerLogo, couponCode },
  },
}) {
  // console.log(info);

  return (
    <>
      <div className="flex min-w-[320px] h-[76px] border p-3 rounded-[25px]">
        <img
          className="w-[50px] h-[50px]"
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/${offerLogo}`}
        ></img>
        <div>
          <h1 className="font-bold">{header}</h1>
          <h1 className="font-bold text-gray-400">{couponCode}</h1>
        </div>
      </div>
    </>
  );
}

export default page;
