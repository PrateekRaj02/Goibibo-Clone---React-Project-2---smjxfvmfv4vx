import React, { useState } from "react";
import Flight_Page from "../flight-section/Flight_Page";
import logo from "../../assets/goibibo logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import plane from "../../assets/plane.png";
import hotel from "../../assets/hotel.png";
import train from "../../assets/train.png";
import bus from "../../assets/bus.png";
import manage from "../../assets/manage.png";
import {useDispatch,useSelector} from "react-redux";
import {setShowLoginSignupForm} from "../../utils/redux/authSlice";
import { Link } from "react-router-dom";
import LoginSignupForm from "../login/LoginSignupForm";


const Navbar = () => {
  const [activeTab,setActiveTab]=useState(1);
  const showLoginSignupForm=useSelector((store)=>store.auth.showLoginSignupForm);
  const dispatch=useDispatch();

  const handleLoginClick=()=>{
    dispatch(setShowLoginSignupForm(true))
  }

  return (
    <div className="bg-white flex items-center justify-between w-full p-2 z-50 relative">
      <img src={logo} alt="" className="h-8 ml-4" />
      <ul  className="flex items-center justify-between gap-3"  >
        <Link className={`cursor-pointer px-2 py-3 font-bold flex text-gray-500 ${activeTab === 1 && 'border-b-2 border-sky-500'}`} onClick={()=>setActiveTab(1)} to="/">
          <img src={plane} alt="plane" className="w-10" />
          Flights
        </Link>
        <Link className={`cursor-pointer px-2 py-3 flex justify-center gap-1 font-bold text-gray-500 ${activeTab === 2 && 'border-b-2 border-sky-500'}`} onClick={()=>setActiveTab(2)} to="/hotel">
          <img src={hotel} alt="plane" className="h-6" />
          Hotels
        </Link>
        <Link className={`cursor-pointer px-2 py-3 flex items-center gap-1 font-bold text-gray-500 ${activeTab === 3 && 'border-b-2 border-sky-500'}`} onClick={()=>setActiveTab(3)} to="/trains">
        <img src={train} alt="plane" className="h-5" />
          Trains
        </Link>
        <Link className={`cursor-pointer px-2 py-3 font-bold flex items-center gap-1 text-gray-500 ${activeTab === 4 && 'border-b-2 border-sky-500'}`} onClick={()=>setActiveTab(4)} to="/bus">
        <img src={bus} alt="plane" className="h-5" />
          Bus
        </Link>
        <li className="cursor-pointer px-2 py-3 font-bold flex items-center gap-1 text-gray-500">
        <img src={manage} alt="plane" className="h-6" />
          Manage Booking (My Trips)
        </li>
      </ul>
      <button className="border border-blue-500 rounded-lg py-2 px-4 text-blue-500 mr-5 " onClick={handleLoginClick}>
        <AccountCircleIcon /> LOGIN / SIGNUP
      </button>
      {showLoginSignupForm && <LoginSignupForm/>}
    </div>
  );
};

export default Navbar;
