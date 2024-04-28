import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";


const trainSlice=createSlice({
    name:"train",
    initialState:{
        from:"Delhi",
        to:"Salem",
        day:"Mon",
        departureDate:new dayjs(),
    },
    reducers:{
        setFromStation:(state,action)=>{
            state.from=action.payload;
        },
        setToStation:(state,action)=>{
            state.to=action.payload;
        },
        setDay:(state,action)=>{
            state.day=action.payload;
        },
        setDepartureDate:(state,action)=>{
            state.departureDate=action.payload;
        }
    }
})

export const {setFromStation,setToStation,setDay,setDepartureDate}=trainSlice.actions;

export default trainSlice.reducer;