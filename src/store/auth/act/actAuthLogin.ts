import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosErrorHandler from "@util/axiosErrorHandler";
import axios from "axios";

type TFormData = {
    email: string;
    password: string;
}

type TResponse ={
    accessToken: string;
    user: {
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
    }
}
const actAuthLogin = createAsyncThunk("auth/actAuthLogin", async(formData: TFormData, thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try{
        const res = await axios.post<TResponse>('/login', formData);
        return res.data;
    } catch(error){
        return rejectWithValue(axiosErrorHandler(error));
    }
})

export default actAuthLogin;