import React, {ChangeEvent, FC} from "react";

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password' | 'tel'
  label?: string
  value: string | number
  name: string
  placeholder?: string
  icon?: string
  error?: string
  disabled?: boolean
  required?: boolean
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
      {props.error && <p className="error">{props.error}</p>}
    </>
  );
};

export default MyInput;