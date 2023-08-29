import React, {ChangeEvent, FC} from "react";

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password' | 'tel'
  label?: string
  value: string | number
  name: string
  placeholder?  : string
  icon?: string
  error?: boolean
  disabled?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const MyInput: FC<InputProps> = (props) => {
  return (
    <>
      {
        props.label && (
          <label className="standard-label">{props.label}</label>
        )
      }
      <input
        style={{backgroundImage: `url(${props.icon})`}}
        className="standard-input"
        {...props}
      />
      {props.error && <p className="error">Input filed can't be empty!</p>}
    </>
  );
};

export default MyInput;