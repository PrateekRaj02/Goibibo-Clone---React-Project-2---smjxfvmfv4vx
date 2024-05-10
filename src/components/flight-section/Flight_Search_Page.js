import React, { useEffect, useState } from "react";
import airindialogo from "../../assets/airindialogo.png";
import vistaralogo from "../../assets/vistaralogo.png";
import indigologo from "../../assets/indigologo.png";
import spicejetlogo from "../../assets/spicejetlogo.png";
import { useSelector } from "react-redux";
import { baseUrl, projectId } from "../../utils/constant";
import Flight_Card from "./Flight_Card";
import {useMediaQuery} from '@mui/material';
import GlobalLoader from "../loder/GlobalLoader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const Flight_Search_Page = () => {
  const source = useSelector((store) => store.flight.sourceSelectedAirport);
  const destination = useSelector(
    (store) => store.flight.destinationSelectedAirport
  );
  const departureDate = useSelector((store) => store.flight.departureDate);
  const day = useSelector((store) => store.flight.day);
  const [flights, setFlights] = useState([]);
  const [tempFlights,setTempFlights]=useState([]);
  const [loading,setLoading]=useState(true);
  const [airline,setAirline]=useState("");
  const [stops,setStops]=useState(-1);
  const [depTime,setDepTime]=useState("");
  const [priceSorting,setPriceSorting]=useState(0);
  const smallScreen=useMediaQuery('(max-width:650px)');
  const [showFilter,setShowFilter]=useState(true);

  const getAllFlight = async () => {
    const apiUrl =
      baseUrl +
      `flight?search={"source":"${source}","destination":"${destination}"}&day=${day}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        projectId: projectId,
      },
    });
    const jsonData = await response.json();
    if(response.ok){
      setFlights(jsonData.data.flights);
      setTempFlights(jsonData.data.flights);
      setLoading(false);
    }
    // console.log(jsonData);
  };

    const handleStopsChecked= async (value)=>{
      setStops(value);
      const apiUrl =
        baseUrl +
        `flight?search={"source":"${source}","destination":"${destination}"}&day=${day}&filter={"stops":{"$eq":${value}}}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          projectId: projectId,
        },
      });
      const jsonData = await response.json();
      // console.log(jsonData);
      if(response.ok){
        setFlights(jsonData.data.flights);
      }
    }

    const handleSortByPrice=async (value)=>{
      setPriceSorting(value);
      const apiUrl =
        baseUrl +
        `flight?search={"source":"${source}","destination":"${destination}"}&day=${day}&sort={"ticketPrice":${value}}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          projectId: projectId,
        },
      });
      const jsonData = await response.json();
      if(response.ok){
        setFlights(jsonData.data.flights);
      }
    }

    const searchByDepartureTime= async(gt,lt)=>{
      if(gt==="00:00" && lt=== "06:00"){
        setDepTime("6");
      }else if(gt==="06:00" && lt ==="12:00"){
        setDepTime("6-12")
      }else if(gt==="12:00" && lt ==="18:00"){
        setDepTime("12-18")
      }else if(gt==="18:00" && lt ==="00:00"){
        setDepTime("18")
      }
      // const filter={"departureTime":{"$gte":gt,"$lte":lt}};
      const apiUrl =
        baseUrl +
        `flight?search={"source":"${source}","destination":"${destination}"}&day=${day}&filter={"departureTime":{"$gte":"${gt}","$lte":"${lt}"}}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          projectId: projectId,
        },
      });
      const jsonData = await response.json();
      // console.log(jsonData);
      if(response.ok){
        setFlights(jsonData.data.flights);
      }
    }

    const handleAirlineChange=(company)=>{
      setAirline(company);
      const arr=flights.filter((flight)=>flight.flightID.slice(0,2) === company);
      setFlights(arr);
    }

  const handleClearFilter=()=>{
    setStops(-1);
    setPriceSorting(0);
    setDepTime("");
    setAirline("");
    setFlights(tempFlights);
  }

  const handleShowFilter=()=>{
    setShowFilter(!showFilter);
  }

  useEffect(() => {
    getAllFlight();
  }, []);
  
  return loading ? <GlobalLoader/> : (
    <div className="pb-2">

      <div className="bg-blue-700">
        <div className="w-10/12 mx-auto">
          <div className="py-2 flex gap-2 font-medium text-white ">
            <div className="flex gap-2 p-2">
              <input type="radio" name="radio" id="one" checked />
              <label htmlFor="one">One way</label>
            </div>
            <div className="flex gap-1 p-2 cursor-not-allowed">
              <input
                type="radio"
                name="radio"
                id="round"
                disabled
                className="cursor-not-allowed"
              />
              <label htmlFor="round" className="cursor-not-allowed">
                Round Trip
              </label>
            </div>
            <div className="flex gap-1 p-2 cursor-not-allowed">
              <input
                type="radio"
                name="radio"
                id="multi"
                disabled
                className="cursor-not-allowed"
              />
              <label htmlFor="multi" className="cursor-not-allowed">
                Multi City
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className={`${smallScreen?"flex-col":"w-10/12"} mx-auto flex gap-4  my-4`}>

        <div className={`${smallScreen ?"w-full" :"w-3/12"} h-fit rounded-lg shadow-xl bg-white`}>

          <div className="flex justify-between">
          <h3 className="font-bold text-lg p-4">Filters</h3>
          <div className="flex items-center gap-2 mr-2">
          <button className=" text-gray-400 hover:text-red-600" onClick={handleClearFilter}>Clear</button>
          {smallScreen && <span onClick={handleShowFilter}>{showFilter ?<ExpandLessIcon/>:<ExpandMoreIcon/>}</span>}
          </div>
          </div>
          <hr />

          { showFilter && <div className={`${smallScreen ? "grid grid-cols-2":""}`}>
          <div className="mb-2">
            <h3 className="font-medium p-4">Departure</h3>
            <ul className="flex flex-col gap-2 ml-4">
              <li className="flex gap-2">
                <input type="checkbox" name="" id="6am" checked={depTime==="6"} onClick={()=>searchByDepartureTime("00:00","06:00")} />
                <label htmlFor="6am">Before 6 AM</label>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" name="" id="6am-12pm" checked={depTime==="6-12"} onClick={()=>searchByDepartureTime("06:00","12:00")}/>
                <label htmlFor="6am-12pm">6 AM - 12 PM</label>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" name="" id="12pm-6pm" checked={depTime==="12-18"} onClick={()=>searchByDepartureTime("12:00","18:00")} />
                <label htmlFor="12pm-6pm">12PM-6 PM</label>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" name="" id="6pm" checked={depTime==="18"} onClick={()=>searchByDepartureTime("18:00","00:00")}/>
                <label htmlFor="6pm">After 6 PM</label>
              </li>
            </ul>
          </div>
          {!smallScreen && <hr />}

          <div className="mb-2">
            <h3 className="font-medium  p-4">Stops</h3>
            <ul className="flex flex-col gap-2 ml-4">
              <li className="flex gap-2">
                <input type="checkbox"  id="direct" checked={stops === 0} onChange={()=>handleStopsChecked(0)} />
                <label htmlFor="direct">Direct</label>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" name="" id="1stop" checked={stops === 1} onChange={()=>handleStopsChecked(1)} />
                <label htmlFor="1stop">1 stop</label>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" name="" id="2+stop" checked={stops === 2} onChange={()=>handleStopsChecked(2)} />
                <label htmlFor="2+stop">2+ stops</label>
              </li>
            </ul>
          </div>
          {!smallScreen && <hr />}

          <div className="mb-4">
            <h3 className="font-medium  p-4">Preferred Airlines</h3>
            <ul className="flex flex-col gap-2 ml-4">
              <li className="flex gap-2 items-center cursor-pointer">
                <input type="checkbox" name="" id="airindia" checked={airline === "AI"} onClick={()=>handleAirlineChange("AI")} />
                <label htmlFor="airindia" className="flex gap-2 items-center">
                <img src={airindialogo} className="h-4" />
                <p>Air India</p>
                </label>
              </li>
              <li className="flex gap-2 items-center cursor-pointer">
                <input type="checkbox" name="" id="indigo" checked={airline === "6E"} onClick={()=>handleAirlineChange("6E")}/>
                <label htmlFor="indigo" className="flex gap-2 items-center ">
                <img src={indigologo} className="h-4"  />
                <p >IndiGo</p>
                </label>
              </li>
              <li className="flex gap-2 items-center cursor-pointer">
                <input type="checkbox" name="" id="spicejet" checked={airline === "SG"} onClick={()=>handleAirlineChange("SG")}/>
                <label htmlFor="spicejet" className="flex gap-2 items-center ">
                <img src={spicejetlogo} className="h-4" />
                <p>Spice Jet</p>
                </label>
              </li>
              <li className="flex gap-2 items-center cursor-pointer">
                <input type="checkbox" name="" id="vistara" checked={airline === "UK"} onClick={()=>handleAirlineChange("UK")}/>
                <label htmlFor="vistara" className="flex gap-2 items-center ">
                <img src={vistaralogo} className="h-4" />
                <p>Vistara</p>
                </label>
              </li>
            </ul>
          </div>
          {!smallScreen && <hr />}
          

          <div className="mb-2">
            <h3 className="font-medium  p-4">Sort By Price</h3>
            <ul className="flex flex-col gap-2 ml-4">
              <li className="flex gap-2">
                <input type="checkbox" name="" id="lowtohigh" checked={priceSorting == 1} onClick={()=>handleSortByPrice(1)} />
                <label htmlFor="lowtohigh">Low to High</label>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" name="" id="hightolow" checked={priceSorting == -1} onClick={()=>handleSortByPrice(-1)}/>
                <label htmlFor="hightolow">High to Low</label>
              </li>
            </ul>
          </div>
          </div>}          

        </div>

        {flights.length == 0 && <div className={`${smallScreen ? "w-[95%] mx-auto":"absolute top-[50%] left-[50%]"}`}>
           <div className="flex flex-col gap-2">
            <h3 className="font-bold text-2xl">No Flights Found</h3>
            <button onClick={handleClearFilter} className="font-bold text-lg bg-red-500 text-white rounded-lg px-2 py-4">Clear Fliters</button>
            </div>
        </div>}

        <div className={`${smallScreen? "w-screen":"w-9/12"} flex flex-col gap-4`}>
          {flights.map((flight) => {
            return (
              <Flight_Card
                key={flight._id}
                flight={flight}
                source={source}
                destination={destination}
                departureDate={departureDate}
              />
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Flight_Search_Page;
