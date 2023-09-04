import React, {ChangeEvent, FC} from "react";
import {Button} from "@mui/material";

interface IMyFileUploaderProps {
  label?: string
  value?: string | undefined
  placeholder?: string
  icon?: string
  error?: boolean
  disabled?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const MyFileUploader: FC<IMyFileUploaderProps> = (props) => {
  return (
    <>
      <Button component="label" className="standard-upload-btn">
        {props.label}
        <input type="file" hidden accept="image/*" onChange={props.onChange}/>
      </Button>
    </>
  );
}

export default MyFileUploader;