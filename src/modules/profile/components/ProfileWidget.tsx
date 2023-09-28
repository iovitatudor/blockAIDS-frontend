import React, {FC, useEffect, useState} from "react";
import {useAppSelector} from "../../../hooks/redux";
import ProfileUser from "./ProfileUser";
import ProfileSpecialist from "./ProfileSpecialist";
import '../styles/Profile.scss';

const ProfileWidget: FC = () => {
  const {authUser, type} = useAppSelector(state => state.authReducer)

  return (
    <>
      {type === 'user' && <ProfileUser/>}
      {type === 'specialist' && <ProfileSpecialist/>}
    </>
  );
}

export default ProfileWidget;