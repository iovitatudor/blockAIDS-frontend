import React, {ChangeEvent, FC, useEffect} from "react";
import {MySelect, ISelectOptions} from "../../../ui/MySelect/MySelect";
import {Grid, Stack} from "@mui/material";
import {SelectChangeEvent} from "@mui/material/Select";
import typeTaskIcon from '../../../ui/assets/typeTaskIcon.svg';
import organizationTaskIcon from '../../../ui/assets/organizationTaskIcon.svg';
import specialistTaskIcon from '../../../ui/assets/specialistTaskIcon.svg';
import MyTextarea from "../../../ui/MyTextarea";
import MyButton from "../../../ui/MyButton";
import MyDatePicker from "../../../ui/MyDatePicker";
import {taskTypesApi} from "../../../api/taskTypesApi";
import {organizationsApi} from "../../../api/organizationsApi";
import {specialistsApi} from "../../../api/specialistsApi";

const TaskCreateWidget: FC = () => {
  const [taskTypesOptions, setTaskTypesOptions] = React.useState<ISelectOptions[]>([]);
  const [organizationsOptions, setOrganizationsOptions] = React.useState<ISelectOptions[]>([]);
  const [specialistsOptions, setSpecialistsOptions] = React.useState<ISelectOptions[]>([]);
  const [type, setType] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [specialist, setSpecialist] = React.useState('');
  const [dateDue, setDateDue] = React.useState<Date | null | undefined>(null);
  const [description, setDescription] = React.useState('');

  const {data: taskTypes} = taskTypesApi.useFetchAllTaskTypesQuery();
  const {data: organizations} = organizationsApi.useFetchAllOrganizationsQuery();
  const {data: specialists} = specialistsApi.useFetchAllSpecialistsQuery();

  useEffect(() => {
    if (!taskTypes) return;
    setTaskTypesOptions(taskTypes.map(taskType => ({
      name: taskType.name,
      value: taskType.id.toString()
    } as ISelectOptions)));
  }, [taskTypes])

  useEffect(() => {
    if (!organizations) return;
    setOrganizationsOptions(organizations.map(organization => ({
      name: organization.name,
      value: organization.id.toString()
    } as ISelectOptions)));
  }, [organizations])

  useEffect(() => {
    if (!specialists) return;
    setSpecialistsOptions(specialists.map(specialist => ({
      name: specialist.name,
      value: specialist.id.toString()
    } as ISelectOptions)));
  }, [specialists])

  const handleTaskType = (event: SelectChangeEvent) => setType(event.target.value);
  const handleTaskAddress = (event: SelectChangeEvent) => setAddress(event.target.value);
  const handleTaskSpecialist = (event: SelectChangeEvent) => setSpecialist(event.target.value);
  const handleTaskDescription = (event: ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value);
  const handleTaskDateDue = (date: Date | null | undefined) => setDateDue(date);


  return (
    <>
      <div className="tasks-area">
        <div className="task-create-area">
          <Grid container rowSpacing={{xs: 0, sm: 2, md: 3}} columnSpacing={{xs: 0, sm: 2, md: 3}}>
            <Grid item md={6} xs={12}>
              <MySelect label="Type of task"
                        defaultOption="Select the task"
                        onChange={handleTaskType}
                        options={taskTypesOptions}
                        value={type}
                        icon={typeTaskIcon}/>
            </Grid>
            <Grid item md={6} xs={12}>
              <MySelect label="Organization"
                        defaultOption="Select Organization"
                        onChange={handleTaskAddress}
                        options={organizationsOptions}
                        value={address}
                        icon={organizationTaskIcon}/>
            </Grid>
            <Grid item md={6} xs={12}>
              <MySelect label="Specialist/Patient"
                        defaultOption="Select the specialist"
                        onChange={handleTaskSpecialist}
                        options={specialistsOptions}
                        value={specialist}
                        icon={specialistTaskIcon}/>
            </Grid>
            <Grid item md={6} xs={12}>
              <MyDatePicker label={'Due Date'} onChange={handleTaskDateDue} selected={dateDue}
                            placeholder="01/07/2023"></MyDatePicker>
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