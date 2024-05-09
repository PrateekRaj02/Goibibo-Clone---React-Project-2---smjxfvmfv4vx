import React from "react";
import Divider from "@mui/material/Divider";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import paymentImage from "../../assets/payment.png";
import download from "../../assets/download.png";
import {useMediaQuery} from '@mui/material';

const Flight_Footer = () => {
  const smallScreen=useMediaQuery('(max-width:650px)');
  return (
    <div className="bg-white">
      <div className="w-10/12 m-auto p-2">
        <div className={`${smallScreen?"grid grid-cols-2":"flex justify-between"}`}>
          <div className="flex flex-col gap-2 my-4">
            <header className="mb-2 font-bold text-sm">OUR PRODUCTS</header>
            <ul className="text-sm text-gray-400">
              <li>Domestic Hotels</li>
              <li>International Hotels</li>
              <li>Domestic Flights</li>
              <li>International Flights</li>
              <li>Multi-City Flights</li>
              <li>Couple Friendly Hotels</li>
              <li>Nearby Getaways</li>
              <li>Bus Booking</li>
              <li>Cab Booking</li>
              <li>Airport Cabs Booking</li>
              <li>Outstation Cabs Booking</li>
              <li>Train Booking</li>
              <li>Go Stay</li>
              <li>Trip Money</li>
              <li>Goibibo Advertising Solutions</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2 my-4">
            <header className="mb-2 font-bold text-sm">ABOUT US</header>
            <ul className="text-sm text-gray-400">
              <li>About Us</li>
              <li>Investor Relations</li>
              <li>Management</li>
              <li>Terms of Services</li>
              <li>User Agreement</li>
              <li>Privacy</li>
              <li>Careers</li>
              <li>YouTube Channel</li>
              <li>Technology@Goibibo</li>
              <li>Customer Support</li>
              <li>Facebook Page</li>
              <li>Twitter Handle</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2 my-4">
            <header className="mb-2 font-bold text-sm">
              TRAVEL ESSENTIALS
            </header>
            <ul className="text-sm text-gray-400">
              <li>PNR Status</li>
              <li>Offers</li>
              <li>Airline Routes</li>
              <li>Train Running</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2 my-4">
            <header className="mb-2 font-bold text-sm">MORE LINKS</header>
            <ul className="text-sm text-gray-400">
              <li>Cheap Flights</li>
              <li>Hotels Near Me</li>
              <li>My Bookings</li>
              <li>Cancellation</li>
              <li>My Account</li>
              <li>Advertise with Us</li>
            </ul>
          </div>
        </div>
        <Divider sx={{ marginY: "8px" }} />

        <div className="flex flex-col gap-1">
          <div>
            <span className="text-gray-400 text-sm">
              <b>Popular Flight</b> Sector Kolkata to Delhi Flight | Hyderabad
              to Delhi Flight | Chennai to Hyderabad Flight | Delhi to Guwahati
              Flight | Lucknow to Delhi Flight | Nagpur to Mumbai Flight |
              Ranchi to Delhi Flight | Ahmedabad to Goa Flight | Mumbai to
              Chandigarh Flight | Pune to Kolkata Flight | Bangalore to
              Bhubaneshwar Flight | Bangalore to Guwahati Flight | Chennai to
              Goa Flight | Chennai to Kolkata Flight | Delhi to Jaipur Flight |
              Delhi to Leh Flight | Hyderabad to Goa Flight | Bangalore to
              Ranchi Flight | Delhi to Bagdogra Flight | Srinagar to Delhi
              Flight
            </span>
          </div>

          <div>
            <span className="text-gray-400 text-sm">
              <b>Top Routes</b> Chandigarh to Delhi Flight | Delhi to Bhopal
              Flight | Delhi to Dehradun Flight | Delhi to Udaipur Flight |
              Hyderabad to Tirupati Flight | Kolkata to Chennai Flight | Kolkata
              to Guwahati Flight | Mumbai to Amritsar Flight | Mumbai to
              Dehradun Flight | Indore to Goa Flight | Jaipur to Delhi Flight |
              Kolkata to Bagdogra Flight | Patna to Bangalore Flight | Varanasi
              to Delhi Flight | Ahmedabad to Kolkata Flight | Delhi to Gorakhpur
              Flight | Guwahati to Kolkata Flight | Indore to Bangalore Flight |
              Jaipur to Pune Flight | Mumbai to Raipur Flight
            </span>
          </div>

          <div>
            <span className="text-gray-400 text-sm">
              <b>Popular Domestic Routes</b> Patna to Kolkata Flight | Ranchi to
              Bangalore Flight | Patna to Delhi Flight | Bangalore to Goa Flight
              | Delhi to Ranchi Flight | Pune to Nagpur Flight | Chennai to
              Coimbatore Flight | Delhi to Srinagar Flight | Goa to Mumbai
              Flight | Hyderabad to Bangalore Flight | Indore to Delhi Flight |
              Kolkata to Mumbai Flight | Mumbai to Nagpur Flight | Mumbai to
              Varanasi Flight | Pune to Goa Flight | Bangalore to Chennai Flight
              | Bangalore to Jaipur Flight | Chennai to Bangalore Flight |
              Chennai to Madurai Flight | Delhi to Indore Flight
            </span>
          </div>

          <div>
            <span className="text-gray-400 text-sm">
              <b>Top Sectors</b> Delhi to Jammu Flight | Delhi to Varanasi
              Flight | Hyderabad to Chennai Flight | Hyderabad to Mumbai Flight
              | Jaipur to Mumbai Flight | Bangalore to Srinagar Flight | Bhopal
              to Chennai Flight | Chandigarh to Mumbai Flight | Coimbatore to
              Ahmedabad Flight | Coimbatore to Bangalore Flight | Coimbatore to
              Mumbai Flight | Delhi to Chandigarh Flight | Delhi to Coimbatore
              Flight | Delhi to Raipur Flight | Hyderabad to Kolkata Flight |
              Hyderabad to Vijaywada Flight | Lucknow to Ahmedabad Flight |
              Madurai to Chennai Flight
            </span>
          </div>

          <div>
            <span className="text-gray-400 text-sm">
              <b>Top Airline Sectors</b> Delhi to Goa Indigo Flight | Delhi to
              Mumbai Indigo Flight | Mumbai to Delhi Air India Flight | Delhi to
              Mumbai Air India Flight | Delhi to Goa Air India Flight | Mumbai
              to Delhi Vistara Flight | Bangalore to Delhi Indigo Flight | Delhi
              to Mumbai Vistara Flight | Delhi to Bangalore Indigo Flight |
              Mumbai to Delhi Indigo Flight | Delhi to Hyderabad Spicejet Flight
              | Delhi to Bangalore Air India Flight | Kolkata to Delhi Indigo
              Flight | Delhi to Kolkata Indigo Flight | Delhi to Patna Indigo
              Flight | Pune to Delhi Indigo Flight | Kolkata to Bangalore Indigo
              Flight | Bangalore to Delhi Air India Flight | Bangalore to Mumbai
              Indigo Flight | Mumbai to Goa Indigo Flight
            </span>
          </div>

          <div>
            <span className="text-gray-400 text-sm">
              <b>New Udaan Sectors</b> Guwahati to Rupsi Flight | Rupsi to
              Kolkata Flight | Guwahati to Agartala Flight | Agartala to
              Dibrugarh Flight | Dibrugarh to Agartala Flight | Agartala to
              Guwahati Flight | Guwahati to Pasighat Flight | Pasighat to
              Shillong Flight | Shillong to Pasighat Flight | Pasighat to
              Guwahati Flight
            </span>
          </div>
        </div>

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

export default Flight_Footer;
