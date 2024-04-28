import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";


const hotelSlice= createSlice({
    name:"hotel",
    initialState:{
        selectedCity:"Mumbai",
        checkinDate:new dayjs(),
        checkoutDate:new dayjs()
    },
    reducers:{
        setSelectedCity:(state,action)=>{
            state.selectedCity=action.payload;
        }
    }

})

export const {setSelectedCity}=hotelSlice.actions;

export default hotelSlice.reducer;