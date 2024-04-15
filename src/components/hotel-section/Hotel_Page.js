import React from "react";
import OfferForYou from "../offer-fory-you-carousel/OfferForYou";
import Hotel_Faq from "./Hotel_Faq";
import Hotel_Footer from "./Hotel_Footer";


const Hotel_Page = () => {
  return (
    <div className="">
      <div className="absolute h-[900px] w-[1050px] rounded-full bg-orange-500 -top-[70%] -left-[7%] "></div>
      <div className="w-10/12 m-auto pb-5">
        <h1 className="font-bold text-2xl my-4 relative text-white z-20">
          Book Hotels & Homestays
        </h1>
        <div className="rounded-lg flex flex-col w-1/2 bg-white shadow-md h-80 relative z-20">
          <button className="text-white rounded-full absolute left-[20%] -bottom-[7%] z-20 bg-orange-600 py-4 px-8 font-bold text-xl">
            SEARCH FLIGHTS
          </button>
        </div>

        <OfferForYou />
        <Hotel_Faq/>
      </div>
      <Hotel_Footer/>
    </div>
  );
};

export default Hotel_Page;
