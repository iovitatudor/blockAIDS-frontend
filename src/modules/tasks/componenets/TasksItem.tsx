import React, {FC} from "react";
import {Avatar} from "@mui/material";
import verticalDots from "../assets/verticalDots.png";
import {Link} from "react-router-dom";
import {BrowserView, MobileView} from 'react-device-detect';
import {ITask} from "../../../models/ITask";
import {useAppSelector} from "../../../hooks/redux";
import {TaskStatusesEnum} from "../enums/TaskStatusesEnum";

interface ITasksItemProps {
  task: ITask,
}

const TasksItem: FC<ITasksItemProps> = ({task}) => {
  const {type, authUser} = useAppSelector(state => state.authReducer);

  return (
    <>
      <BrowserView className="tasks-body desktop-device">
        {
          type === "specialist" &&
            <div className="tasks-body-item lg">
                <Avatar className="avatar"
                        alt={task.user.name}
                        src={`http://localhost:4000/${task.user.avatar}`}
                        sx={{width: 32, height: 32}}/>
              {task.user.name}
            </div>
        }
        {
          type === "user" &&
            <div className="tasks-body-item lg">
                <Avatar className="avatar"
                        alt={task.specialist.name}
                        src={`http://localhost:4000/${task.specialist.avatar}`}
                        sx={{width: 32, height: 32}}/>
              {task.specialist.name}
            </div>
        }
        <div className="tasks-body-item md">{task.name}</div>
        <div className="tasks-body-item md">{new Date(task.dateDue).toDateString()}</div>
        <div className="tasks-body-item sm">{task.taskType.reward} SOL</div>
        <div className="tasks-body-item sm">
          {task.status === TaskStatusesEnum.InProgress && <span className="badge badge-progress">{task.status}</span>}
          {task.status === TaskStatusesEnum.Done && <span className="badge badge-done">{task.status}</span>}
          {task.status === TaskStatusesEnum.Overdue && <span className="badge badge-overdue">{task.status}</span>}
          {task.status === TaskStatusesEnum.Undone && <span className="badge badge-undone">{task.status}</span>}

        </div>
        <div className="tasks-body-item xs">
          <div className="details">
            <img src={verticalDots} alt="" height="24px" width="auto"/>
            <div className="tooltip">
              <Link to={`/tasks/view/${task.id}`}>View Task</Link>
            </div>
          </div>
        </div>
      </BrowserView>

      <MobileView className="tasks-body mobile-device">
        <div className="task-top-mobile">
          <div className="avatar-area">
            {
              type === "specialist" &&
                <Avatar className="avatar" alt={task.user.name} src={`http://localhost:4000/${task.user.avatar}`}
                        sx={{width: 56, height: 56}}/>
            }
            {
              type === "user" &&
                <Avatar className="avatar" alt={task.specialist.name}
                        src={`http://localhost:4000/${task.specialist.avatar}`}
                        sx={{width: 56, height: 56}}/>
            }
          </div>
          <div className="info-area">
            <div className="tasks-item-name">{type === 'specialist' ? task.user.name : task.specialist.name}</div>
            <div className="tasks-item-organization">{task.organization.name}</div>
          </div>
          <div className="options-area">
            <div className="tasks-item-points">323</div>
            <div className="tasks-body-item">
              <div className="details">
                <img src={verticalDots} alt="" height="21px" width="auto"/>
                <div className="tooltip">
                  <Link to={`/tasks/view/${task.id}`}>View Task</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="task-bottom-mobile">
          <div className="tasks-item-date">{new Date(task.dateDue).toDateString()}</div>
          {/*<div className="tasks-item-time">08:00 PM</div>*/}
          <div className="tasks-body-item">
            <span className="badge badge-progress">{task.status}</span>
          </div>
        </div>
      </MobileView>
    </>
  );
}

export default TasksItem;