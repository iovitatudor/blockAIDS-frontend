import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {removeSession, setWithExpiry, getWithExpiry} from "../../helpers/authSession";
import {SpecialistMock} from "../../models/Mocks/Specialist";
import {ISpecialist} from "../../models/ISpecialist";
import {IAuthResponse} from '../../models/IAuth';
import {IUser} from "../../models/IUser";
import {register, login} from "../actions/AuthActionCreator";

interface AuthState {
  token: string;
  id: number;
  authUser: IUser | ISpecialist;
  type: 'user' | 'specialist';
  isLoading: boolean;
  isLogged: boolean;
  error: {
    message: string,
    statusCode: string,
  }
}

const initialState: AuthState = {
  token: '',
  id: 0,
  authUser: SpecialistMock,
  type: 'user',
  isLoading: false,
  isLogged: false,
  error: {
    message: "",
    statusCode: "",
  },
}

const fulfillAuth = (state: AuthState, action: PayloadAction<IAuthResponse>) => {
  state.isLoading = false;
  state.error = {message: "", statusCode: ""};
  state.token = action.payload.token;
  state.authUser = action.payload.type === 'user' ? action.payload.user : action.payload.specialist;
  state.id = state.authUser.id;
  state.type = action.payload.type;
  state.isLogged = true;
  setWithExpiry('auth', JSON.stringify({token: state.token, authUser: state.authUser, type: state.type}), 10800000)
}

const pendingAuth = (state: AuthState, action: PayloadAction<IAuthResponse>) => {
  state.isLogged = false;
  state.isLoading = true;
}

const rejectAuth = (state: AuthState, action: PayloadAction<{ message: string, statusCode: string }>) => {
  state.isLogged = false;
  state.isLoading = false;
  state.error = action.payload
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    overwriteAuthUser: (state, action: PayloadAction<IUser | ISpecialist>) => {
      state.authUser = action.payload;
      setWithExpiry('auth', JSON.stringify({token: state.token, authUser: state.authUser, type: state.type}), 10800000)
    },
    logOut: (state) => {
      removeSession('auth');
      state.authUser = SpecialistMock;
      state.token = '';
      state.id = 0;
      state.isLogged = false;
      return state;
    },
    checkAuthData: (state) => {
      const authUserData = getWithExpiry('auth');
      if (authUserData) {
        const parsedAutUserData = JSON.parse(authUserData);
        state.authUser = parsedAutUserData.authUser;
        state.token = parsedAutUserData.token;
        state.id = state.authUser.id;
        state.type = parsedAutUserData.type;
        state.isLogged = true;
      }
      return state;
    },
  },
  extraReducers: {
    [register.fulfilled.type]: fulfillAuth,
    [register.pending.type]: pendingAuth,
    [register.rejected.type]: rejectAuth,
    [login.fulfilled.type]: fulfillAuth,
    [login.pending.type]: pendingAuth,
    [login.rejected.type]: rejectAuth,
  }
})

export const {logOut, checkAuthData, overwriteAuthUser} = authSlice.actions;

export default authSlice.reducer;