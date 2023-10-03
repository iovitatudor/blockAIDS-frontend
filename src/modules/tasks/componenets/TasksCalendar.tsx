import React, {FC, useEffect, useState} from "react";
import "../styles/TaskCalendar.scss";

import Calendar from "react-calendar";
import MyButton from "../../../ui/MyButton";
import {Stack} from "@mui/material";
import moment from "moment";
import {tasksApi} from "../../../api/tasksApi";
import {useAppSelector} from "../../../hooks/redux";
import {TaskStatusesEnum} from "../enums/TaskStatusesEnum";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

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
  const [tooltip, setTooltip] = useState(false);
  const [value, onChange] = useState<Value>(new Date());
  const [markedDates, setMarkedDates] = useState<IMarkedDated[]>([]);
  const [calendarValue, setCalendarValue] = useState<Value>(new Date());

  useEffect(() => {
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
  }, [tasks]);

  const openTooltip = () => {
    setTooltip(!tooltip);
  }

  const closeTooltip = () => {
    setTooltip(false);
  }
  const handleCalendar = (e: any) => {
    console.log(e);
    onChange(e)
  }

  return (
    <div className="tasks-calendar">
      <p onClick={openTooltip}>
        <i className="icon"></i>
        View in calendar
      </p>
      {
        tooltip && (<>
          <div className="tooltip-background" onClick={closeTooltip}></div>
          <div className="calendar-tooltip">
            <div className="calendar-tooltip-inside">
              <h4>Set a Day</h4>
              <Calendar onChange={handleCalendar} value={calendarValue}
                        tileClassName={({date, view}) => {
                          const foundDate = markedDates.find(markedDate => markedDate.date === moment(date).format("DD-MM-YYYY"));
                          if (foundDate) {
                            return `highlight${foundDate.status}`
                          }
                        }}
              />
            </div>
            <Stack direction="row"
                   justifyContent="space-between"
                   alignItems="center"
                   sx={{mt: 3, mb: 2}}>
              <MyButton className='btn-outlined-sm' onClick={closeTooltip}>Cancel</MyButton>
              <MyButton className='btn-sm'>Next</MyButton>
            </Stack>
          </div>
        </>)
      }

    </div>
  );
}

export default TasksCalendar;