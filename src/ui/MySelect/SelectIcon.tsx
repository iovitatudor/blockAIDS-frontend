import React, {FC} from "react";
import {SelectProps} from '@mui/material/Select';
import selectIcon from "../assets/selectIcon.svg";

const SelectIcon: FC = (props: SelectProps) => {
  return <img src={selectIcon} alt=""  style={{marginRight: '16px'}}/>
};

export default SelectIcon;