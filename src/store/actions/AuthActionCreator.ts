import {createAsyncThunk} from "@reduxjs/toolkit";
import {IAuthLogin, IAuthRegister, IAuthResponse} from "../../models/IAuth";
import axios, {AxiosError} from "axios";

const backendURL = "http://localhost:4000/api";
export const register = createAsyncThunk(
  'specialistAuth/register',
  async (data: IAuthRegister, thunkAPI) => {
    try {
      const response = await axios.post<IAuthResponse[]>(`${backendURL}/auth/register`, data)
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
)

export const login = createAsyncThunk(
  'specialistAuth/login',
  async (data: IAuthLogin, thunkAPI) => {
    try {
      const response = await axios.post<IAuthResponse[]>(`${backendURL}/auth/login`, data)
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
)
