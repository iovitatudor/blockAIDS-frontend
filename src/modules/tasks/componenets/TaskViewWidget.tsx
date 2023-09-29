import React, {FC} from "react";
import {Avatar, Grid} from "@mui/material";
import authorIcon from '../assets/authorIcon.svg';
import specialistIcon from '../assets/specialistIcon.svg';
import organizationIcon from '../assets/organizationIcon.svg';
import calendarIcon from '../assets/calendarIcon.svg';
import statusIcon from '../assets/statusIcon.svg';
import MyButton from "../../../ui/MyButton";
import {Link, useParams} from "react-router-dom";
import {TasksList} from "../index";
import {tasksApi} from "../../../api/tasksApi";

const TaskViewWidget: FC = () => {
  const {id} = useParams()
  const {data: task} = tasksApi.useFetchTaskByIdQuery(Number(id));

  return (
    <>
      {task &&
          <div className="tasks-area">
              <div className="tasks-view-area">
                  <h1>{task.name}</h1>
                  <p>{task.description}</p>
                  <Grid container rowSpacing={{xs: 0, sm: 2, md: 3}} columnSpacing={{xs: 0, sm: 2, md: 3}}
                        className="task-options">
                      <Grid item sm={6} xs={12} className="task-option">
                          <div className="option-label">
                              <i className="icon" style={{backgroundImage: `url(${authorIcon})`}}></i>
                              Patient
                          </div>
                          <div className="option">
                              <Avatar className="avatar" sx={{width: 32, height: 32}} src={`http://localhost:4000/${task.user.avatar}`}></Avatar>
                              <div>{task.user.name}</div>
                          </div>
                      </Grid>
                      <Grid item sm={6} xs={12} className="task-option">
                          <div className="option-label">
                              <i className="icon" style={{backgroundImage: `url(${specialistIcon})`}}></i>
                              Specialist
                          </div>
                          <div className="option">
                              <Avatar className="avatar" sx={{width: 32, height: 32}} src={`http://localhost:4000/${task.specialist.avatar}`}></Avatar>
                              <div>{task.specialist.name}</div>
                          </div>
                      </Grid>
                      <Grid item sm={6} xs={12} className="task-option">
                          <div className="option-label">
                              <i className="icon" style={{backgroundImage: `url(${organizationIcon})`}}></i>
                              Organization
                          </div>
                          <div className="option option-block">
                            {/*<b>Healthy Life Clinic,</b>*/}
                              <span>{task.organization.name}</span>
                          </div>
                      </Grid>
                      <Grid item sm={6} xs={12} className="task-option">
                          <div className="option-label">
                              <i className="icon" style={{backgroundImage: `url(${calendarIcon})`}}></i>
                              Due Time
                          </div>
                          <div className="option">
                              <span>{new Date(task.dateDue).toDateString()}</span>
                          </div>
                      </Grid>
                      <Grid item sm={6} xs={12} className="task-option">
                          <div className="option-label">
                              <i className="icon" style={{backgroundImage: `url(${statusIcon})`}}></i>
                              Status
                          </div>
                          <div className="option">
                              <span className="badge badge-progress">{task.status}</span>
                          </div>
                      </Grid>
                  </Grid>
                  <Link to={`/tasks/update/${task.id}`}>
                      <MyButton>Update Task</MyButton>
                  </Link>
              </div>
          </div>
      }
      <div>
        <TasksList heading="Tasks"></TasksList>
      </div>

    </>
  );
}

export default TaskViewWidget;