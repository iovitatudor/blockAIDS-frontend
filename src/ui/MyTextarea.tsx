import React, {ChangeEvent, FC} from "react";

interface IMyTextareaProps {
  label?: string
  value?: string | number
  name: string
  placeholder?: string
  error?: boolean
  disabled?: boolean
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

const MyTextarea: FC<IMyTextareaProps> = (props) => {
  return (
    <>
      <label className="standard-label">{props.label}</label>
      <textarea className="standard-textarea"
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                disabled={props.disabled}
                onChange={props.onChange}>
      </textarea>
    </>
  )
}

export default MyTextarea;