import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        isLogin:window.localStorage.getItem("isLogin"),
        isLoginPopup:false,
        isSignupPopup:false,
        token:null,
    },
    reducers:{
        setIsLogin:(state,action)=>{
            window.localStorage.setItem("isLogin",true);
            state.isLogin = action.payload;
        },
        setIsLoginPopup:(state,action)=>{
            state.isLoginPopup=action.payload;
        },
    }

})

export const {setIsLogin,setIsLoginPopup}=authSlice.actions;

export default authSlice.reducer;