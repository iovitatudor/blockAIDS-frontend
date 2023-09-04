import React, {FC} from "react";
import InputLabel from "@mui/material/InputLabel";
import DatePicker from "react-datepicker";
import "../styles/datepicker.scss";

interface IMyDatePickerProps {
  label?: string;
  selected: Date | null;
  error?: boolean;
  disabled?: boolean;
  onChange: (date: Date | null) => void;
  placeholder?: string;
}

const MyDatePicker: FC<IMyDatePickerProps> = (props) => {
  return (
    <>
      <InputLabel id="demo-simple-select-filled-label" className="standard-label">
        {props.label}
      </InputLabel>
      <DatePicker
        className="standard-date-picker"
        dateFormat="dd/MM/yyyy"
        selected={props.selected}
        onChange={props.onChange}
        placeholderText={props.placeholder}
      />
    </>
  );
}

export default MyDatePicker;