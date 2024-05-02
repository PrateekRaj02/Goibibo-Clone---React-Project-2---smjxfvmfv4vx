import { createSlice } from "@reduxjs/toolkit";

const paymentSlice=createSlice({
    name:"payment",
    initialState:{
        amount:0,
        paymentIsPending:false,
    },
    reducers:{
        setAmount:(state,action)=>{
            state.amount=action.payload;
        },
        setPaymentIsPending:(state,action)=>{
            state.paymentIsPending=action.payload;
        }
    }


})

export const {setAmount,setPaymentIsPending}=paymentSlice.actions;

export default paymentSlice.reducer;