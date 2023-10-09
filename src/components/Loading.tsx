import React, {FC} from "react";
import {CircularProgress} from "@mui/material";

const Loading: FC = () => {
  return (
    <div className="alert-area">
      <div className="box">
        <CircularProgress color="inherit" size={24}/>
      </div>
    </div>
  )
}

export default Loading;