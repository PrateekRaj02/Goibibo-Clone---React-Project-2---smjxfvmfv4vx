import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        isLoggedIn:false,
        showLoginSignupForm:false,
        // isSignupPopup:false,
        userDetails:{name:"user",email:"user@gmail.com"},
        token:null,
    },
    reducers:{
        setIsLoggedIn:(state,action)=>{
            window.localStorage.setItem("isLoggedIn",action.payload);
            state.isLoggedIn = action.payload;
        },
        setShowLoginSignupForm:(state,action)=>{
            state.showLoginSignupForm=action.payload;
        },
        setToken:(state,action)=>{
            window.localStorage.setItem("token",JSON.stringify(action.payload));
            state.token=action.payload;
        },
        setUserDetails:(state,action)=>{

            state.userDetails=action.payload;
        }
    }

})

export const {setIsLoggedIn,setShowLoginSignupForm,setToken,setUserDetails}=authSlice.actions;

export default authSlice.reducer;