import React, {FC} from "react";
import {Avatar} from "@mui/material";
import verticalDots from "../assets/verticalDots.png";
import {Link} from "react-router-dom";

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
      <div className="tasks-body-item xs">323</div>
      <div className="tasks-body-item sm">
        <span className="badge badge-progress">In progress</span>
      </div>
      <div className="tasks-body-item xs">
        <div className="details">
          <img src={verticalDots} alt="" height="24px" width="auto"/>
          <div className="tooltip">
            <Link to="/tasks/view">View Task</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TasksItem;