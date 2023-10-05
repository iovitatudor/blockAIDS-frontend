import React, {ChangeEvent, FC, useEffect} from "react";
import {MySelect, ISelectOptions} from "../../../ui/MySelect/MySelect";
import {Box, Grid, Stack} from "@mui/material";
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
import {useAppSelector} from "../../../hooks/redux";
import {tasksApi} from "../../../api/tasksApi";
import {usersApi} from "../../../api/usersApi";
import {notificationsApi} from "../../../api/notificationsApi";
import MyInput from "../../../ui/MyInput";
import {isErrorWithMessage, isFetchBaseQueryError} from "../../../helpers/errors";
import DoneAlert from "../../../components/DoneAlert";
import {NotificationStatusEnum} from "../../notofications/enums/NotificationStatusEnum";
import {ITask} from "../../../models/ITask";
import {useNavigate} from "react-router-dom";

const TaskCreateWidget: FC = () => {
  const navigate = useNavigate();
  const {type, authUser} = useAppSelector(state => state.authReducer);
  const [createTask] = tasksApi.useCreateTaskMutation();
  const [createNotification] = notificationsApi.useCreateNotificationMutation();

  const [taskTypesOptions, setTaskTypesOptions] = React.useState<ISelectOptions[]>([]);
  const [organizationsOptions, setOrganizationsOptions] = React.useState<ISelectOptions[]>([]);
  const [specialistsOptions, setSpecialistsOptions] = React.useState<ISelectOptions[]>([]);
  const [usersOptions, setUsersOptions] = React.useState<ISelectOptions[]>([]);

  const {data: taskTypes} = taskTypesApi.useFetchAllTaskTypesQuery();
  const {data: organizations} = organizationsApi.useFetchAllOrganizationsQuery();
  const {data: specialists} = specialistsApi.useFetchAllSpecialistsQuery();
  const {data: users} = usersApi.useFetchAllUsersQuery();

  const [name, setName] = React.useState('');
  const [taskType, setTaskType] = React.useState('');
  const [organization, setOrganization] = React.useState('');
  const [specialist, setSpecialist] = React.useState('');
  const [user, setUser] = React.useState('');
  const [dateDue, setDateDue] = React.useState<Date | null | undefined>(null);
  const [description, setDescription] = React.useState('');
  const [error, setError] = React.useState('');
  const [isSaved, setIsSaved] = React.useState(false);

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
      name: `${specialist.name}`,
      value: specialist.id.toString(),
      icon: `http://localhost:4000/${specialist.avatar}`,
    } as ISelectOptions)));
    if (type === 'specialist') setSpecialist(authUser.id.toString());
  }, [specialists])

  useEffect(() => {
    if (!users) return;
    setUsersOptions(users.map(user => ({
      name: `${user.name}`,
      value: user.id.toString(),
      icon: `http://localhost:4000/${user.avatar}`,
    } as ISelectOptions)));
    if (type === 'user') setUser(authUser.id.toString());
  }, [users])

  const showSuccessAnimation = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 1000);
  }

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
  const handleTaskType = (event: SelectChangeEvent) => setTaskType(event.target.value);
  const handleTaskOrganization = (event: SelectChangeEvent) => setOrganization(event.target.value);
  const handleTaskSpecialist = (event: SelectChangeEvent) => setSpecialist(event.target.value);
  const handleTaskUser = (event: SelectChangeEvent) => setUser(event.target.value);
  const handleTaskDescription = (event: ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value);
  const handleTaskDateDue = (date: Date | null | undefined) => setDateDue(date);

  const handleForm = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      const newTask = await createTask({
        name,
        due_date : dateDue?.toISOString(),
        status: "In progress",
        points: 0,
        description,
        userId: user,
        specialistId: specialist,
        taskTypeId: taskType,
        organizationId: organization,
      }).unwrap();
      await setNotification(newTask);
      showSuccessAnimation();
      setTimeout(() => navigate('/tasks'), 1100);
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data)
        setError(JSON.parse(errMsg).message);
      } else if (isErrorWithMessage(err)) {
        setError(err.message);
      }
    }
  }

  const setNotification = async (task: ITask) => {
    const userMessage =
      type === 'specialist' ? `${task.specialist.name} has created ${name} task!` : `You have created ${name} task!`;
    const specialistMessage =
      type === 'specialist' ? `You have created ${name} task for ${task.user.name}!` : `${task.user.name} has created ${name} task `;

    if (task) {
      await createNotification({
        taskId: task.id,
        userId: Number(user),
        specialistId: Number(specialist),
        user_status: NotificationStatusEnum.scheduled,
        specialist_status: NotificationStatusEnum.scheduled,
        user_message: userMessage,
        specialist_message: specialistMessage,
      }).unwrap();
    }
  }

  return (
    <>
      {isSaved && <DoneAlert/>}
      <div className="tasks-area">
        <div className="task-create-area">
          <form action="" onSubmit={handleForm}>
            <Grid container rowSpacing={{xs: 0, sm: 2, md: 3}} columnSpacing={{xs: 0, sm: 2, md: 3}}>
              <Grid item md={12} xs={12} style={{marginBottom: '32px'}}>
                <MyInput type="text"
                         name="name"
                         required={true}
                         label="Task Name"
                         icon={typeTaskIcon}
                         value={name}
                         onChange={handleName}/>
              </Grid>
              <Grid item md={6} xs={12}>
                <MySelect label="Type of task"
                          defaultOption="Select the task"
                          onChange={handleTaskType}
                          options={taskTypesOptions}
                          value={taskType}
                          icon={typeTaskIcon}/>
              </Grid>
              <Grid item md={6} xs={12}>
                <MySelect label="Organization"
                          defaultOption="Select Organization"
                          onChange={handleTaskOrganization}
                          options={organizationsOptions}
                          value={organization}
                          icon={organizationTaskIcon}/>
              </Grid>
              <Grid item md={6} xs={12}>
                {type === "user" ?
                  <MySelect label="Specialist"
                            defaultOption="Select the specialist"
                            onChange={handleTaskSpecialist}
                            options={specialistsOptions}
                            value={specialist}
                            icon={specialistTaskIcon}/>
                  :
                  <MySelect label="Patient"
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
              <Grid item xs={12}>
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
                  <MyButton>Create</MyButton>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </>
  );
}

export default TaskCreateWidget;