import React from "react";
import { useSelector } from "react-redux";
import { Divider, Stack, Typography } from "@mui/material";
import {useMediaQuery} from '@mui/material';

const Flight_Detail = ({
  airlineImg,
  airlineName,
  flightName,
  source,
  destination,
  arrivalTime,
  departureTime,
}) => {
  const sourceAirport = useSelector((store) => store.flight.sourceAirport);
  const destinationAirport = useSelector(
    (store) => store.flight.destinationAirport
  );
  const smallScreen=useMediaQuery('(max-width:650px)');
  return (
    <div className={`border rounded-lg flex p-2 justify-between w-full ${smallScreen ?"gap-6":""}`}>
      <div className="flex flex-col ">
        <img src={airlineImg} className="h-5" />
        <p className="text-sm">{airlineName}</p>
        <p className="text-sm">{flightName}</p>
      </div>
      <div className="text-right">
        <p className="font-bold">{source}<span>{" " + departureTime }</span></p>
        <p className="text-xs text-gray-400">{sourceAirport+","}</p>
        <p className="text-xs text-gray-400">India</p>
      </div>
      
      <div>
        <p className="font-bold">{destination}<span>{" "+arrivalTime}</span></p>
        <p className="text-xs text-gray-400">{destinationAirport+","}</p>
        <p className="text-xs text-gray-400">India</p>
      </div>
    </div>
  );
};

export default Flight_Detail;
