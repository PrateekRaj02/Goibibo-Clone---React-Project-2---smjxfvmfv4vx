import React, { useEffect, useState } from "react";
import { baseUrl, projectId } from "../../utils/constant";
import airindialogo from "../../assets/airlines/AI.png";
import vistaralogo from "../../assets/airlines/UK.png";
import indigologo from "../../assets/airlines/6E.png";
import spicejetlogo from "../../assets/airlines/SG.png";
import gofirstlogo from "../../assets/airlines/G8.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import Flight_Detail from "./Flight_Detail";
import {useMediaQuery} from '@mui/material';

const Flight_Card = ({ flight, source, destination,departureDate  }) => {
  const { _id } = flight;
  let airlineImg, airlineName, flightName;
  const [detailTab, setDetailTab] = useState(0);
  const [flightDetail, setFlightDetail] = useState({});
  const [expandDetail, setExpandDetail] = useState(false);
  const navigate=useNavigate();
  const {arrivalTime,departureTime}=flight;
  const smallScreen=useMediaQuery('(max-width:650px)');

  const depDate = departureDate
    .hour(+departureTime.slice(0, 2))
    .minute(+departureTime.slice(3, 5));
    
  let arrDate = depDate
    .hour(+arrivalTime.slice(0, 2))
    .minute(+arrivalTime.slice(3, 5));

  switch (flight.flightID.slice(0, 2).toUpperCase()) {
    case "6E":
      airlineImg = indigologo;
      airlineName = "INDIGO";
      flightName = "6E-" + flight.flightID.split("-")[2];
      break;
    case "AI":
      airlineImg = airindialogo;
      airlineName = "AIR INDIA";
      flightName = "AI-" + flight.flightID.split("-")[2];
      break;
    case "G8":
      airlineImg = gofirstlogo;
      airlineName = "GO FIRST";
      flightName = "GO" + flight.flightID.split("-")[2];
      break;
    case "SG":
      airlineImg = spicejetlogo;
      airlineName = "SPICE JET";
      flightName = "SG-" + flight.flightID.split("-")[2];
      break;
    case "UK":
      airlineImg = vistaralogo;
      airlineName = "VISTARA";
      flightName = "UK-" + flight.flightID.split("-")[2];
      break;
  }
  // console.log(airlineName, flightName);

  const fetchFlightDetail = async () => {
    const apiUrl = baseUrl + `flight/${_id}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        projectId: projectId,
      },
    });
    const jsonData = await response.json();
    // console.log(jsonData);
    setFlightDetail(jsonData.data);
  };

  const handleToggle = () => {
    setExpandDetail(!expandDetail);
  };

  const handleBook=()=>{
    const data={...flight, source, destination,depDate,arrDate};
    const encodedFlightDetails = encodeURIComponent(JSON.stringify(data));
    navigate(`/booking/flight/${encodedFlightDetails}`);


  }

  useEffect(() => {
    fetchFlightDetail();
  }, []);

    return (
      <div className=' rounded-2xl shadow-lg bg-white py-8 px-4'>
          <div className='flex gap-2 my-2'>
              <img src={airlineImg} className='h-4' />
              <p className='text-sm'>{airlineName}</p>
          </div>

          {smallScreen && <div className='flex justify-between items-center gap-1 mb-2'>
              <h2 className='font-bold text-lg'>{source} to {destination}</h2>
              <p className="text-xs font-bold">{flight.flightID}</p>
          </div>}

          <div className='flex justify-between'>

            {!smallScreen && <div className='flex flex-col gap-1'>
              <h2 className='font-bold text-lg'>{source} to {destination}</h2>
              <p className="text-xs font-bold">{flight.flightID}</p>
            </div>}
            <div>
              <p className='font-bold text-gray-400 text-lg'>Duration</p>
              <p className='font-bold'>{flight.duration} h</p>
            </div>
            <div>
              <p className='font-bold text-gray-400 text-lg'>Departure Time</p>
              <p className='font-bold'>{flight.departureTime}</p>
            </div>
            <div>
              <p className='font-bold text-gray-400 text-lg'>Stops</p>
              <p className='font-bold'>{flight.stops}</p>
            </div>
            <div>
              <p className='font-bold text-gray-400 text-lg'>Ticket Price</p>
              <p className='font-bold'>₹ {flight.ticketPrice}</p>
            </div>
            {!smallScreen && <div className='p-4 bg-orange-500 text-white rounded-lg font-bold'>
              <button onClick={handleBook}>Book Now</button>
            </div>}

          </div>

          {smallScreen && <div className='p-3 my-5 w-[80%] mx-auto bg-orange-400 text-white rounded-lg font-bold flex justify-center'>
              <button onClick={handleBook}>Book Now</button>
            </div>}

          <div className='flex justify-between mt-2 text-sm '>
              <p className='text-gray-500'>Free Meal</p>
              <p className='text-blue-500 font-medium cursor-pointer' onClick={handleToggle}>Flight Details {expandDetail?<ExpandLessIcon/>:<ExpandMoreIcon/>}</p>
          </div>

          <div>
              {expandDetail &&
  <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs
              value={detailTab}
              onChange={(e, v) => setDetailTab(v)}
              aria-label="basic tabs example"
            >
              <Tab disableRipple label="FLIGHT DETAILS" />
              <Tab disableRipple label="BAGGAGE" />
            </Tabs>
          </Box>
          <CustomTabPanel
            className="custom-tab"
            value={detailTab}
            index={0}
          >
            <Flight_Detail {...{airlineImg, airlineName, flightName, source, destination, arrivalTime,departureTime}}  />
          </CustomTabPanel>
          <CustomTabPanel className="custom-tab" value={detailTab} index={1}>
            <Table
              sx={{
                borderColor: "#ffffff",
                
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{
                      color: " rgba(0,0,0,.38)",
                      fontSize: "12px",
                      p: 1,
                    }}
                  >
                    Flight
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: " rgba(0,0,0,.38)",
                      fontSize: "12px",
                      p: 1,
                    }}
                  >
                    Cabin Baggage
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: " rgba(0,0,0,.38)",
                      fontSize: "12px",
                      p: 1,
                    }}
                  >
                    Check-in Baggage
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    bgcolor: "#f3f3f3",
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      gap: 1,
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={airlineImg}
                      style={{
                        width: "50px",
                        height: airlineName == "AIR INDIA" ? "50px" : "40px",
                      }}
                    />
                    <Box>
                      <Typography fontSize={"18px"}>
                        {source}-{destination}
                      </Typography>
                      <Typography fontSize={"14px"} fontWeight={600}>
                        {airlineName} {flightName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    {flightDetail.ticketPrice <= 2250
                      ? "7 kg (1 piece per pax)"
                      : "10 kg (1 piece per pax)"}
                  </TableCell>
                  <TableCell align="right">
                    {flightDetail.ticketPrice <= 2250
                      ? "15 kilograms (1 piece per pax)"
                      : "20 kilograms (1 piece per pax)"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CustomTabPanel>
        </Box>

              }

          </div>

      </div>
    )
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default Flight_Card;
