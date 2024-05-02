import React, { useEffect, useRef, useState } from "react";
import { baseUrl, projectId } from "../../utils/constant";
import { Select, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import OfferForYou from "../offer-fory-you-carousel/OfferForYou";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import FormControl from "@mui/material/FormControl";
import Flight_Footer from "./Flight_Footer";
import SearchOption from "./SearchOption";
import {
  setDestinationAirport,
  setDestinationSelectedAirport,
  setSelectedDay,
  setSourceAirport,
  setSourceSelectedAirport,
  setSourceCity,setDestinationCity
} from "../../utils/redux/flightSlice";
import Autocomplete from "@mui/material/Autocomplete";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";

const Flight_Page = () => {
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  // const [source, setSource] = useState("");
  // const [destination, setDestination] = useState("");
  // const [day, setDay] = useState("Mon");
  const source = useSelector((store) => store.flight.sourceSelectedAirport);
  const destination = useSelector(
    (store) => store.flight.destinationSelectedAirport
  );
  // console.log(selectedAirport);
  const [airports, setAirports] = useState([]);
  const [depatureDate, setDepartureDate] = useState(new dayjs());
  const [day,setDay]=useState("Mon");
  const dispatch = useDispatch();
  const sourceRef = useRef();
  const destinationRef = useRef();
  const navigate = useNavigate();

  // console.log(day);

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
    console.log(jsonData.data.airports);
  };

  const handleDateChange = (date) => {
    setDepartureDate(date)

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = weekDays[new dayjs(depatureDate).day()];
    setDay(dayOfWeek);
    dispatch(setSelectedDay(dayOfWeek));
  };

  

  const handleSearchClick = async () => {
    if(source === destination){
      window.alert("Source and Destination can not be same.");
      return;
    }
    // const from = sourceRef.current.value.slice(0, 3);
    // const to = destinationRef.current.value.slice(0, 3);
    // dispatch(setSourceSelectedAirport(from));
    // dispatch(setDestinationSelectedAirport(to));
    // console.log(source);
    // console.log(destination);
    const apiUrl =
      baseUrl +
      `flight?search={"source":"${source}","destination":"${destination}"}&day=${day}&limit=1000`;
    // const apiUrl=baseUrl+`airport?search={"city":"mumbai"}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        projectId: projectId,
      },
    });
    const jsonData = await response.json();
    // console.log(jsonData);
    if (response.ok) {
      navigate("/flightsearch");
    }
  };

  const handleExchange = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };

  const handleDaySelect = (e) => {
    setDay(e.target.value);
    // console.log(e.target.value);
  };

  const handleFromClick = () => {
    let from = sourceRef.current.value.slice(0, 3);
    let fromCity=sourceRef.current.value.split(", ")[1];
    dispatch(setSourceCity(fromCity));
    // console.log(fromCity);
    // console.log(sourceRef.current.value.split("-")[1]);
    dispatch(setSourceAirport(sourceRef.current.value.split("-")[1]));
    dispatch(setSourceSelectedAirport(from));
    
  };

  const handleToClick = () => {
    let to = destinationRef.current.value.slice(0, 3);
    let toCity=destinationRef.current.value.split(", ")[1];
    dispatch(setDestinationCity(toCity));
    // console.log(toCity);
    // console.log(to);
    dispatch(setDestinationAirport(destinationRef.current.value.split("-")[1]));
    dispatch(setDestinationSelectedAirport(to));
    // console.log(destinationRef.current.value.slice(0,3));
    // console.log(destination);
  };

  useEffect(() => {
    getAllAirports();
  }, []);

  return (
    <div className="-z-50">
      <div className="absolute h-3/4 w-full rounded-full bg-orange-500 -top-1/4"></div>
      <div className="w-10/12 m-auto pb-5">
        <h1 className="font-bold text-2xl text-center my-4 relative text-white z-20">
          Domestic and International Flights
        </h1>
        <div className="rounded-lg flex flex-col  bg-white shadow-md h-52 relative z-20">
          <div className="p-2 flex gap-2 font-medium text-gray-600">
            <div className="flex gap-1 bg-blue-100 rounded-2xl p-2">
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
          <div className="flex gap-4 p-2">
            <select
              name=""
              id=""
              className="w-[40%] border p-2 rounded-lg"
              onChange={handleFromClick}
              ref={sourceRef}
            >
              {airports.map((airport) => (
                <option
                  key={airport._id}
                >{`${airport.iata_code}-${airport.name}, ${airport.city}`}</option>
              ))}
            </select>
            {/* <div
              className="h-10 w-10 rounded-full self-center -mx-6 border border-gray-300 cursor-pointer 
          bg-gray-100 bg-opacity-100 flex justify-center items-center"
              onClick={handleExchange}
            >
              <CompareArrowsIcon />
            </div> */}
            {/* <TextField
              label="To"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            /> */}
            <select
              name=""
              id=""
              className="w-[40%] border rounded-lg p-2"
              onChange={handleToClick}
              ref={destinationRef}
            >
              {airports.map((airport) => (
                <option
                  key={airport._id}
                >{`${airport.iata_code}-${airport.name}, ${airport.city}`}</option>
              ))}
            </select>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Choose Date"
                disablePast
                reduceAnimations
                minDate={new dayjs()}
                maxDate={new dayjs().add(-1, "day").add(1, "year")}
                value={depatureDate}
                onChange={(date) => handleDateChange(date)}
              />
            </LocalizationProvider>
            {/* <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker label="Choose Date" 
            sx={{ width: 200 }}
						slotProps={{
							textField: {
								variant: "standard",
								InputLabelProps: { shrink: true },
							},
						}}
						format="DD MMM, dddd"
						disablePast
						reduceAnimations
						/>
            </LocalizationProvider> */}
          </div>

          {/* <div className="w-[96%] border border-gray-300 m-2 p-1 rounded-lg flex">
            <div className="w-4/12 cursor-pointer hover:bg-blue-100  border-r-2" onClick={()=>setFromOpen(true)}>
              <p>From</p>
              <p className="font-bold text-2xl">{selectedAirport.city}</p>
              <p>{selectedAirport.iata_code+"," +selectedAirport.name}</p>
              {fromOpen && <SearchOption setOpen={setFromOpen}/>}
            </div>
            <div className="w-4/12 cursor-pointer hover:bg-blue-100  border-r-2" onClick={()=>setToOpen(true)}>
              <p>To</p>
              <p className="font-bold text-2xl">City Name</p>
              <p>Code, Airport Name</p>
              {toOpen && <SearchOption setOpen={setToOpen}/>}
            </div>
          </div> */}
          <button
            className="text-white rounded-full absolute left-[40%] -bottom-8 bg-orange-600 py-4 px-8 font-bold text-xl"
            onClick={handleSearchClick}
          >
            SEARCH FLIGHTS
          </button>
        </div>

        <OfferForYou />
        <div className="flex flex-col gap-4">
          <h1 className="font-medium text-3xl ">Flight Booking FAQs</h1>
          <Accordion sx={{ borderRadius: "5px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              What are the advantages of online flight booking?
            </AccordionSummary>
            <AccordionDetails>
              Through online air ticket booking you can easily compare prices of
              multiple airlines to get your air tickets at lowest rates. Also,
              it is easy to do online flight booking as multiple payment options
              are available on websites like Goibibo.
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ borderRadius: "5px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              When should I book to get best flight ticket prices?
            </AccordionSummary>
            <AccordionDetails>
              For best flight ticket prices and flight ticket offers, it is
              recommended to book at least 3 to 4 weeks in advance for domestic
              air tickets. For international flight ticket it is recommended to
              book at least 7 to 8 weeks in advance, so that you can get the
              best flight ticket prices.
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ borderRadius: "5px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              How can I book flight tickets online?
            </AccordionSummary>
            <AccordionDetails>
              With the help of Goibibo, you can easily book both domestic flight
              tickets and international air tickets in simple steps within a few
              seconds.
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ borderRadius: "5px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Why should I make a flight booking from Goibibo?
            </AccordionSummary>
            <AccordionDetails>
              Along with an easy flight booking process, Goibibo offers various
              discounts, instant EMI options and credit/ debit card related
              offers on flight booking. By availing such benefits, you can book
              air tickets at reasonable prices.
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ borderRadius: "5px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              In how much time, my flight booking will get confirmed?
            </AccordionSummary>
            <AccordionDetails>
              After completing the air ticket booking process on Goibibo, you
              will get an instant confirmation mail and a message on the
              registered number and email id respectively.
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <Flight_Footer />
    </div>
  );
};

export default Flight_Page;
