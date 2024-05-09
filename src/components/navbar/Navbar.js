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
import {setIsLoggedIn, setShowLoginSignupForm} from "../../utils/redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import LoginSignupForm from "../login/LoginSignupForm";
import Dashboard_Menu from "./Dashboard_Menu";
import MenuIcon from '@mui/icons-material/Menu';
import {useMediaQuery} from '@mui/material';
import Mobile_Navbar from "./Mobile_Navbar";

const Navbar = () => {
  const isLoggedIn=useSelector((store)=>store.auth.isLoggedIn);
  const [activeTab,setActiveTab]=useState(1);
  const [toggleMenu,setToggleMenu]=useState(false);
  const showLoginSignupForm=useSelector((store)=>store.auth.showLoginSignupForm);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const smallScreen=useMediaQuery('(max-width:650px)');

  const handleToggle=()=>{
    setToggleMenu(!toggleMenu);
  }

  const handleTripClick=()=>{
    if(isLoggedIn){
      navigate("/mytrips")
    }
  }
  const handleLogoutClick=()=>{
    localStorage.setItem("token", null);
localStorage.setItem("userDetails", null);
dispatch(setIsLoggedIn(false));
 }

  const handleLoginClick=()=>{
    dispatch(setShowLoginSignupForm(true))
  }

  return (
    <div className="bg-white flex items-center justify-between w-full p-2 z-50 relative">
      <div className={`${smallScreen && "flex justify-center"}`}>
        <div onClick={handleToggle}>
      {smallScreen && <MenuIcon sx={{color:"orange",marginLeft:"4px"}} />}
      </div>
      <img src={logo} alt="" className="h-8 ml-4" />
      </div>
      {smallScreen?(toggleMenu && <Mobile_Navbar handleToggle={handleToggle} />):<ul  className="flex items-center justify-between gap-3"  >
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
        <div className={`${isLoggedIn ? "cursor-pointer":"cursor-not-allowed"} px-2 py-3 font-bold flex items-center gap-1 text-gray-500 ${activeTab === 5 && 'border-b-2 border-sky-500'}`} onClick={handleTripClick}>
        <img src={manage} alt="plane" className="h-6" />
          Manage Booking (My Trips)
        </div>
      </ul>}
      
      {isLoggedIn == false ?(<button className="border border-blue-500 rounded-lg py-2 px-4 text-blue-500 mr-5 " onClick={handleLoginClick}>
        <AccountCircleIcon /> LOGIN / SIGNUP
      </button>) : 
      // (<button className="border border-blue-500 rounded-lg py-2 px-4 text-blue-500 mr-5 " onClick={handleLogoutClick}><AccountCircleIcon /> Signout</button>)
      <Dashboard_Menu logOut={handleLogoutClick}/>
      }
      {showLoginSignupForm && <LoginSignupForm/>}
    </div>
  );
};

export default Navbar;
