import React, { useEffect, useRef, useState } from "react";
import Goverment_Bus from "./Goverment_Bus";
import Bus_Faq from "./Bus_Faq";
import Bus_Footer from "./Bus_Footer";
import { baseUrl, projectId } from "../../utils/constant";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSource, setDestination, setDay,setDepartureDate } from "../../utils/redux/busSlice";
import {useMediaQuery} from '@mui/material';

const Bus_Page = () => {
  const [city, setCity] = useState([]);
  const source = useSelector((store) => store.bus.source);
  const destination = useSelector((store) => store.bus.destination);
  const day = useSelector((store) => store.bus.day);
  const [depDate, setDepDate] = useState(new dayjs());
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const fromRef = useRef();
  const toRef = useRef();
  const smallScreen=useMediaQuery('(max-width:650px)');

  const handleFromChange = () => {
    const from = fromRef.current.value;
    // console.log(from);
    dispatch(setSource(from));
  };

  const handleToChange = () => {
    const to = toRef.current.value;
    // console.log(to);
    dispatch(setDestination(to));
  };

  const handleDateChange = (date) => {
    setDepDate(date);
    dispatch(setDepartureDate(date));

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = weekDays[new dayjs(depDate).day()];
    dispatch(setDay(dayOfWeek));
  };

  const handleSearchClick = async () => {
    const apiUrl =
      baseUrl +
      `bus?search={"source":"${source}","destination":"${destination}"}&day=${day}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        projectId: projectId,
      },
    });
    const jsonData = await response.json();
    // console.log(jsonData);
    if(response.ok){
      navigate("/bussearch");
    }
  };

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
  useEffect(() => {
    getCities();
  }, []);
  return (
    <div className="">
      <div className={smallScreen ?"absolute h-[300px] w-full rounded-full bg-blue-500 -top-[3%] ":"absolute h-[900px] w-[1050px] rounded-full bg-blue-500 -top-[70%] -left-[7%]"}></div>
      <div className="w-10/12 m-auto ">
        <h1 className="font-bold text-2xl my-4 relative text-white z-20">
          Bus Ticket Booking
        </h1>
        <div className={`rounded-lg flex flex-col ${smallScreen ? "w-[100%]" :"w-1/2"} bg-white shadow-md h-80 relative z-20`}>
          
            <label htmlFor="" className="p-2">
              From
            </label>
            <select
              name=""
              id=""
              className="border p-2 my-2 mx-2 rounded-lg"
              ref={fromRef}
              onChange={handleFromChange}
            >
              {city.map((cit) => {
                return (
                  <option value={`${cit.cityState}`} key={cit._id}>
                    {cit.cityState}
                  </option>
                );
              })}
            </select>

            <label htmlFor="p-2" className="p-2">To</label>
            <select
              name=""
              id=""
              ref={toRef}
              onChange={handleToChange}
              className="border p-2 my-2 mb-2 mx-2 rounded-lg"
            >
              {city.map((cit) => {
                return (
                  <option value={`${cit.cityState}`} key={cit._id}>
                    {cit.cityState}
                  </option>
                );
              })}
            </select>
            <div className={`${smallScreen?"w-[95%] mt-2 ml-2 mr-2":"w-[95%] mt-2 mx-auto"}`}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Check-In"
                disablePast
                reduceAnimations
                minDate={new dayjs()}
                maxDate={new dayjs().add(-1, "day").add(1, "year")}
                value={depDate}
                onChange={(date) => handleDateChange(date)}
              />
              </LocalizationProvider>
            </div>
          
          <button
            className={`text-white rounded-full absolute ${smallScreen?"left-[21%]":"left-[26%]"} -bottom-[7%] z-20 bg-orange-600 py-4 px-8 font-bold text-xl`}
            onClick={handleSearchClick}
          >
            SEARCH BUS
          </button>
        </div>
        <h3 className="mt-16 mb-4 text-2xl font-medium">Goverement Buses</h3>
        <Goverment_Bus />
        <p className="mt-16 mb-4 text-2xl font-medium">Bus Booking FAQ</p>
        <Bus_Faq />
      </div>
      <Bus_Footer />
    </div>
  );
};

export default Bus_Page;
