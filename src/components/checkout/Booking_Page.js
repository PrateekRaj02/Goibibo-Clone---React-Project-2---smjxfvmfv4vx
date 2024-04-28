import React from 'react'
import { useParams } from 'react-router-dom'

const Booking_Page = () => {
    const params=useParams();
    console.log(params);
  return (
    <div>Booking_Page</div>
  )
}

export default Booking_Page