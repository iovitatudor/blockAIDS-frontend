import React, {FC, useState} from "react";
import {Box, Button, Drawer} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {ISidebarMenu, Sidebar} from "../modules/sidebar";
import {menus} from "../api/menu";


const SidebarDrawer: FC = () => {
  const [drawer, setDrawer] = useState(false);
  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  return (
    <>
      <Button style={{color: '#292D32'}} onClick={toggleDrawer}> <MenuIcon></MenuIcon></Button>
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