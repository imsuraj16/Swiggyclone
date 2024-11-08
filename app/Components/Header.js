"use client";
import { FaAngleDown } from "react-icons/fa";
import { IoBagRemoveOutline } from "react-icons/io5";
import { CiSearch, CiDiscount1, CiUser, CiShoppingCart } from "react-icons/ci";
import { IoMdHelpCircleOutline } from "react-icons/io";
import Link from "next/link";
import { useContext, useState } from "react";
import { visibilityContext } from "../ContexAPI/Context";
import axios from "axios";
import { CiLocationOn } from "react-icons/ci";


const Header = () => {
  const { visible, setVisible } = useContext(visibilityContext)
  const [searchTerm, setSearchTerm] = useState([]);


  function handleVisibility() {
    setVisible((prevVal) => {
      const newVal = !prevVal;
      document.body.style.overflow = newVal ? "hidden" : "auto"; // Prevent scrolling when visible
      return newVal;
    });
  }

  async function Search(value) {
    if (value == "") {
      return
    }
    const API = await axios.get(`https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/misc/place-autocomplete?input=${value}`)

    const result = API.data
    const resp = result.data
    setSearchTerm(resp)
    // console.log(result);


  }

  return (
    <>
      <div className="sticky z-50 top-0">
        <div className="relative w-full">
          <div
            onClick={handleVisibility}
            className={`absolute bg-black/50 z-[55] min-h-screen w-full transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0 invisible'
              }`}
          ></div>
          <div
            className={`bg-white z-[60] p-5 justify-center absolute min-h-screen w-[40%] transition-transform duration-500 ${visible ? 'translate-x-0' : '-translate-x-full'
              }`}
          >
            <p onClick={handleVisibility} className="mt-3 text-white text-center bg-black h-[50px] w-[100px] pt-3">
              cut
            </p>
            <div className="flex flex-col">
              <input onChange={(e) => Search(e.target.value)} className=" shadow-lg  h-[50px] w-[20vw] ml-[90px] mt-3 focus:outline-none focus:shadow-lg border-2" type="text"></input>
              <div className="p-4 h-8 w-[25vw] ml-[50px] decoration-dashed ">
                <ul>
                  {
                    searchTerm.map((data) => (
                      <div className="line-clamp-2 p-5 mb-4 border-2 decoration-dotted ">
                         
                        <li className="text-[14px] items-center gap-2 flex "> <CiLocationOn  />{data.structured_formatting.main_text} </li>
                        <p className="text-gray-400 ml-5 text-sm">{data.structured_formatting.secondary_text}</p>

                      </div>

                    ))
                  }
                </ul>
              </div>
            </div>
          </div>



        </div>
        <div className="w-full shadow-lg h-[85px] flex items-center justify-center sticky top-0 z-[50] bg-white">
          <div className="w-[70%] flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <img
                  src="https://w7.pngwing.com/pngs/55/100/png-transparent-swiggy-hd-logo-thumbnail.png"
                  className="h-10"
                  alt="Logo" // Add alt text for accessibility
                />
              </Link>
              <div onClick={handleVisibility} className="flex items-center gap-2 ml-8">
                <p className="font-bold border-b-2 text-[15px] border-black hover:cursor-pointer">
                  others
                </p>
                <FaAngleDown className="mt-[3px] ml-[8px] text-orange-400 hover:cursor-pointer" />
              </div>
            </div>
            <div className="gap-[50px] flex items-center pr-2">
              <div className="gap-1 flex items-center hover:text-orange-400 hover:cursor-pointer group">
                <IoBagRemoveOutline className="group-hover:font-bold group-hover:scale-110 transition-transform duration-300" />
                <h6 className="text-[1vw] font-semibold hover:font-bold">Swiggy Corporate</h6>
              </div>
              <div className="gap-1 flex items-center hover:text-orange-400 hover:cursor-pointer group">
                <CiSearch className="group-hover:font-bold group-hover:scale-110 transition-transform duration-300" />
                <h6 className="text-[1vw] font-semibold hover:font-bold">Search</h6>
              </div>
              <div className="gap-1 flex items-center hover:text-orange-400 hover:cursor-pointer group">
                <CiDiscount1 className="group-hover:font-bold group-hover:scale-110 transition-transform duration-300" />
                <h6 className="text-[1vw] font-semibold hover:font-bold">Offers</h6>
              </div>
              <div className="gap-1 flex items-center hover:text-orange-400 hover:cursor-pointer group">
                <IoMdHelpCircleOutline className="group-hover:font-bold group-hover:scale-110 transition-transform duration-300" />
                <h6 className="text-[1vw] font-semibold hover:font-bold">Help</h6>
              </div>
              <div className="gap-1 flex items-center hover:text-orange-400 hover:cursor-pointer group">
                <CiUser className="group-hover:font-bold group-hover:scale-110 transition-transform duration-300" />
                <h6 className="text-[1vw] font-semibold hover:font-bold">Sign in</h6>
              </div>
              <div className="gap-1 flex items-center hover:text-orange-400 hover:cursor-pointer group">
                <CiShoppingCart className="group-hover:font-bold group-hover:scale-110 transition-transform duration-300" />
                <h6 className="text-[1vw] font-semibold hover:font-bold">Cart</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
