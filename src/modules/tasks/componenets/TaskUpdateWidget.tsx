import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {MySelect, ISelectOptions} from "../../../ui/MySelect/MySelect";
import {Box, Grid, Stack} from "@mui/material";
import {SelectChangeEvent} from "@mui/material/Select";
import typeTaskIcon from '../../../ui/assets/typeTaskIcon.svg';
import organizationTaskIcon from '../../../ui/assets/organizationTaskIcon.svg';
import specialistTaskIcon from '../../../ui/assets/specialistTaskIcon.svg';
import MyTextarea from "../../../ui/MyTextarea";
import MyButton from "../../../ui/MyButton";
import MyDatePicker from "../../../ui/MyDatePicker";
import MyInput from "../../../ui/MyInput";
import DoneAlert from "../../../components/DoneAlert";
import {tasksApi} from "../../../api/tasksApi";
import {taskTypesApi} from "../../../api/taskTypesApi";
import {organizationsApi} from "../../../api/organizationsApi";
import {specialistsApi} from "../../../api/specialistsApi";
import {isErrorWithMessage, isFetchBaseQueryError} from "../../../helpers/errors";
import {useAppSelector} from "../../../hooks/redux";
import {usersApi} from "../../../api/usersApi";
import {notificationsApi} from "../../../api/notificationsApi";
import {buildOrganizations, buildSpecialists, buildTaskTypes, buildUsers} from "../services/dropDowns";
import {setNotification} from "../services/notifications";

const TaskUpdateWidget: FC = () => {
  const {id} = useParams()
  const {data: task} = tasksApi.useFetchTaskByIdQuery(Number(id));
  const {type} = useAppSelector(state => state.authReducer);
  const [updateTask] = tasksApi.useUpdateTaskMutation();
  const [createNotification] = notificationsApi.useCreateNotificationMutation();

  const [taskTypesOptions, setTaskTypesOptions] = useState<ISelectOptions[]>([]);
  const [organizationsOptions, setOrganizationsOptions] = useState<ISelectOptions[]>([]);
  const [specialistsOptions, setSpecialistsOptions] = useState<ISelectOptions[]>([]);
  const [usersOptions, setUsersOptions] = useState<ISelectOptions[]>([]);

  const {data: taskTypes} = taskTypesApi.useFetchAllTaskTypesQuery();
  const {data: organizations} = organizationsApi.useFetchAllOrganizationsQuery();
  const {data: specialists} = specialistsApi.useFetchAllSpecialistsQuery();
  const {data: users} = usersApi.useFetchAllUsersQuery();

  const [name, setName] = useState('');
  const [taskType, setTaskType] = useState('');
  const [organization, setOrganization] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [user, setUser] = useState('');
  const [dateDue, setDateDue] = useState<Date | null | undefined>(null);
  const [status, setStatus] = useState('')
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!taskTypes) return;
    setTaskTypesOptions(buildTaskTypes(taskTypes));
  }, [taskTypes])

  useEffect(() => {
    if (!organizations) return;
    setOrganizationsOptions(buildOrganizations(organizations));
  }, [organizations])

  useEffect(() => {
    if (!specialists) return;
    setSpecialistsOptions(buildSpecialists(specialists));
  }, [specialists])

  useEffect(() => {
    if (!users) return;
    setUsersOptions(buildUsers(users));
  }, [users])

  useEffect(() => {
    if (task) {
      setName(task.name);
      setTaskType(task.taskType.id.toString());
      setOrganization(task.organization.id.toString());
      setSpecialist(task.specialist.id.toString());
      setUser(task.user.id.toString());
      setDateDue(new Date(task.dateDue));
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
  const handleTaskType = (event: SelectChangeEvent) => setTaskType(event.target.value);
  const handleTaskOrganization = (event: SelectChangeEvent) => setOrganization(event.target.value);
  const handleTaskSpecialist = (event: SelectChangeEvent) => setSpecialist(event.target.value);
  const handleTaskUser = (event: SelectChangeEvent) => setUser(event.target.value);
  const handleTaskDateDue = (date: Date | null | undefined) => setDateDue(date);
  const handleTaskDescription = (event: ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value);

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    try {
      if (task) {
        const newTask = await updateTask({
          id: task.id,
          userId: task.user.id.toString(),
          specialistId: specialist,
          taskTypeId: taskType,
          organizationId: organization,
          name,
          status,
          points: 0,
          description,
          due_date: dateDue?.toISOString(),
        }).unwrap();
        await setNotification(newTask, "updated", type, createNotification);
        showSuccessAnimation();
      }
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data)
        setError(JSON.parse(errMsg).message);
      } else if (isErrorWithMessage(err)) {
        setError(err.message);
      }
    }
  }

  const showSuccessAnimation = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 1000);
  }

  return (
    <>
      {isSaved && <DoneAlert/>}
      <div className="tasks-area">
        <div className="task-create-area">
          <form action="" onSubmit={handleForm}>
            <Grid container rowSpacing={{xs: 0, sm: 2, md: 3}} columnSpacing={{xs: 0, sm: 2, md: 3}}>
              <Grid item md={12} xs={12} style={{marginBottom: '25px'}}>
                <MyInput type="text"
                         name="name"
                         required={true}
                         label="Task Name"
                         icon={typeTaskIcon}
                         value={name}
                         onChange={handleName}/>
              </Grid>
              <Grid item sm={6} xs={12}>
                <MySelect label="Type of task"
                          defaultOption="Select the task"
                          onChange={handleTaskType}
                          options={taskTypesOptions}
                          value={taskType}
                          icon={typeTaskIcon}/>
              </Grid>
              <Grid item sm={6} xs={12}>
                <MySelect label="Organization"
                          defaultOption="Select Organization"
                          onChange={handleTaskOrganization}
                          options={organizationsOptions}
                          value={organization}
                          icon={organizationTaskIcon}/>
              </Grid>
              <Grid item sm={6} xs={12}>
                {
                  type === 'user' ?
                    <MySelect label='Specialist'
                              defaultOption="Select the specialist"
                              onChange={handleTaskSpecialist}
                              options={specialistsOptions}
                              value={specialist}
                              icon={specialistTaskIcon}/>
                    :
                    <MySelect label='Patient'
                              defaultOption="Select the patient"
                              onChange={handleTaskUser}
                              options={usersOptions}
                              value={user}
                              icon={specialistTaskIcon}/>
                }

              </Grid>
              <Grid item md={6} xs={12}>
                <MyDatePicker label={'Due Date'} onChange={handleTaskDateDue} selected={dateDue}
                              placeholder="01/07/2023"></MyDatePicker>
              </Grid>
              <Grid item sm={12} xs={12}>
                <MyTextarea name="description" onChange={handleTaskDescription} value={description}
                            label="Description"></MyTextarea>
              </Grid>
              <Grid item xs={12} className="flex-center">
                {error && <Box className="error-area">{error}</Box>}
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row"
                       justifyContent="space-between"
                       alignItems="center"
                       sx={{mt: 3, mb: 2}}>
                  <MyButton>Update</MyButton>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </>
  );
}

export default TaskUpdateWidget;