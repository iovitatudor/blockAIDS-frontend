import React, {FC} from "react";
import {Avatar} from "@mui/material";
import verticalDots from "../assets/verticalDots.png";

const TasksItem: FC = () => {
  return (
    <div className="tasks-body">
      <div className="tasks-body-item lg">
        <Avatar className="avatar" alt="Remy Sharp" src="/images/temporary/user-avatar.png"
                sx={{width: 32, height: 32}}/>
        Jane Cooper
      </div>
      <div className="tasks-body-item md">Registration in Med System</div>
      <div className="tasks-body-item md">03 September, 08:00 PM</div>
      <div className="tasks-body-item sm">323</div>
      <div className="tasks-body-item sm">
        <span className="badge badge-progress">In progress</span>
      </div>
      <div className="tasks-body-item xs">
        <div className="details">
          <img src={verticalDots} alt="" height="24px" width="auto"/>
          <div className="tooltip">View/Update Task</div>
        </div>
      </div>
    </div>
  );
}

export default TasksItem;