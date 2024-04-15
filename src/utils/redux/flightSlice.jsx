import {createSlice} from "@reduxjs/toolkit";

const flightSlice=createSlice({
    name:"flight",
    initialState:{
        sourceSelectedAirport:"HYD",
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
        destinationSelectedAirport:"AMD"
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
    },
    reducers:{
        setSourceSelectedAirport:(state,action)=>{
            state.sourceSelectedAirport=action.payload;
        },
        setDestinationSelectedAirport:(state,action)=>{
            state.destinationSelectedAirport=action.payload;
        }
    }

})

export const {setSourceSelectedAirport,setDestinationSelectedAirport}=flightSlice.actions;

export default flightSlice.reducer;