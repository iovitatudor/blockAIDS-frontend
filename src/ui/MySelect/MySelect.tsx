import React, {FC} from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import SelectIcon from './SelectIcon';
import {Avatar} from "@mui/material";

export interface ISelectOptions {
  name: string;
  value: string;
  icon?: string;
}

interface IMySelectProps {
  label?: string;
  value: string | undefined;
  defaultOption?: string;
  options: ISelectOptions[];
  icon?: string;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  onChange: (e: SelectChangeEvent) => void;
}

export const MySelect: FC<IMySelectProps> = (props) => {
  return (
    <>
      <InputLabel id="demo-simple-select-filled-label" className="standard-label">{props.label}</InputLabel>
      <Select
        IconComponent={SelectIcon}
        className={`standard-select ${props.className}`}
        value={props.value}
        onChange={props.onChange}
        displayEmpty
        inputProps={{'aria-label': 'Without label'}}
        style={{backgroundImage: `url(${props.icon})`}}
      >
        <MenuItem value="" disabled={true}>
          <em>{props.defaultOption}</em>
        </MenuItem>
        {
          props.options.map(option =>
            <MenuItem value={option.value} key={option.value}>
              {
                option.icon && <Avatar alt={option.name}
                                       sx={{width: 22, height: 22}}
                                       style={{margin: '0px 10px'}}
                                       src={option.icon}/>
              }
              {option.name}
            </MenuItem>
          )
        }
      </Select>
    </>
  );
}