import {createSlice} from "@reduxjs/toolkit";
import dayjs from "dayjs";

const flightSlice=createSlice({
    name:"flight",
    initialState:{
        sourceSelectedAirport:"HYD",
        sourceAirport:"Rajiv Gandhi International Airport",
        sourceCity:"Hyderabad",
        // sourceSelectedAirport:{
        //     additional_info:{
        //         elevation:617,
        //         timezone:"IST"
        //     },
        //     city:"Hyderabad",
        //     coordinates:{
        //         latitude:17.2403,
        //         longitude:78.4294,
        //     },
        //     country:"India",
        //     iata_code:"HYD",
        //     icao_code:"VOHS",
        //     name:"Rajiv Gandhi International Airport",
        //     __v:0,
        //     _id:"6514309e348f6fafa1b86600"
        // },
        destinationSelectedAirport:"AMD",
        destinationAirport:"Sardar Vallabhbhai Patel International Airport",
        destinationCity:"Ahmedabad",
        // destinationSelectedAirport:{
        //     additional_info:{
        //         elevation:55,
        //         timezone:"IST"
        //     },
        //     city:"Ahmedabad",
        //     coordinates:{
        //         latitude:23.0738,
        //         longitude:72.6347,
        //     },
        //     country:"India",
        //     iata_code:"AMD",
        //     icao_code:"VAAH",
        //     name:"Sardar Vallabhbhai Patel International Airport",
        //     __v:0,
        //     _id:"6514309e348f6fafa1b86601"
        // },
        day:"Mon",
        departureDate:new dayjs(),
    },
    reducers:{
        setSourceSelectedAirport:(state,action)=>{
            state.sourceSelectedAirport=action.payload;
        },
        setDestinationSelectedAirport:(state,action)=>{
            state.destinationSelectedAirport=action.payload;
        },
        setSelectedDay:(state,action)=>{
            state.day=action.payload;

        },
        setSourceAirport:(state,action)=>{
            state.sourceAirport=action.payload;
        },
        setDestinationAirport:(state,action)=>{
            state.destinationAirport=action.payload;
        },
        setSourceCity:(state,action)=>{
            state.sourceCity=action.payload;
        },
        setDestinationCity:(state,action)=>{
            state.destinationCity=action.payload;
        },
        setDepartureDate:(state,action)=>{
            state.departureDate=action.payload;
        }
    }

})

export const {setSourceSelectedAirport,setDestinationSelectedAirport,setSelectedDay,setSourceAirport,setDestinationAirport,setSourceCity,setDestinationCity,setDepartureDate}=flightSlice.actions;

export default flightSlice.reducer;