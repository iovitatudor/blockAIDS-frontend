import React, {FC} from "react";
import {Avatar, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {logOut} from '../../../store/reducers/Auth/SpecialistAuthSlice';

const SidebarProfile: FC = () => {
  const dispatch = useAppDispatch();
  const {isLogged, specialist} = useAppSelector(state => state.specialistAuthReducer)

  const signOut = () => {
    dispatch(logOut());
  }

  return (
    <>
      {/*{!isLogged &&*/}
      {/*    <Grid container spacing={0}*/}
      {/*          direction="column"*/}
      {/*          alignItems="center">*/}
      {/*        <Grid item xs={12} className="text-center">*/}
      {/*            <Link to="/auth">*/}
      {/*                <MyButton className="btn-sm">Sign In</MyButton>*/}
      {/*            </Link>*/}
      {/*        </Grid>*/}
      {/*    </Grid>*/}
      {/*}*/}
      {isLogged &&
          <div className="profile-wrapper">
              <Grid container spacing={0}>
                  <Grid item xs={3} className="avatar-area">
                      <Link to="/profile">
                          <Avatar alt="Remy Sharp" src={specialist.avatar}
                                  sx={{width: 60, height: 60}}/>
                      </Link>
                  </Grid>
                  <Grid item xs={7} className="info-area">
                      <p className="user-name">
                          <Link to="/profile">
                            {specialist.name}
                          </Link>
                      </p>
                      <p>
                          <span className="user-status"></span>
                          <a href="#" className="user-aids" onClick={signOut}>Logout</a>
                      </p>
                  </Grid>
                  <Grid item xs={2} className="arrow-area">
                      <p className="arrow"></p>
                  </Grid>

              </Grid>
          </div>
      }
    </>
  );
}

export default SidebarProfile;