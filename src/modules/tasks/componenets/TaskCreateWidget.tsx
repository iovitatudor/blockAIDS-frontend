import React, {ChangeEvent, FC} from "react";
import {MySelect, ISelectOptions} from "../../../ui/MySelect/MySelect";
import {Grid, Stack} from "@mui/material";
import {SelectChangeEvent} from "@mui/material/Select";
import typeTaskIcon from '../../../ui/assets/typeTaskIcon.svg';
import organizationTaskIcon from '../../../ui/assets/organizationTaskIcon.svg';
import specialistTaskIcon from '../../../ui/assets/specialistTaskIcon.svg';
import dateDueTaskIcon from '../../../ui/assets/dateDueTaskIcon.svg';
import MyTextarea from "../../../ui/MyTextarea";
import MyButton from "../../../ui/MyButton";
// import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
// import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import MyDatePicker from "../../../ui/MyDatePicker";

const mockOptions: ISelectOptions[] = [
  {
    name: 'one',
    value: '1',
  },
  {
    name: 'two',
    value: '2',
  },
  {
    name: 'three',
    value: '3',
  }
];

const TaskCreateWidget: FC = () => {
  const [type, setType] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [specialist, setSpecialist] = React.useState('');
  // const [dateDue, setDateDue] = React.useState('');
  const [dateDue, setDateDue] = React.useState<Date | null>(null);

  const [description, setDescription] = React.useState('');
  const handleTaskType = (event: SelectChangeEvent) => setType(event.target.value);
  const handleTaskAddress = (event: SelectChangeEvent) => setAddress(event.target.value);
  const handleTaskSpecialist = (event: SelectChangeEvent) => setSpecialist(event.target.value);
  const handleTaskDescription = (event: ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value);
  const handleTaskDateDue = (date: Date | null) => setDateDue(date);

  return (
    <>
      <div className="tasks-area">
        <div className="task-create-area">
          <Grid container rowSpacing={{xs: 0, sm: 2, md: 3}} columnSpacing={{xs: 0, sm: 2, md: 3}}>
            <Grid item md={6} xs={12}>
              <MySelect label="Type of task"
                        defaultOption="Select the task"
                        onChange={handleTaskType}
                        options={mockOptions}
                        value={type}
                        icon={typeTaskIcon}/>
            </Grid>
            <Grid item md={6} xs={12}>
              <MySelect label="Address"
                        defaultOption="Select Organization"
                        onChange={handleTaskAddress}
                        options={mockOptions}
                        value={address}
                        icon={organizationTaskIcon}/>
            </Grid>
            <Grid item md={6} xs={12}>
              <MySelect label="Specialist/Patient"
                        defaultOption="Select the specialist"
                        onChange={handleTaskSpecialist}
                        options={mockOptions}
                        value={specialist}
                        icon={specialistTaskIcon}/>
            </Grid>
            <Grid item md={6} xs={12}>
              <MyDatePicker label={'Due Date'} onChange={handleTaskDateDue} selected={dateDue} placeholder="01/07/2023"></MyDatePicker>
            </Grid>
            <Grid item xs={12}>
              <MyTextarea name="description" onChange={handleTaskDescription} value={description}
                          label="Description"></MyTextarea>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row"
                     justifyContent="space-between"
                     alignItems="center"
                     sx={{mt: 3, mb: 2}}>
                {/*<MyButton className='btn-outlined'>Cancel</MyButton>*/}
                <MyButton>Create</MyButton>
              </Stack>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default TaskCreateWidget;