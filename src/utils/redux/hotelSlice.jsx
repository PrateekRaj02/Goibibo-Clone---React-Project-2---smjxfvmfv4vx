import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";


const hotelSlice= createSlice({
    name:"hotel",
    initialState:{
        selectedCity:"Mumbai",
        checkinDate:new dayjs(),
        checkoutDate:new dayjs(),
        departureDate:new dayjs(),
    },
    reducers:{
        setSelectedCity:(state,action)=>{
            state.selectedCity=action.payload;
        },
        setDepartureDate:(state,action)=>{
            state.departureDate=action.payload;
        },
        setCheckInDate:(state,action)=>{
            state.checkinDate=action.payload;
        },
        setCheckOutDate:(state,action)=>{
            state.checkoutDate=action.payload;
        }
    }

})

export const {setSelectedCity,setDepartureDate,setCheckOutDate,setCheckInDate}=hotelSlice.actions;

export default hotelSlice.reducer;