import React, {FC, useState} from "react";
import {Box, Button, Drawer} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {Sidebar} from "../modules/sidebar";
import {menus} from "../api/menu";
import MenuIcon1 from '../styles/assets/MenuIcon.svg';

const SidebarDrawer: FC = () => {
  const [drawer, setDrawer] = useState(false);
  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

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