import React, {FC, useState} from "react";
import {Box, Button, Drawer} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {Sidebar} from "../modules/sidebar";
import {getMenus} from "../models/Mocks/Menu";
import MenuIcon1 from '../styles/assets/MenuIcon.svg';
import {notificationsApi} from "../api/notificationsApi";
import {useAppSelector} from "../hooks/redux";

const SidebarDrawer: FC = () => {
  const {authUser, type} = useAppSelector(state => state.authReducer)

  let fetchNotifications = notificationsApi.useFetchScheduledNotificationsByUserIdQuery;

  if (type === 'specialist') {
    fetchNotifications = notificationsApi.useFetchScheduledNotificationsBySpecialistIdQuery;
  }

  const {data: notifications,} = fetchNotifications(authUser.id);
  const [drawer, setDrawer] = useState(false);
  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const menus = getMenus(notifications?.length);

  return (
    <>
      <div onClick={toggleDrawer} className="mobile-bar-view">
        <i className="icon" style={{backgroundImage: `url(${MenuIcon1})`}}></i>
        Menu
      </div>

      <Button style={{color: '#292D32'}} onClick={toggleDrawer} className="tablet-bar-view">
        <MenuIcon></MenuIcon>
      </Button>

      <Drawer
        anchor="left"
        open={drawer}
        onClose={toggleDrawer}
      >
        <Box
          sx={{width: 300}}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <Sidebar menus={menus}/>
        </Box>
      </Drawer>
    </>
  );
}

export default SidebarDrawer;