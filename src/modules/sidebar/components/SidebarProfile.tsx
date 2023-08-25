import React, {FC} from "react";
import {Avatar, Grid} from "@mui/material";
import {Link} from "react-router-dom";

const SidebarProfile: FC = () => {
  return (
    <div className="profile-wrapper">
      <Grid container spacing={0}>
        <Grid item xs={3} className="avatar-area">
          <Link to="/">
            <Avatar alt="Remy Sharp" src="/images/temporary/user-avatar.png" sx={{width: 60, height: 60}}/>
          </Link>
        </Grid>
        <Grid item xs={7} className="info-area">
          <p className="user-name">
            <Link to="/">
              Wade Warren
            </Link>
          </p>
          <p>
            <span className="user-status"></span>
            <span className="user-aids">23 Aids</span>
          </p>
        </Grid>
        <Grid item xs={2} className="arrow-area">
          <p className="arrow"></p>
        </Grid>
      </Grid>
    </div>
  );
}

export default SidebarProfile;