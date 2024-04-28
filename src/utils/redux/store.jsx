import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import flightReducer from "./flightSlice";
import hotelReducer from "./hotelSlice";
import trainReducer from "./trainSlice";
import busReducer from "./busSlice";

const store=configureStore({
    reducer:{
        auth:authReducer,
        flight:flightReducer,
        hotel:hotelReducer,
        train:trainReducer,
        bus:busReducer,
    }
})


export default store;
