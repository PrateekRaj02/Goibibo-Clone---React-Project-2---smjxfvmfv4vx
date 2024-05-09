import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { baseUrl, projectId } from "../../utils/constant";
import Bus_Card from "./Bus_Card";
import {useMediaQuery} from '@mui/material';
import GlobalLoader from "../loder/GlobalLoader";

const Bus_Search_Page = () => {
  const source = useSelector((store) => store.bus.source);
  const destination = useSelector((store) => store.bus.destination);
  const day = useSelector((store) => store.bus.day);
  const departureDate = useSelector((store) => store.bus.departureDate);
  const [buses, setBuses] = useState([]);
  const [loading,setLoading]=useState(true);
  const smallScreen=useMediaQuery('(max-width:650px)');

  const getBusData = async () => {
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
    if (response.ok) {
      setBuses(jsonData.data.buses);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBusData();
  }, []);

  return loading ? <GlobalLoader/> : (
    <div className="mt-2">
      <div className={`flex flex-col gap-4 ${smallScreen ? "w-full" :"w-10/12 mx-auto"}`}>
        {buses.map((bus) => {
          return (
            <Bus_Card
              busDetails={bus}
              key={bus._id}
              departureDate={departureDate}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Bus_Search_Page;
