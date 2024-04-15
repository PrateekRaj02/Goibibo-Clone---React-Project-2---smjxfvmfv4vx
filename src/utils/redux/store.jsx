import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import flightReducer from "./flightSlice";

const store=configureStore({
    reducer:{
        auth:authReducer,
        flight:flightReducer,
    }
})


export default store;
