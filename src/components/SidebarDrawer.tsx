import React, {FC, useState} from "react";
import {Box, Button, Drawer} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const SidebarDrawer: FC = () => {
  const [drawer, setDrawer] = useState(false);
  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  return (
    <div>
      <Button onClick={toggleDrawer}> <MenuIcon></MenuIcon></Button>
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
        </Box>
      </Drawer>
    </div>
  );
}

export default SidebarDrawer;