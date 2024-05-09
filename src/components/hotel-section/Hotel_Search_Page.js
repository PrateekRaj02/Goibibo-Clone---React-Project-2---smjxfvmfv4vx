import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl, projectId } from "../../utils/constant";
import Hotel_Card from "./Hotel_Card";
import {useMediaQuery} from '@mui/material';

const Hotel_Search_Page = () => {
  const selectedCity = useSelector((store) => store.hotel.selectedCity);
  const checkinDate=useSelector((store)=>store.hotel.checkinDate);
  const checkoutDate=useSelector((store)=>store.hotel.checkoutDate);
  const [hotelData, setHotelData] = useState([]);
  const smallScreen=useMediaQuery('(max-width:650px)');

  const getHotelsData = async () => {
    const apiUrl = baseUrl + `hotel?search={"location":"${selectedCity}"}`;
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
  };


  useEffect(() => {
    getHotelsData();
  });

  return (
    <div>
      <div></div>
      <div className={`${smallScreen?"100%":"w-10/12"} mx-auto flex gap-4 my-4`}>
        {!smallScreen && <div className="w-3/12 h-fit rounded-lg shadow-xl bg-white">
          <div className="flex justify-between">
            <h3 className="font-bold text-lg p-4">Filters</h3>
            <button className="mr-2 text-gray-400">Clear</button>
          </div>
          <hr />
          <div className="mb-2">
            <h3 className="font-medium p-4">Departure</h3>
            <ul className="flex flex-col gap-2 ml-4">
              <li className="flex gap-2">
                <input type="checkbox" name="" id="6am" />
                <label htmlFor="6am">Before 6 AM</label>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" name="" id="6am-12pm" />
                <label htmlFor="6am-12pm">6 AM - 12 PM</label>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" name="" id="12pm-6pm" />
                <label htmlFor="12pm-6pm">12PM-6 PM</label>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" name="" id="6pm" />
                <label htmlFor="6pm">After 6 PM</label>
              </li>
            </ul>
          </div>
          <hr />

          <div className="mb-2">
            <h3 className="font-medium  p-4">Stops</h3>
            <ul className="flex flex-col gap-2 ml-4">
              <li className="flex gap-2">
                <input type="checkbox" name="" id="direct" />
                <label htmlFor="direct">Direct</label>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" name="" id="1stop" />
                <label htmlFor="1stop">1 stop</label>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" name="" id="2+stop" />
                <label htmlFor="2+stop">2+ stops</label>
              </li>
            </ul>
          </div>
          <hr />

          <div className="mb-2">
            <h3 className="font-medium  p-4">Sort By Price</h3>
            <ul className="flex flex-col gap-2 ml-4">
              <li className="flex gap-2">
                <input type="checkbox" name="" id="lowtohigh" />
                <label htmlFor="lowtohigh">Low to High</label>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" name="" id="hightolow" />
                <label htmlFor="hightolow">High to Low</label>
              </li>
            </ul>
          </div>
          <hr />
          <div className="flex justify-center my-4">
            <button className="rounded-xl p-4 bg-amber-400">
              Apply Filter
            </button>
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
