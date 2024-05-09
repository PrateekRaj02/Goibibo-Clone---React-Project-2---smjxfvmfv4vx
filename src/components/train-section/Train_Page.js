import React, { useEffect, useRef, useState } from "react";
import irctcLogo from "../../assets/IRCTC-Logo.png";
import no_can_fee from "../../assets/no_can_fee.svg";
import go_cnfrm from "../../assets/go_cnfrm.svg";
import zero_fee from "../../assets/zero_fee.png";
import OfferForYou from "../offer-fory-you-carousel/OfferForYou";
import Train_Faq from "./Train_Faq";
import Train_Footer from "./Train_Footer";
import { baseUrl, projectId, TRAIN_STATIONS } from "../../utils/constant";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setDay,
  setFromStation,
  setToStation,
  setDepartureDate
} from "../../utils/redux/trainSlice";
import {useMediaQuery} from '@mui/material';

const Train_Page = () => {
  const from = useSelector((store) => store.train.from);
  const to = useSelector((store) => store.train.to);
  const day = useSelector((store) => store.train.day);
  const [depDate, setDepDate] = useState(new dayjs());
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fromRef = useRef();
  const toRef = useRef();
  const smallScreen=useMediaQuery('(max-width:650px)');

  const handleFromStation = () => {
    let fromStation = fromRef.current.value;
    // console.log(fromStation);
    dispatch(setFromStation(fromStation));
  };

  const handleToStation = () => {
    let toStation = toRef.current.value;
    // console.log(toStation);
    dispatch(setToStation(toStation));
  };

  const handleDateChange = (date) => {
    setDepDate(date);
    dispatch(setDepartureDate(date));

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = weekDays[new dayjs(depDate).day()];
    // console.log(dayOfWeek);
    dispatch(setDay(dayOfWeek));
  };

  const handleSearchClick = async () => {
    const apiUrl =
      baseUrl +
      `train?search={"source":"${from}","destination":"${to}"}&day=${day}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        projectId: projectId,
      },
    });
    const jsonData = await response.json();
    // console.log(jsonData);
    if (response.ok) {
      navigate("/trainsearch");
    }
  };

  return (
    <div>
      <div className="absolute h-3/4 w-full rounded-full bg-orange-500 -top-1/4"></div>
      <div className="w-10/12 m-auto">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl my-4 relative text-white z-20">
            Train Ticket Booking
          </h1>
          <div className="flex items-center">
            <img
              src={irctcLogo}
              alt="logo"
              className="h-12 bg-white rounded-full z-20"
            />
            <span className="font-bold text-2xl my-4 relative text-white z-20">
              IRCTC Authorized Partner
            </span>
          </div>
        </div>
        <div className="rounded-lg flex flex-col  bg-white shadow-md py-10 relative z-20">
          <div className={`${smallScreen?"flex flex-col gap-2":"flex justify-around p-4"}`}>
            <div className={`${smallScreen?"w-full p-2":""}`}>
              <p>From</p>
              <select
                name=""
                id=""
                className={`${smallScreen?"w-full":""} border p-2 rounded-lg`}
                ref={fromRef}
                onChange={handleFromStation}
              >
                {TRAIN_STATIONS.map((station, index) => (
                  <option value={`${station}`} key={index}>
                    {station}
                  </option>
                ))}
              </select>
            </div>
            <div className={`${smallScreen?"w-full p-2":""}`}>
              <p>To</p>
              <select
                name=""
                id=""
                className={`${smallScreen?"w-full":""} border p-2 rounded-lg`}
                ref={toRef}
                onChange={handleToStation}
              >
                {TRAIN_STATIONS.map((station, index) => (
                  <option value={`${station}`} key={index}>
                    {station}
                  </option>
                ))}
              </select>
            </div>
            <div className={`${smallScreen?"w-[95%] mx-auto mb-4":""}`}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Choose Date"
                disablePast
                reduceAnimations
                minDate={new dayjs()}
                maxDate={new dayjs().add(-1, "day").add(1, "year")}
                value={depDate}
                onChange={(date) => handleDateChange(date)}
              />
            </LocalizationProvider>
            </div>
          </div>
          <button
            className={`text-white rounded-full absolute ${smallScreen?"left-[20%] -bottom-[8%]":"left-[40%] -bottom-8"} bg-orange-600 py-4 px-8 font-bold text-xl md:max-w-3xl:left-[20%] `}
            onClick={handleSearchClick}
          >
            SEARCH TRAINS
          </button>
        </div>
        <div className="mt-20">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold">1 million+ customers</h1>
            <p className="text-lg">book train tickets with us because</p>
          </div>
          {!smallScreen && <div className="flex justify-between mt-5">
            <div className="flex gap-2 w-[30%]">
              <img src={no_can_fee} alt="" />
              <div className="flex flex-col">
                <header className="font-bold text-2xl">
                  No Cancellation Fee
                </header>
                <p className="flex flex-wrap">
                  You can opt for free cancellation & get full refund.
                </p>
              </div>
            </div>
            <div className="flex gap-2 w-[30%]">
              <img src={go_cnfrm} alt="" />
              <div className="flex flex-col">
                <header className="font-bold text-2xl">goConfirmed Trip</header>
                <p className="flex flex-wrap">
                  Guaranteed confirmed tickets or we give you 2x refund.
                </p>
              </div>
            </div>
            <div className="flex gap-2 w-[30%]">
              <img src={zero_fee} alt="" />
              <div className="flex flex-col">
                <header className="font-bold text-2xl">
                  No PG Fee via UPI
                </header>
                <p className="flex flex-wrap">
                  Zero Payment Gateway Charges via UPI mode.
                </p>
              </div>
            </div>
          </div>}
        </div>
        <OfferForYou />
        <div className="w-full rounded-lg m-auto mt-4 bg-white p-8">
          <h2 className="text-3xl font-bold">
            Why book train tickets with GOIBIBO?
          </h2>
          <ul className="mt-6 rounded-lg pl-6 py-1 border border-gray-200">
            <li className="flex items-center border-b">
              <div className="font-bold border-r-2 py-4 px-8 w-1/2">
                Authorized & Reliable
              </div>
              <div className="w-1/2 px-12 py-4">IRCTC Authorized Partner</div>
            </li>
            <li className="flex items-center border-b">
              <div className="font-bold border-r-2 py-4 px-8 w-1/2">
                Ticket Booking
              </div>
              <div className="w-1/2 px-12 py-4">Within 2 mins</div>
            </li>
            <li className="flex items-center border-b">
              <div className="font-bold border-r-2 py-4 px-8 w-1/2">
                Free Cancellation
              </div>
              <div className="w-1/2 px-12 py-4">
                Get full refund on base fare
              </div>
            </li>
            <li className="flex items-center border-b">
              <div className="font-bold border-r-2 py-4 px-8 w-1/2">
                Trip Alerts
              </div>
              <div className="w-1/2 px-12 py-4">
                Get alerts for your train timings
              </div>
            </li>
            <li className="flex items-center border-b">
              <div className="font-bold border-r-2 py-4 px-8 w-1/2">
                Live Tracking
              </div>
              <div className="w-1/2 px-12 py-4">
                Track your train's live status
              </div>
            </li>
            <li className="flex items-center ">
              <div className="font-bold border-r-2 py-4 px-8 w-1/2">
                Customer Support
              </div>
              <div className="w-1/2 px-12 py-4">On time support and refund</div>
            </li>
          </ul>
        </div>
        <Train_Faq />
      </div>
      <Train_Footer />
    </div>
  );
};

export default Train_Page;
