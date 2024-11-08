import { useEffect, useState } from "react";
import Onyourmind from "./Onyourmind";
import TopRestaurents from "./TopRestaurents";
import axios from "axios";
import OnlineDeliveryInLko from "./OnlineDeliveryInLko";



const Upperbody = () => {
  const [onYourMindData, setyOnYourMindData] = useState([]);
  const [topRestaurantsData, setTopRestaurantsData] = useState([]);

  async function fetchData() {
    const API = await axios.get(
      "https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.87560&lng=80.91150&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const result = API.data;
    // console.log(
    //   result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
    //     ?.restaurants
    // );
    const topRestaurantsfinalResult =
      result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    setTopRestaurantsData(topRestaurantsfinalResult);


    const onYourMindfinalResult =
      result?.data?.cards[0]?.card?.card?.imageGridCards?.info;
    setyOnYourMindData(onYourMindfinalResult);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <div className="w-[85%] mx-auto mt-5 ">
        <Onyourmind data={onYourMindData} />
        <TopRestaurents data={topRestaurantsData} />
        <OnlineDeliveryInLko data={topRestaurantsData} />
      </div>
    </div>
  );
};

export default Upperbody;
