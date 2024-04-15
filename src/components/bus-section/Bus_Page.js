import React from "react";
import Goverment_Bus from "./Goverment_Bus";
import Bus_Faq from "./Bus_Faq";
import Bus_Footer from "./Bus_Footer";

const Bus_Page = () => {
  return (
    <div>
      <div className="absolute h-[900px] w-[1050px] rounded-full bg-blue-500 -top-[70%] -left-[7%] "></div>
      <div className="w-10/12 m-auto ">
        <h1 className="font-bold text-2xl my-4 relative text-white z-20">
          Bus Ticket Booking
        </h1>
        <div className="rounded-lg flex flex-col w-1/2 bg-white shadow-md h-80 relative z-20">
          <button className="text-white rounded-full absolute left-[26%] -bottom-[7%] z-20 bg-orange-600 py-4 px-8 font-bold text-xl">
            SEARCH BUS
          </button>
        </div>
        <h3 className="mt-16 mb-4 text-2xl font-medium">Goverement Buses</h3>
        <Goverment_Bus/>
        <p className="mt-16 mb-4 text-2xl font-medium">Bus Booking FAQ</p>
        <Bus_Faq/>
      </div>
        <Bus_Footer/>
    </div>
  );
};

export default Bus_Page;
