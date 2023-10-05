import React, {FC, useState} from "react";
import {
  Avatar,
  Button,
  DialogContentText,
  Dialog,
  DialogActions,
  DialogContent,
  Menu
} from "@mui/material";
import verticalDots from "../assets/verticalDots.png";
import {Link} from "react-router-dom";
import {BrowserView, MobileView} from 'react-device-detect';
import {ITask} from "../../../models/ITask";
import {useAppSelector} from "../../../hooks/redux";
import {TaskStatusesEnum} from "../enums/TaskStatusesEnum";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {tasksApi} from "../../../api/tasksApi";
import {NotificationStatusEnum} from "../../notofications/enums/NotificationStatusEnum";
import {notificationsApi} from "../../../api/notificationsApi";

interface ITasksItemProps {
  task: ITask,
}

const TasksItem: FC<ITasksItemProps> = ({task}) => {
  const {type} = useAppSelector(state => state.authReducer);
  const [deleteTask] = tasksApi.useDeleteTaskMutation();
  const [updateTask] = tasksApi.useUpdateTaskMutation();
  const [createNotification] = notificationsApi.useCreateNotificationMutation();

  const [displayRemoveDialog, setDisplayRemoveDialog] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const anchorOpen = Boolean(anchorEl);
  const [statusEl, setStatusEl] = useState<null | HTMLElement>(null);
  const statusOpen = Boolean(statusEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleStatusClick = (event: React.MouseEvent<HTMLButtonElement>) => setStatusEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleStatusClose = () => setStatusEl(null);

  const toggleDisplayRemoveDialog = () => {
    setDisplayRemoveDialog(!displayRemoveDialog);
  };

  const handleRemoveTask = () => {
    deleteTask(task.id);
    toggleDisplayRemoveDialog();
  }

  const handleChangeStatus = (status: TaskStatusesEnum) => {
    updateTask({id: task.id, status});
    setNotification(task);
    handleStatusClose();
  }

  const setNotification = (task: ITask) => {
    const userMessage =
      type === 'specialist' ? `${task.specialist.name} has changed status of ${task.name} task!` : `You have changed status of ${task.name} task!`;
    const specialistMessage =
      type === 'specialist' ? `You have changed status of ${task.name} task for ${task.user.name}!` : `${task.user.name} has changed status of ${task.name} task `;

    if (task) {
      createNotification({
        taskId: task.id,
        userId: Number(task.user.id),
        specialistId: Number(task.specialist.id),
        user_status: NotificationStatusEnum.scheduled,
        specialist_status: NotificationStatusEnum.scheduled,
        user_message: userMessage,
        specialist_message: specialistMessage,
      });
    }
  }

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
          <Button
            id="status-button"
            aria-controls={statusOpen ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={statusOpen ? 'true' : undefined}
            onClick={handleStatusClick}
            style={{textTransform: 'none'}}
          >
            {task.status === TaskStatusesEnum.InProgress && <span className="badge badge-progress">{task.status}</span>}
            {task.status === TaskStatusesEnum.Done && <span className="badge badge-done">{task.status}</span>}
            {task.status === TaskStatusesEnum.Overdue && <span className="badge badge-overdue">{task.status}</span>}
            {task.status === TaskStatusesEnum.Undone && <span className="badge badge-undone">{task.status}</span>}
          </Button>
          <Menu
            id="status-menu"
            anchorEl={statusEl}
            open={statusOpen}
            onClose={handleStatusClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem style={{fontSize: '12px'}} onClick={() => handleChangeStatus(TaskStatusesEnum.InProgress)}>
              <span className="badge badge-progress" style={{width: '100px'}}>{TaskStatusesEnum.InProgress}</span>
            </MenuItem>
            <MenuItem style={{fontSize: '12px'}} onClick={() => handleChangeStatus(TaskStatusesEnum.Done)}>
              <span className="badge badge-done" style={{width: '100px'}}>{TaskStatusesEnum.Done}</span>
            </MenuItem>
            <MenuItem style={{fontSize: '12px'}} onClick={() => handleChangeStatus(TaskStatusesEnum.Undone)}>
              <span className="badge badge-undone" style={{width: '100px'}}>{TaskStatusesEnum.Undone}</span>
            </MenuItem>
            <MenuItem style={{fontSize: '12px'}} onClick={() => handleChangeStatus(TaskStatusesEnum.Overdue)}>
              <span className="badge badge-overdue" style={{width: '100px'}}>{TaskStatusesEnum.Overdue}</span>
            </MenuItem>
          </Menu>
        </div>
        <div className="tasks-body-item xs">
          <div className="details">
            <Button
              id="basic-button"
              aria-controls={anchorOpen ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={anchorOpen ? 'true' : undefined}
              onClick={handleMenuClick}
            >
              <img src={verticalDots} alt="" height="24px" width="auto"/>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={anchorOpen}
              onClose={handleMenuClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem>
                <Link to={`/tasks/view/${task.id}`} className="context-link">
                  <VisibilityIcon sx={{width: 15, height: 15}}/> View Task
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to={`/tasks/update/${task.id}`} className="context-link">
                  <UpdateIcon sx={{width: 15, height: 15}}/> Update Task
                </Link>
              </MenuItem>
              <MenuItem>
                <p className="context-link" onClick={toggleDisplayRemoveDialog}>
                  <DeleteIcon sx={{width: 15, height: 15}}/> Delete Task
                </p>
              </MenuItem>
            </Menu>
            <Dialog
              open={displayRemoveDialog}
              onClose={toggleDisplayRemoveDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure?
                  This task will not be deleted restored.
                </DialogContentText>
              </DialogContent>
              <DialogActions style={{justifyContent: 'center'}}>
                <Button onClick={handleRemoveTask} variant="contained"
                        style={{backgroundColor: '#13C2BD', color: '#FFF'}}>Confirm</Button>
                <Button onClick={toggleDisplayRemoveDialog} variant="contained"
                        style={{backgroundColor: '#13C2BD', color: '#FFF'}}>Cancel</Button>
              </DialogActions> <br/>
            </Dialog>
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
            <div className="tasks-item-points">{task.taskType.reward} SOL</div>
            <div className="tasks-body-item">
              <div className="details">
                <Button
                  id="basic-button"
                  aria-controls={anchorOpen ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={anchorOpen ? 'true' : undefined}
                  onClick={handleMenuClick}
                >
                  <img src={verticalDots} alt="" height="24px" width="auto"/>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={anchorOpen}
                  onClose={handleMenuClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem>
                    <Link to={`/tasks/view/${task.id}`} className="context-link">
                      <VisibilityIcon sx={{width: 15, height: 15}}/> View Task
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to={`/tasks/update/${task.id}`} className="context-link">
                      <UpdateIcon sx={{width: 15, height: 15}}/> Update Task
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <p className="context-link" onClick={toggleDisplayRemoveDialog}>
                      <DeleteIcon sx={{width: 15, height: 15}}/> Delete Task
                    </p>
                  </MenuItem>
                </Menu>
                <Dialog
                  open={displayRemoveDialog}
                  onClose={toggleDisplayRemoveDialog}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure?
                      This task will not be deleted restored.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions style={{justifyContent: 'center'}}>
                    <Button onClick={handleRemoveTask} variant="contained"
                            style={{backgroundColor: '#13C2BD', color: '#FFF'}}>Confirm</Button>
                    <Button onClick={toggleDisplayRemoveDialog} variant="contained"
                            style={{backgroundColor: '#13C2BD', color: '#FFF'}}>Cancel</Button>
                  </DialogActions> <br/>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
        <div className="task-bottom-mobile">
          <div className="tasks-item-date">{new Date(task.dateDue).toDateString()}</div>
          <div className="tasks-body-item">
            <Button
              id="status-button"
              aria-controls={statusOpen ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={statusOpen ? 'true' : undefined}
              onClick={handleStatusClick}
              style={{textTransform: 'none'}}
            >
              {task.status === TaskStatusesEnum.InProgress && <span className="badge badge-progress">{task.status}</span>}
              {task.status === TaskStatusesEnum.Done && <span className="badge badge-done">{task.status}</span>}
              {task.status === TaskStatusesEnum.Overdue && <span className="badge badge-overdue">{task.status}</span>}
              {task.status === TaskStatusesEnum.Undone && <span className="badge badge-undone">{task.status}</span>}
            </Button>
            <Menu
              id="status-menu"
              anchorEl={statusEl}
              open={statusOpen}
              onClose={handleStatusClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem style={{fontSize: '12px'}} onClick={() => handleChangeStatus(TaskStatusesEnum.InProgress)}>
                <span className="badge badge-progress" style={{width: '100px'}}>{TaskStatusesEnum.InProgress}</span>
              </MenuItem>
              <MenuItem style={{fontSize: '12px'}} onClick={() => handleChangeStatus(TaskStatusesEnum.Done)}>
                <span className="badge badge-done" style={{width: '100px'}}>{TaskStatusesEnum.Done}</span>
              </MenuItem>
              <MenuItem style={{fontSize: '12px'}} onClick={() => handleChangeStatus(TaskStatusesEnum.Undone)}>
                <span className="badge badge-undone" style={{width: '100px'}}>{TaskStatusesEnum.Undone}</span>
              </MenuItem>
              <MenuItem style={{fontSize: '12px'}} onClick={() => handleChangeStatus(TaskStatusesEnum.Overdue)}>
                <span className="badge badge-overdue" style={{width: '100px'}}>{TaskStatusesEnum.Overdue}</span>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </MobileView>
    </>
  );
}

export default TasksItem;