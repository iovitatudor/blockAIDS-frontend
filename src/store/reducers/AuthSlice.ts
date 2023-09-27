import {IUser} from "../../models/IUser";
import {createSlice} from "@reduxjs/toolkit";

interface IUserState {
  users: IUser[],
  isLoading: boolean,
  error: string
}

const initialState: IUserState = {
  users: [],
  isLoading: false,
  error: '',
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
})

export default authSlice.reducer;