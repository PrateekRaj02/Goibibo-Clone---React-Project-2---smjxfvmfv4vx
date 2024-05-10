import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl, projectId } from "../../utils/constant";
import Hotel_Card from "./Hotel_Card";
import {useMediaQuery} from '@mui/material';
import GlobalLoader from "../loder/GlobalLoader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const Hotel_Search_Page = () => {
  const selectedCity = useSelector((store) => store.hotel.selectedCity);
  const checkinDate=useSelector((store)=>store.hotel.checkinDate);
  const checkoutDate=useSelector((store)=>store.hotel.checkoutDate);
  const [hotelData, setHotelData] = useState([]);
  const [tempData,setTempData]=useState([]);
  const [rating,setRating]=useState(0);
  const [priceSorting,setPriceSorting]=useState(0);
  const [loading,setLoading]=useState(true);
  const smallScreen=useMediaQuery('(max-width:650px)');
  const [showFilter,setShowFilter]=useState(true);

  const getHotelsData = async () => {
    const apiUrl = baseUrl + `hotel?search={"location":"${selectedCity}"}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        projectId: projectId,
      },
    });
    const jsonData = await response.json();
    console.log(jsonData);
    if (response.ok) {
      setHotelData(jsonData.data.hotels);
      setTempData(jsonData.data.hotels);
      setLoading(false);
      // setFilteredHotelData(jsonData.data.hotels);
    }
  };

  const sortByPrice= async (value)=>{
    setPriceSorting(value);
    const apiUrl = baseUrl + `hotel?search={"location":"${selectedCity}"}&sort={"avgCostPerNight":${value}}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        projectId: projectId,
      },
    });
    const jsonData = await response.json();
    // console.log(jsonData);
    if (response.ok) {
      // setFilteredHotelData(jsonData.data.hotels);
      setHotelData(jsonData.data.hotels);
    }

  }

  const handleRating=async(value)=>{
    setRating(value);
    const apiUrl = baseUrl + `hotel?search={"location":"${selectedCity}"}&filter={"rating":{"$gte":${(value/1.9).toFixed(1)}}}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        projectId: projectId,
      },
    });
    const jsonData = await response.json();
    // console.log(jsonData);
    if (response.ok) {
      setHotelData(jsonData.data.hotels);
    }
  }

  const handleClearFilter=()=>{
    setRating(0);
    setPriceSorting(0);
    setHotelData(tempData);
  }

  const handleShowFilter=()=>{
    setShowFilter(!showFilter);
  }

  useEffect(() => {
    getHotelsData();
  },[]);

  return loading ? <GlobalLoader/> :(
    <div className="pb-2">
      <div></div>
      <div className={`${smallScreen?"100% flex-col":"w-10/12"} mx-auto flex gap-4 my-4`}>

        <div className={`${smallScreen?"w-full":"w-3/12"} h-fit rounded-lg shadow-xl bg-white `}>
          <div className="flex justify-between">
            <h3 className="font-bold text-lg p-4">Filters</h3>
            <div className="flex items-center gap-2 mr-2">
            <button className="mr-2 text-gray-400 hover:text-red-500" onClick={handleClearFilter}>Clear</button>
            {smallScreen && <span onClick={handleShowFilter}>{showFilter ?<ExpandLessIcon/>:<ExpandMoreIcon/>}</span>}
            </div>
          </div>
          <hr />

          {showFilter && <div className={`${smallScreen ? "grid grid-cols-2":""}`}>

          <div className="mb-2">
            <h3 className="font-medium p-4">User Rating</h3>
            <ul className="flex flex-col gap-2 ml-4">
              <li className="flex gap-2">
                <input type="checkbox" name="" id="9+" checked={rating == 9} onClick={()=>handleRating(9)} />
                <label htmlFor="9+">Exceptional: 9+</label>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" name="" id="8+" checked={rating == 8} onClick={()=>handleRating(8)}/>
                <label htmlFor="8+">Excellent: 8+</label>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" name="" id="7+" checked={rating == 7} onClick={()=>handleRating(7)}/>
                <label htmlFor="7+">Very Good: 7+</label>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" name="" id="6+" checked={rating == 6} onClick={()=>handleRating(6)}/>
                <label htmlFor="6+">Good: 6+</label>
              </li>
            </ul>
          </div>
          {!smallScreen && <hr />}

          <div className="mb-2">
            <h3 className="font-medium  p-4">Sort By Price</h3>
            <ul className="flex flex-col gap-2 ml-4">
              <li className="flex gap-2">
                <input type="checkbox" name="" id="lowtohigh" checked={priceSorting ==1} onClick={()=>sortByPrice(1)} />
                <label htmlFor="lowtohigh">Low to High</label>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" name="" id="hightolow" checked={priceSorting == -1} onClick={()=>sortByPrice(-1)} />
                <label htmlFor="hightolow">High to Low</label>
              </li>
            </ul>
          </div>
          {!smallScreen && <hr />}

          </div>}

        </div>

        {hotelData.length == 0 && <div className={`${smallScreen ? "w-[95%] mx-auto":"absolute top-[50%] left-[50%]"}`}>
           <div className="flex flex-col gap-2">

            <h3 className="font-bold text-2xl">No Flights Found</h3>
            <button onClick={handleClearFilter} className="font-bold text-lg bg-red-500 text-white rounded-lg px-2 py-4">Clear Fliters</button>
            
            </div>
        </div>}

        <div>
          <h2 className="text-2xl font-medium mb-2">
            Showing Properties In {selectedCity}
          </h2>
          <div className="w-full flex flex-col gap-4">
            {hotelData.map((hotel) => {
              return (
                <Hotel_Card
                  key={hotel._id}
                  hotelData={hotel}
                  checkinDate={checkinDate}
                  checkoutDate={checkoutDate}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotel_Search_Page;
