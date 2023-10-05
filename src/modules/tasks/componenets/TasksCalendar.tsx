import React, {FC, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import moment from "moment";
import Calendar from "react-calendar";
import {
  Dialog,
  DialogContent,
  Avatar,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem, ListItemAvatar, ListItemText, Button,
} from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';
import CloseIcon from '@mui/icons-material/Close';
import {tasksApi} from "../../../api/tasksApi";
import {useAppSelector} from "../../../hooks/redux";
import {TaskStatusesEnum} from "../enums/TaskStatusesEnum";
import {ITask} from "../../../models/ITask";
import "../styles/TaskCalendar.scss";
import CalendarIcon from "../assets/calendar-icon.png";

type CalendarValuePiece = Date | null;
type CalendarValue = CalendarValuePiece | [CalendarValuePiece, CalendarValuePiece];

interface IMarkedDated {
  date: string;
  status: TaskStatusesEnum;
}

const TasksCalendar: FC = () => {
  const {type, authUser} = useAppSelector(state => state.authReducer);
  let fetchTasks = tasksApi.useFetchAllTasksByUserIdQuery;
  if (type === 'specialist') {
    fetchTasks = tasksApi.useFetchAllTasksBySpecialistIdQuery;
  }
  const {data: tasks} = fetchTasks(authUser.id);

  const [displayCalendar, setDisplayCalendar] = useState(false);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [foundTasks, setFoundTasks] = useState<ITask[]>([]);
  const [chooseDate, setChooseDate] = useState('');
  const [markedDates, setMarkedDates] = useState<IMarkedDated[]>([]);
  const [calendarValue, setCalendarValue] = useState<CalendarValue>(new Date());

  useEffect(() => markTasksInCalendar(), [tasks]);

  const toggleDisplayDialog = () => setDisplayDialog(!displayDialog);
  const toggleDisplayCalendar = () => setDisplayCalendar(!displayCalendar);
  const markTasksInCalendar = () => {
    if (tasks) {
      const arrayOfDates: IMarkedDated[] = [];
      tasks.map((task) => {
        arrayOfDates.push({
          date: moment(task.dateDue).format("DD-MM-YYYY"),
          status: task.status,
        });
      });
      setMarkedDates(arrayOfDates);
    }
  }
  const handleCalendar = (e: any) => {
    if (tasks) {
      setChooseDate(moment(e).format("DD-MM-YYYY"));
      setFoundTasks(tasks.filter(task => {
        if (moment(task.dateDue).format("DD-MM-YYYY") === moment(e).format("DD-MM-YYYY")) {
          toggleDisplayDialog();
          return task;
        }
      }));
    }
  }

  return (
    <div className="tasks-calendar">
      <Button onClick={toggleDisplayCalendar} className="tasks-calendar-btn">
        <img src={CalendarIcon} alt=""/>
        View in calendar
      </Button>
      {
        displayCalendar && (<>
          <div className="tooltip-background" onClick={toggleDisplayCalendar}></div>
          <div className="calendar-tooltip">
            <div className="calendar-tooltip-inside">
              <h4>Choose a Day</h4>
              <Calendar onChange={handleCalendar} value={calendarValue}
                        tileClassName={({date, view}) => {
                          const foundDate = markedDates.find(markedDate => markedDate.date === moment(date).format("DD-MM-YYYY"));
                          if (foundDate) return `highlight${foundDate.status}`
                        }}
              />
            </div>
          </div>
        </>)
      }
      <Dialog
        open={displayDialog}
        onClose={toggleDisplayDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        className="tasks-dialog"
      >
        <DialogTitle id="alert-dialog-title" className="flex-space-between">
          {`Tasks for ${chooseDate}`}
          <CloseIcon onClick={toggleDisplayDialog}/>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>
              <List dense={true} disablePadding={true}>
                {
                  foundTasks && foundTasks.map(task => (
                    <Link to={`/tasks/view/${task.id}`}>
                      <ListItem
                        disablePadding={true}
                        secondaryAction={
                          <IconButton edge="end" aria-label="delete">
                            {<Link to={`/tasks/view/${task.id}`}><LinkIcon/></Link>}
                          </IconButton>}>
                        <ListItemAvatar>
                          <Avatar sx={{width: 32, height: 32}}
                                  src={`http://localhost:4000/${task.specialist.avatar}`}></Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={task.name}
                          secondary={task.specialist.name}
                        />
                      </ListItem>
                    </Link>
                  ))
                }
              </List>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TasksCalendar;