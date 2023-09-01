import React, {FC} from "react";
import {Avatar} from "@mui/material";
import verticalDots from "../assets/verticalDots.png";
import {Link} from "react-router-dom";
import {BrowserView, MobileView} from 'react-device-detect';

const TasksItem: FC = () => {
  return (
    <>
      <BrowserView className="tasks-body desktop-device">
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
            <div className="tooltip">
              <Link to="/tasks/view">View Task</Link>
            </div>
          </div>
        </div>
      </BrowserView>

      <MobileView className="tasks-body mobile-device">
        <div className="task-top-mobile">
          <div className="avatar-area">
            <Avatar className="avatar" alt="Remy Sharp" src="/images/temporary/user-avatar.png"
                    sx={{width: 56, height: 56}}/>
          </div>
          <div className="info-area">
            <div className="tasks-item-name">Jane Cooper</div>
            <div className="tasks-item-organization">Registration in Med System</div>
          </div>
          <div className="options-area">
            <div className="tasks-item-points">323</div>
            <div className="tasks-body-item">
              <div className="details">
                <img src={verticalDots} alt="" height="21px" width="auto"/>
                <div className="tooltip">
                  <Link to="/tasks/view">View Task</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="task-bottom-mobile">
          <div className="tasks-item-date">03 September</div>
          <div className="tasks-item-time">08:00 PM</div>
          <div className="tasks-body-item">
            <span className="badge badge-progress">In progress</span>
          </div>
        </div>
      </MobileView>
    </>
  );
}

export default TasksItem;