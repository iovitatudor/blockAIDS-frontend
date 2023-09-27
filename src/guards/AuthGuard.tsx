import React, {FC, useEffect} from "react";
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/auth";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {checkSpecialistData} from "../store/reducers/Auth/SpecialistAuthSlice";

const AuthGuard: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {isLogged} = useAppSelector(state => state.specialistAuthReducer)

  useEffect(() => {
    dispatch(checkSpecialistData());
  }, []);

  useEffect(() => {
    if (isLogged) {
      navigate('/');
    } else {
      navigate('/auth');
    }
  }, [isLogged]);

  const auth = useAuth();
  return auth ? <Outlet/> : <Navigate to='/auth'/>
}

export default AuthGuard;