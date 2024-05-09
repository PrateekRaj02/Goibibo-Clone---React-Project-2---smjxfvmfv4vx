import React, { useEffect, useState } from 'react'
import { baseUrl, projectId } from '../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setShowLoginSignupForm } from '../../utils/redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { Date_Component } from './Date_Component';

const My_Trips = () => {
  const [bookings, setBookings] = useState([]);
    const token=JSON.parse(window.localStorage.getItem("token"))
    const isLoggedIn=useSelector((store)=>store.auth.isLoggedIn);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    // console.log(token);

    const fetchTrips= async ()=>{
        const apiUrl=baseUrl+`booking`;
        const response=await fetch(apiUrl,{
            method:"GET",
            headers:{
                Authorization: `Bearer ${token}`,
                projectId:projectId,
            }
        })
        const jsonData=await response.json();
        // console.log(jsonData);
        if(response.ok){
          setBookings(jsonData.data);
        }
    }
    const handleClick=()=>{
      navigate("/");
    }
    useEffect(()=>{
        fetchTrips();
    },[])
    useEffect(()=>{
        if(!isLoggedIn){
          navigate("/");
          dispatch(setShowLoginSignupForm(true))
        }
      },[isLoggedIn])
  return (
    <div className='pb-4'>
      {bookings.length == 0 && (
        <>
      <div className='text-2xl bg-blue-300 mt-10 text-center h-screen w-11/12 mx-auto rounded-lg p-4'>No Trips for Now Book a Trip</div>
      <div className='flex justify-center'>
    <button onClick={handleClick} className='py-4 px-2 bg-orange-500 text-white rounded-lg mt-4'>Go to Home</button>
    </div>
    </>
    )}
    {
      bookings.length > 0 && (
        <div>
    <h2 className="text-2xl my-8 text-center">Booking Details</h2>
    <table className="w-10/12 border-collapse mx-auto border border-solid border-black">
      <thead>
        <tr>
          <th className="w-[20%] p-2 text-center border border-solid border-black">User Name</th>
          <th className="p-2 text-center w-[15%] border border-solid border-black">Start Date</th>
          <th className="p-2 text-center w-[15%] border border-solid border-black">End Date</th>
          <th className="p-2 text-center w-[15%] border border-solid border-black">Status</th>
          <th className="p-2 text-center w-[15%] border border-solid border-black">Booking Type</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map(booking => (
          <React.Fragment key={booking._id}>
            <tr>
                <td className='p-2 text-center border border-solid border-black'>{booking.user.name}</td>
                <td className='p-2 text-center border border-solid border-black'><Date_Component dateVal = { booking.start_date } /></td>
                <td className='p-2 text-center border border-solid border-black'><Date_Component dateVal = { booking.end_date } /></td>
                <td className='p-2 text-center border border-solid border-black'>{booking.status}</td>
                <td className='p-2 text-center border border-solid border-black'>
                    {booking.booking_type}
                    {booking.booking_type === 'hotel' && (
                    <React.Fragment>
                        <br />
                        <span className="bg-gray-300">Hotel Name: {booking.hotel && booking.hotel.name}</span>
                    </React.Fragment>
                    )}
                </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
        </div>
      )
    }

    </div>
  )
}

export default My_Trips