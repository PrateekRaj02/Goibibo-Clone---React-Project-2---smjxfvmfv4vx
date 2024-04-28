import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";


const busSlice= createSlice({
    name:"bus",
    initialState:{
        source:"Mumbai",
        destination:"Jaipur",
        day:"Mon",
        departureDate:new dayjs(),
    },
    reducers:{
        setSource:(state,action)=>{
            state.source=action.payload;
        },
        setDestination:(state,action)=>{
            state.destination=action.payload;
        },
        setDay:(state,action)=>{
            state.day=action.payload;
        },
        setDepartureDate:(state,action)=>{
            state.departureDate=action.payload;
        }
    }

})

export const {setSource,setDestination,setDay,setDepartureDate}=busSlice.actions;

export default busSlice.reducer;