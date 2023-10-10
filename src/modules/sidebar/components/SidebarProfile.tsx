import React, {FC} from "react";
import {Avatar, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {logOut} from '../../../store/reducers/AuthSlice';

const SidebarProfile: FC = () => {
  const dispatch = useAppDispatch();
  const {isLogged, authUser, type} = useAppSelector(state => state.authReducer)

  const signOut = () => {
    dispatch(logOut());
  }

  return (
    <>
      {
        isLogged &&
          <div className="profile-wrapper">
              <Grid container spacing={0}>
                  <Grid item xs={3} className="avatar-area">
                      <Link to="/profile">
                          <Avatar alt={authUser.name}
                                  src={`${process.env.REACT_APP_BACKEND_URL}/${authUser.avatar}`}
                                  sx={{width: 60, height: 60}}/>
                      </Link>
                  </Grid>
                  <Grid item xs={9} className="info-area">
                      <p className="user-name">
                          <Link to="/profile">
                            {authUser.name}
                          </Link>
                      </p>
                      <p>
                        {/*<span className="user-status"></span>*/}
                          <span className="user-aids" onClick={signOut}>Logout</span>
                      </p>
                  </Grid>
                {/*<Grid item xs={2} className="arrow-area">*/}
                {/*    <p className="arrow"></p>*/}
                {/*</Grid>*/}
              </Grid>
          </div>
      }
    </>
  );
}

export default SidebarProfile;