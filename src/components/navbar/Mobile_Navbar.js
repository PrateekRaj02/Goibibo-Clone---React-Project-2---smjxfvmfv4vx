import React from 'react';
import CloseIcon from "@mui/icons-material/Close";
import plane from "../../assets/plane.png";
import hotel from "../../assets/hotel.png";
import train from "../../assets/train.png";
import bus from "../../assets/bus.png";
import manage from "../../assets/manage.png";
import {  Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Mobile_Navbar = ({handleToggle}) => {
    const isLoggedIn=useSelector((store)=>store.auth.isLoggedIn);
    const navigate=useNavigate();

    const handleTripClick=()=>{
        if(isLoggedIn){
          navigate("/mytrips")
        }
      }
  return (
    <div>
        <CloseIcon
    sx={{
        color:"red",
      position: "absolute",
      fontSize: "40px",
      right: "10px",
      top:"10px",
      cursor: "pointer",
      zIndex:"40"
    }}
    onClick={() => {
        handleToggle();
    }}
  />
    <div className="w-[100%] z-30 bg-white  top-[10%] left-0 flex flex-col items-center justify-center gap-4 absolute">
        
      <Link className="px-2 py-3 font-bold flex text-gray-500"  to="/" onClick={()=>handleToggle()}>
          <img src={plane} alt="plane" className="w-10" />
          Flights
        </Link>
        <Link className="cursor-pointer px-2 py-3 flex justify-center gap-1 font-bold text-gray-500"  to="/hotel" onClick={()=>handleToggle()}>
          <img src={hotel} alt="plane" className="h-6" />
          Hotels
        </Link>
        <Link className="cursor-pointer px-2 py-3 flex items-center gap-1 font-bold text-gray-500" to="trains" onClick={()=>handleToggle()}>
        <img src={train} alt="plane" className="h-5" />
          Trains
        </Link>
        <Link className="cursor-pointer px-2 py-3 font-bold flex items-center gap-1 text-gray-500" to={"/bus"} onClick={()=>handleToggle()}>
        <img src={bus} alt="plane" className="h-5" />
          Bus
        </Link>
        <Link className="px-2 py-3 font-bold flex items-center gap-1 text-gray-500" to={"/mytrips"} onClick={()=>handleToggle()}>
        <img src={manage} alt="plane" className="h-6" />
          Manage Booking (My Trips)
        </Link>


    </div>
    </div>
  )
}

export default Mobile_Navbar