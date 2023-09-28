import React, {FC, useEffect} from "react";
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/auth";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {checkAuthData} from "../store/reducers/AuthSlice";

const GuestGuard: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {isLogged} = useAppSelector(state => state.authReducer)

  useEffect(() => {
    dispatch(checkAuthData());
  }, [dispatch]);

  useEffect(() => {
    if (isLogged) {
      navigate('/');
    } else {
      navigate('/auth');
    }
  }, [isLogged, navigate])

  const auth = useAuth();
  return !auth ? <Outlet/> : <Navigate to='/'/>
}

export default GuestGuard;