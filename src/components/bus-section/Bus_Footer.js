import React from 'react';
import Divider from "@mui/material/Divider";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import paymentImage from "../../assets/payment.png";
import download from "../../assets/download.png";
import {useMediaQuery} from '@mui/material';

const Bus_Footer = () => {
  const smallScreen=useMediaQuery('(max-width:650px)');
  return (
    <div className='bg-white'>
        <div className={`grid ${smallScreen?"grid-cols-2":"grid-cols-6"} gap-16 justify-center p-10`}>
            <div className='flex flex-col gap-2'>
                <h3 className='font-bold'>Popular Bus Routes</h3>
                <p className='text-sm'>Delhi to Manali Bus</p>
                <p className='text-sm'>Jaipur to Delhi Bus</p>
                <p className='text-sm'>Chandigarh to Delhi Bus</p>
                <p className='text-sm'>Bangalore to Goa Bus</p>
                <p className='text-sm'>Mumbai to Goa Bus</p>
                <p className='text-sm'>Delhi to Dehradun Bus</p>
                <p className='text-sm'>Delhi to Chandigarh Bus</p>
                <p className='text-sm'>Bangalore to Chennai Bus</p>
                <p className='text-sm'>Hyderabad to Bangalore Bus</p>
                <p className='text-sm'>Bangalore to Hyderabad Bus</p>
                <p className='text-sm'>Delhi to Jaipur Bus</p>


            </div>
            <div className='flex flex-col gap-2'>
                <h3 className='font-bold'>Popular Bus Cities</h3>
                <p className='text-sm'>Goa Bus Tickets</p>
                <p className='text-sm'>Bangalore Bus Tickets</p>
                <p className='text-sm'>Hyderabad Bus Tickets</p>
                <p className='text-sm'>Chennai Bus Tickets</p>
                <p className='text-sm'>Delhi Bus Tickets</p>
                <p className='text-sm'>Shirdi Bus Tickets</p>
                <p className='text-sm'>Coimbatore Bus Tickets</p>
                <p className='text-sm'>Mumbai Bus Tickets</p>
                <p className='text-sm'>Manali Bus Tickets</p>
                <p className='text-sm'>Bangalore to Hyderabad Bus</p>
                <p className='text-sm'>Kolkata Bus Tickets</p>
            </div>
            <div className='flex flex-col gap-2'>
                <h3 className='font-bold'>Popular Bus Operators</h3>
                <p className='text-sm'>Greenline travels</p>
                <p className='text-sm'>Hans travels Bus</p>
                <p className='text-sm'>Shrinath® travel agency pvt. ltd. Bus</p>
                <p className='text-sm'>Parveen travels Bus</p>
                <p className='text-sm'>Vivegam travels Bus</p>
                <p className='text-sm'>Universal travels Bus</p>
                <p className='text-sm'>Vrl travels Bus</p>
                <p className='text-sm'>Republic travel Bus</p>
                <p className='text-sm'>Zingbus Bus</p>
                <p className='text-sm'>Sharma travels nanded Bus</p>
            </div>
            <div className='flex flex-col gap-2'>
                <h3 className='font-bold'>Popular RTC Bus Operators</h3>
                <p className='text-sm'>APSRTC</p>
                <p className='text-sm'>TNSTC</p>
                <p className='text-sm'>UPSRTC</p>
                <p className='text-sm'>MSRTC</p>
                <p className='text-sm'>TSRTC</p>
                <p className='text-sm'>OSRTC</p>
                <p className='text-sm'>HRTC</p>
                <p className='text-sm'>SBSTC</p>
                <p className='text-sm'>ASTC</p>
                <p className='text-sm'>GSRTC</p>
            </div>
            <div className='flex flex-col gap-2'>
                <h3 className='font-bold'>Our Products</h3>
                <p className='text-sm'>Domestic Hotels</p>
                <p className='text-sm'>International Hotels</p>
                <p className='text-sm'>Domestic Flights</p>
                <p className='text-sm'>International Flights</p>
                <p className='text-sm'>Bus Ticket Booking</p>
                <p className='text-sm'>Cab Booking</p>
                <p className='text-sm'>Train Ticket Booking</p>
                <p className='text-sm'>Route Planner</p>
                <p className='text-sm'>Destination Planner</p>
                <p className='text-sm'>Cheap Flights</p>
            </div>
            <div className='flex flex-col gap-2'>
                <h3 className='font-bold'>Company</h3>
                <p className='text-sm'>About US</p>
                <p className='text-sm'>Terms & Conditions</p>
                <p className='text-sm'>User Agreement</p>
                <p className='text-sm'>Privacy</p>
                <p className='text-sm'>Customer Support</p>
                <p className='text-sm'>Careers</p>
                <p className='text-sm'>Corporate Social Responsibility</p>
                <p className='text-sm'>FAQs</p>
                <p className='text-sm'>Advertise with Us</p>
                <p className='text-sm'>Gift Cards</p>
            </div>

        </div>
        <div className='w-10/12 mx-auto'>
        <Divider sx={{ marginY: "8px" }} />
        <div className="flex justify-between">
          <span className="flex flex-col">
            <header className="font-bold ">Follow Us</header>
            <div className="flex gap-2 text-gray-400">
              <FacebookIcon sx={{ fontSize: `${smallScreen?"25px":"35px"}` }} />
              <TwitterIcon sx={{ fontSize: `${smallScreen?"25px":"35px"}` }} />
              <YouTubeIcon sx={{ fontSize: `${smallScreen?"25px":"35px"}` }} />
            </div>
          </span>
          <span className="flex flex-col items-center">
            <header className={`${smallScreen?"font-bold text-sm":"font-bold"}`}>
              {!smallScreen && "Book Tickets fatser."}Download Our Mobile App
            </header>
            <img src={download} alt="" className={`${smallScreen?"":"w-6/12"}`} />
          </span>
          <span>
            <img src={paymentImage} alt="payment-logo" />
          </span>
        </div>
        <Divider sx={{ marginY: "8px" }} />
        </div>
    </div>
  )
}

export default Bus_Footer