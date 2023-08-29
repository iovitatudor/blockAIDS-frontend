import React, {FC, MouseEvent} from "react";

interface IMyButtonProps {
  children?: string
  disabled?: boolean
  className?: string
  icon?: string
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

const MyButton: FC<IMyButtonProps> = (props) => {
  return (
    <>
      <button className={`standard-button ${props.className}`} onClick={props.onClick}>
        {
          props.icon && <i className="icon" style={{backgroundImage: `url(${props.icon})`}}></i>
        }
        {props.children}
      </button>
    </>
  );
}

export default MyButton;