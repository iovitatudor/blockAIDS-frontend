import React, {FC} from "react";
import {Avatar, Grid} from "@mui/material";
import authorIcon from '../assets/authorIcon.svg';
import specialistIcon from '../assets/specialistIcon.svg';
import organizationIcon from '../assets/organizationIcon.svg';
import calendarIcon from '../assets/calendarIcon.svg';
import statusIcon from '../assets/statusIcon.svg';
import MyButton from "../../../ui/MyButton";
import {Link} from "react-router-dom";
import {TasksList} from "../index";

const TaskViewWidget: FC = () => {
  return (
    <>
      <div className="tasks-area">
        <div className="tasks-view-area">
          <h1>Registration in Med System</h1>
          <h2>Description</h2>
          <p>
            To begin the registration process at hospital located at 2118 Thornridge Cir. Syracuse, Connecticut 35624,
            patients provide their personal information and medical history, ensuring accurate records for quality care.
          </p>
          <Grid container spacing={3} className="task-options">
            <Grid item xs={6} className="task-option">
              <div className="option-label">
                <i className="icon" style={{backgroundImage: `url(${authorIcon})`}}></i>
                Author
              </div>
              <div className="option">
                <Avatar className="avatar" sx={{width: 32, height: 32}}></Avatar>
                <div>Wade Warren</div>
              </div>
            </Grid>
            <Grid item xs={6} className="task-option">
              <div className="option-label">
                <i className="icon" style={{backgroundImage: `url(${specialistIcon})`}}></i>
                Specialist
              </div>
              <div className="option">
                <Avatar className="avatar" sx={{width: 32, height: 32}}></Avatar>
                <div>Dr. Bessie Cooper</div>
              </div>
            </Grid>
            <Grid item xs={6} className="task-option">
              <div className="option-label">
                <i className="icon" style={{backgroundImage: `url(${organizationIcon})`}}></i>
                Organization
              </div>
              <div className="option">
                <b>Healthy Life Clinic,</b>
                <span>7529 E. Pecan St.7529 E. Pecan </span>
              </div>
            </Grid>
            <Grid item xs={6} className="task-option">
              <div className="option-label">
                <i className="icon" style={{backgroundImage: `url(${calendarIcon})`}}></i>
                Due Time
              </div>
              <div className="option">
                <span>03 September, 08:00 PM</span>
              </div>
            </Grid>
            <Grid item xs={6} className="task-option">
              <div className="option-label">
                <i className="icon" style={{backgroundImage: `url(${statusIcon})`}}></i>
                Status
              </div>
              <div className="option">
                <span className="badge badge-progress">In progress</span>
              </div>
            </Grid>
          </Grid>
          <Link to="/tasks/update">
            <MyButton>Update Text</MyButton>
          </Link>
        </div>
      </div>
      <div>
        <TasksList heading="Tasks"></TasksList>
      </div>
    </>
  );
}

export default TaskViewWidget;