import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import {removeSession, setWithExpiry, getWithExpiry} from "../../../helpers/authSession";
import {ISpecialists} from "../../../models/ISpecialists";
import {ISpecialistAuth} from '../../../models/Auth/ISpecialistAuth';
import {SpecialistMock} from "../../../models/Mocks/Specialist";

interface ISpecialistRegister {
  name: string,
  email: string,
  password: string,
  type: string,
  organizationId?: string,
}

interface ISpecialistLogin {
  email: string,
  password: string,
  type: string,
}

interface SpecialistAuthState {
  token: string;
  specialist: ISpecialists;
  isLoading: boolean;
  isLogged: boolean,
  error: {
    message: string,
    statusCode: string,
  };
}

const initialState: SpecialistAuthState = {
  token: '',
  specialist: SpecialistMock,
  isLoading: false,
  isLogged: false,
  error: {
    message: "",
    statusCode: "",
  },
}

export const registerSpecialist = createAsyncThunk(
  'specialistAuth/register',
  async (data: ISpecialistRegister, thunkAPI) => {
    try {
      const response = await axios.post<ISpecialistAuth[]>('http://localhost:4000/api/auth/register', data)
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
)

export const loginSpecialist = createAsyncThunk(
  'specialistAuth/login',
  async (data: ISpecialistLogin, thunkAPI) => {
    try {
      const response = await axios.post<ISpecialistAuth[]>('http://localhost:4000/api/auth/login', data)
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
)

export const specialistAuthSlice = createSlice({
  name: 'specialistAuth',
  initialState,
  reducers: {
    logOut: (state) => {
      removeSession('auth');
      state.specialist = SpecialistMock;
      state.token = '';
      state.isLogged = false;
      return state;
    },
    checkSpecialistData: (state) => {
      const specialistData = getWithExpiry('auth');
      if (specialistData) {
        const parsedSpecialistData = JSON.parse(specialistData);
        state.specialist = parsedSpecialistData.specialist;
        state.token = parsedSpecialistData.token;
        state.isLogged = true;
      }
      return state;
    },
  },
  extraReducers: {
    [registerSpecialist.fulfilled.type]: (state, action: PayloadAction<ISpecialistAuth>) => {
      state.isLoading = false;
      state.error = {message: "", statusCode: ""};
      state.token = action.payload.token;
      state.specialist = action.payload.specialist;
      state.isLogged = true;
      setWithExpiry('auth', JSON.stringify({token: state.token, specialist: state.specialist}), 10800000)
    },
    [registerSpecialist.pending.type]: (state) => {
      state.isLogged = false;
      state.isLoading = true;
    },
    [registerSpecialist.rejected.type]: (state, action: PayloadAction<{ message: string, statusCode: string }>) => {
      state.isLogged = false;
      state.isLoading = false;
      state.error = action.payload
    },
    [loginSpecialist.fulfilled.type]: (state, action: PayloadAction<ISpecialistAuth>) => {
      state.isLoading = false;
      state.error = {message: "", statusCode: ""};
      state.token = action.payload.token;
      state.specialist = action.payload.specialist;
      state.isLogged = true;
      setWithExpiry('auth', JSON.stringify({token: state.token, specialist: state.specialist}), 10800000)
    },
    [loginSpecialist.pending.type]: (state) => {
      state.isLogged = false;
      state.isLoading = true;
    },
    [loginSpecialist.rejected.type]: (state, action: PayloadAction<{ message: string, statusCode: string }>) => {
      state.isLogged = false;
      state.isLoading = false;
      state.error = action.payload
    },
  }
})

export const {logOut, checkSpecialistData} = specialistAuthSlice.actions;

export default specialistAuthSlice.reducer;