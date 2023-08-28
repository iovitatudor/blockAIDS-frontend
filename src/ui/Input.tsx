import React, {ChangeEvent, FC} from "react";
import searchIcon from "../modules/search/assets/search-icon.png";

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password'
  label?: string
  value: string | number
  name: string
  placeholder: string
  error?: boolean
  disabled?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = (props) => {
  return (
    <>
      <input
        style={{backgroundImage: `url(${searchIcon})`}}
        className="standard-input"
        {...props}
      />
      {props.error && <p className="error">Input filed can't be empty!</p>}
    </>
  );
};

export default Input;