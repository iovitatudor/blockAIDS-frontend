import React, {FC, useState} from "react";
import "../styles/TaskCalendar.scss";

import Calendar from "react-calendar";
import MyButton from "../../../ui/MyButton";
import {Stack} from "@mui/material";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const TasksCalendar: FC = () => {
  const [tooltip, setTooltip] = useState(false);
  const [value, onChange] = useState<Value>(new Date());
  const openTooltip = () => {
    setTooltip(!tooltip);
  }

  const closeTooltip = () => {
    setTooltip(false);
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
              <Calendar onChange={onChange} value={value}/>
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