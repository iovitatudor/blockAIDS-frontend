import React, {FC, useEffect} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../hooks/auth";
import {useAppDispatch} from "../hooks/redux";
import {checkAuthData} from "../store/reducers/AuthSlice";

const GuestGuard: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthData());
  }, [dispatch]);

  const auth = useAuth();
  return !auth ? <Outlet/> : <Navigate to='/'/>
}

export default GuestGuard;