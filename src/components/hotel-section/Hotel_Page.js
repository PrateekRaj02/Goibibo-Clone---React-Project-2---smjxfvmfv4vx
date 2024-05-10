import React, { useEffect, useRef, useState } from "react";
import OfferForYou from "../offer-fory-you-carousel/OfferForYou";
import Hotel_Faq from "./Hotel_Faq";
import Hotel_Footer from "./Hotel_Footer";
import { baseUrl, projectId } from "../../utils/constant";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {useSelector,useDispatch} from "react-redux"
import { setCheckInDate, setCheckOutDate, setSelectedCity } from "../../utils/redux/hotelSlice";
import {useNavigate} from "react-router-dom";
import {useMediaQuery} from '@mui/material';

const Hotel_Page = () => {
  const [city, setCity] = useState([]);
  const cityRef=useRef();
  const selectedCity=useSelector((store)=>store.hotel.selectedCity);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const smallScreen=useMediaQuery('(max-width:650px)');

  const getCities = async () => {
    const apiUrl = baseUrl + `city`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        projectId: projectId,
      },
    });
    const jsonData = await response.json();
    // console.log(jsonData.data.cities);
    setCity(jsonData.data.cities);
  };

  const handleChange=()=>{
    let ci=cityRef.current.value.split(",")[0];
    // console.log(ci);
    dispatch(setSelectedCity(ci));
  }

  const handleCheckIn=(date)=>{
    dispatch(setCheckInDate(date));

  }

  const handleCheckOut=(date)=>{
    dispatch(setCheckOutDate(date));

  }

  const handleClick=async ()=>{
    const apiUrl= baseUrl + `hotel?search={"location":"${selectedCity}"}`;
    const response= await fetch(apiUrl,{
      method:"GET",
      headers:{
        projectId:projectId,
      }
    });
    const jsonData=await response.json();
    // console.log(jsonData);
    if(response.ok){
      navigate("/hotelsearch");
    }
  }

  useEffect(() => {
    getCities();
  }, []);

  return (
    <div className="">
      <div className="absolute h-3/4 w-full rounded-full bg-orange-500 -top-1/4"></div>
      <div className="w-10/12 m-auto pb-5">
        <h1 className="font-bold text-2xl my-4 relative text-white z-20">
          Book Hotels & Homestays
        </h1>
        <div className={`rounded-lg flex flex-col ${smallScreen?"w-full":"w-1/2"} bg-white shadow-md pb-10 relative z-20`}>
          <div>
            <ul className="p-4 flex gap-2">
              <li className="flex gap-2">
                <input type="radio" name="radio" id="india" checked />
                <label htmlFor="india" className="font-bold text-gray-600">India</label>
              </li>
              <li className="flex gap-2 cursor-not-allowed">
                <input type="radio" name="radio" id="international" disabled className="cursor-not-allowed"/>
                <label htmlFor="international" className="font-bold text-gray-600 cursor-not-allowed">International</label>
              </li>
            </ul>
          </div>
          <label htmlFor="" className="pl-4">Destination</label>
          <select name="" id="" className="p-4 border m-2 rounded-lg shadow-lg cursor-pointer" ref={cityRef} onChange={handleChange}>
            
            {city.map((cit) => {
              return (
                <option value={`${cit.cityState}`} key={cit._id}>
                  {cit.cityState}
                </option>
              );
            })}
          </select>
          <div className={`${smallScreen?"flex flex-col gap-4 w-[95%] mx-auto mt-2":"flex flex-col gap-4 p-1"}`}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Check-In"
              disablePast
              reduceAnimations
              minDate={new dayjs()}
              maxDate={new dayjs().add(-1, "day").add(1, "year")}
              value={new dayjs()}
              onChange={(date)=>handleCheckIn(date)}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Check-Out"
              disablePast
              reduceAnimations
              minDate={new dayjs()}
              maxDate={new dayjs().add(-1, "day").add(1, "year")}
              value={new dayjs()}
              onChange={(date)=>handleCheckOut(date)}
            />
          </LocalizationProvider>
          </div>
          <div>

          </div>
          

          <button className={`text-white rounded-full absolute ${smallScreen?"left-[20%] -bottom-[7%]": "left-[25%] -bottom-[7%]"} z-20 bg-orange-600 py-4 px-8 font-bold text-xl`} onClick={handleClick}>
            SEARCH HOTELS
          </button>
        </div>

        <OfferForYou />
        <Hotel_Faq />
      </div>
      <Hotel_Footer />
    </div>
  );
};

export default Hotel_Page;
