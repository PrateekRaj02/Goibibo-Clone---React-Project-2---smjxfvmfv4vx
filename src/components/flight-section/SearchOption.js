import React, { useState, useEffect } from "react";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { baseUrl, projectId } from "../../utils/constant";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { setSelectedAirport } from "../../utils/redux/flightSlice";

const SearchOption = ({ setOpen }) => {
  const [airports, setAirports] = useState([]);

  const getAllAirports = async () => {
    const apiUrl = baseUrl + "airport";
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        projectId: projectId,
      },
    });
    const jsonData = await response.json();
    setAirports(jsonData.data.airports);
  };

  useEffect(() => {
    getAllAirports();
  }, []);

  return (
    <div
        onBlur={()=>setOpen(false)}
      className="h-52 bg-white overflow-y-scroll"
    >
      <div>
        <span>
          <SearchIcon />
        </span>
        <input
          type="text"
          autoFocus
          className="w-[90%] outline-none p-2 shadow-sm"
        />
      </div>
      <div >
        {/* {airports.map((airport) => {
          return (
            <SingleOption
              airport={airport}
              key={airport._id}
              setOpen={setOpen}
            />
          );
        })} */}
        <select name="" id="" className="flex flex-col gap-2">
          {airports.map((airport)=><option><SingleOption airport={airport}
              key={airport._id}
              setOpen={setOpen} /></option>)}
        </select>
      </div>
    </div>
  );
};

const SingleOption = ({ airport, setOpen }) => {
  const { city, country, name, iata_code } = airport;
  const dispatch = useDispatch();
  return (
    <div
      className="flex justify-between hover:bg-blue-200"
      // onClick={() => {
      //   dispatch(setSelectedAirport(airport));
      //   setOpen(false);
      // }}
    >
      <div className="flex gap-2">
        <FlightTakeoffIcon />
        <div className="flex flex-col">
          <div>{city + "," + country}</div>
          <div className="text-gray-500 text-sm">{name}</div>
        </div>
      </div>
      <div className="text-gray-400 font-bold text-right mr-2">{iata_code}</div>
    </div>
  );
};

export default SearchOption;
