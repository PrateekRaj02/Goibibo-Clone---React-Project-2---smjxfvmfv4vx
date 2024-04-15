import React from "react";
import "./train.css";
import Divider from "@mui/material/Divider";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import download from "../../assets/download.png";
import paymentImage from "../../assets/payment.png";

const Train_Footer = () => {
  return (
    <div className="bg-white mt-5">
      <div className="pt-6 flex justify-between w-10/12 m-auto">
        <div className="">
          <p className="font-medium mb-4">Our Products</p>
          <ul className="flex flex-col gap-2 text-blue-600">
            <li> Domestic Hotels</li>
            <li>International Hotels</li>
            <li>Domestic Flights</li>
            <li>International Flights</li>
            <li>Bus Booking</li>
            <li>Cab Booking</li>
            <li>Train Ticket Booking</li>
            <li>Route Planner</li>
            <li>Destination Planner</li>
            <li>Goibibo Advertising Solutions</li>
          </ul>
        </div>

        <div className="">
          <p className="font-medium mb-4">Company</p>
          <ul className="flex flex-col gap-2 text-blue-600">
            <li>About Us</li>
            <li>Terms of Services</li>
            <li>User Agreement</li>
            <li>Privacy</li>
            <li>Customer Support</li>
            <li>Careers</li>
            <li>Corporate Social Responsibility</li>
            <li>Goibibo on Mobile</li>
            <li>Goibibo TV Advertisement</li>
            <li>Technology@Goibibo</li>
          </ul>
        </div>

        <div className="">
          <p className="font-medium mb-4">Travel Resources</p>
          <ul className="flex flex-col gap-2 text-blue-600">
            <li>Popular Bus Routes</li>
            <li>Airport Cabs</li>
            <li>Hotels in India</li>
            <li>Popular Airlines</li>
            <li>Goibibo Offers</li>
            <li>International Airports</li>
            <li>City Airline Routes</li>
            <li>International Travel Guide</li>
          </ul>
        </div>
      </div>

      <div className="footer-grid w-10/12 m-auto mt-5 text-sm">
        <div className="pb-5">
            <p>Top Trains</p>
            <p className="text-gray-400 mt-2">KOTA Janshtbdi (12060) |DEE Double Dcker (12985) |NDLS Shatabdi (12001) |Purushottam Express (12801) |LJN Swran Shtbd (12003) |KURJ UDZ Express (19665) |Konark Express (11020) |Intercity Express (12466) |Karnavati Express (12933) |AF AII Intercity (12195) |UDZ KURJ Express (19666) |Shatabdi Express (12010) |ADI Double Deckr (12931) |Shane Punjab (12498) |Taj Express (12279) |Amritsar Shatabdi (12014) |Taj Express (12280) |NZM JAN Shatabdi (12059) |Gujarat Express (22953) |Mewar Express (12964) |</p>
        </div>

        <div className="pb-5">
            <p>Top Train Routes</p>
            <p className="text-gray-400 mt-2">Jaipur to Jodhpur Trains |Delhi to Chandigarh Trains |Delhi to Lucknow Trains |Chandigarh to Delhi Trains |Jodhpur to Jaipur Trains |Delhi to Ahmedabad Trains |Ahmedabad to Delhi Trains |Hyderabad to Visakhapatnam Trains |Lucknow to Delhi Trains |Delhi to Kanpur Trains |Delhi to Patna Trains |Patna to Delhi Trains |Delhi to Jaipur Trains |Visakhapatnam to Hyderabad Trains |Delhi to Jodhpur Trains |Delhi to Mumbai Trains |Mumbai to Delhi Trains |Bangalore to Mysore Trains |Delhi to Goa Trains |Kalka to Shimla Trains |Pune to Goa Trains |Delhi to Agra Trains |Delhi to Lucknow Trains |Chennai to Delhi Trains |Bangalore to Hyderabad Trains |Mumbai to Ahmedabad Trains |Ahmedabad to Goa Trains |Chennai to Hyderabad Trains |Hyderabad to Bangalore Trains |Goa to Mumbai Trains |Indore to Jaipur Trains |Patna to Bangalore Trains |</p>
        </div>

        <div className="pb-5">
            <p>Top Train Stations</p>
            <p className="text-gray-400 mt-2">Kolkata Sealdah Railway Station |Chandigarh Railway Station |Lucknow Junction |Vijayawada Junction |Mumbai Borivali Railway Station |New Delhi Railway Station |Old Delhi Railway Station |Mumbai Bandra Terminus Railway Station |Ahmedabad Junction |Indore Junction Bg |Coimbatore Main Junction |Chennai Central Railway Station |Raipur Railway Station |Bhubaneswar Railway Station |Guwahati Railway Station |Nagpur Junction |Kolkata Howrah Junction |Jabalpur Junction |Visakhapatnam Railway Station |Jaipur Railway Station |</p>
        </div>

        <div className="pb-5">
            <p>Other Useful Links</p>
            <p className="text-gray-400 mt-2">Flight Offers |Popular Airports |Popular Airlines |Cabs from Chennai Airport |Cabs from Bangalore Airport |Cabs from Hyderabad Airport |Cabs from Delhi Airport |Mumbai to Pune Cab |Delhi to Jaipur Cab |Mumbai to Shirdi Cab |Delhi to Agra Cab |Cabs from Delhi |Cabs from Bangalore |UPSRTC Bus |APSRTC Bus |GSRTC Bus |Bangalore to Hyderabad Bus |Pune to Bangalore Bus |Mumbai to Pune Bus |Bangalore to Chennai Bus |Delhi to Manali Bus |</p>
        </div>
      </div>

      <div className="w-10/12 m-auto">

      <Divider sx={{ marginY: "8px" }} />
        <div className="flex justify-between">
          <span className="flex flex-col">
            <header className="font-bold ">Follow Us</header>
            <div className="flex gap-2 text-gray-400">
              <FacebookIcon sx={{ fontSize: "35px" }} />
              <TwitterIcon sx={{ fontSize: "35px" }} />
              <YouTubeIcon sx={{ fontSize: "35px" }} />
            </div>
          </span>
          <span className="flex flex-col items-center">
            <header className="font-bold ">
              Book Tickets fatser.Download Our Mobile App
            </header>
            <img src={download} alt="" className="w-6/12" />
          </span>
          <span>
            <img src={paymentImage} alt="payment-logo"/>
          </span>
        </div>
        <Divider sx={{ marginY: "8px" }} />
      </div>
    </div>
  );
};

export default Train_Footer;
