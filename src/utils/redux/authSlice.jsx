import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        isLogin:window.localStorage.getItem("isLogin"),
        showLoginSignupForm:false,
        // isSignupPopup:false,
        token:null,
    },
    reducers:{
        setIsLogin:(state,action)=>{
            window.localStorage.setItem("isLogin",true);
            state.isLogin = action.payload;
        },
        setShowLoginSignupForm:(state,action)=>{
            state.showLoginSignupForm=action.payload;
        },
    }

})

export const {setIsLogin,setShowLoginSignupForm}=authSlice.actions;

export default authSlice.reducer;