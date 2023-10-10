import React, {FC, useEffect, useState} from "react";
import {Avatar, Box, Grid, Stack} from "@mui/material";
import MyFileUploader from "../../../ui/MyFileUploader";
import MyInput from "../../../ui/MyInput";
import userIcon from "../assets/userIcon.svg";
import emailIcon from "../assets/emailIcon.svg";
import MyButton from "../../../ui/MyButton";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {overwriteAuthUser} from "../../../store/reducers/AuthSlice";
import DoneAlert from "../../../components/DoneAlert";
import {specialistsApi} from "../../../api/specialistsApi";
import {organizationsApi} from "../../../api/organizationsApi";
import {ISelectOptions, MySelect} from "../../../ui/MySelect/MySelect";
import organizationTaskIcon from "../../../ui/assets/organizationTaskIcon.svg";
import {SelectChangeEvent} from "@mui/material/Select";
import {isErrorWithMessage, isFetchBaseQueryError} from "../../../helpers/errors";

const ProfileUser: FC = () => {
  const dispatch = useAppDispatch();

  const {authUser} = useAppSelector(state => state.authReducer)
  const {data: currentUser} = specialistsApi.useFetchSpecialistByIdQuery(authUser.id);
  const [updateSpecialist] = specialistsApi.useUpdateSpecialistMutation();

  const {data: organizations} = organizationsApi.useFetchAllOrganizationsQuery();
  const [organizationsOptions, setOrganizationsOptions] = React.useState<ISelectOptions[]>([]);
  const [organizationId, setOrganizationId] = useState('');

  const [name, setName] = useState(authUser.name);
  const [email, setEmail] = useState(authUser.email);
  const [jobPosition, setJobPosition] = useState('');
  const [avatar, setAvatar] = React.useState('');
  const [file, setFile] = React.useState<File>();
  const [isSaved, setIsSaved] = React.useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!organizations) return;
    setOrganizationsOptions(organizations.map(organization => ({
      name: organization.name,
      value: organization.id.toString()
    } as ISelectOptions)));
  }, [organizations])

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setOrganizationId(currentUser.organizationId);
      setJobPosition(currentUser.jobPosition);
      setAvatar(currentUser.avatar);
      dispatch(overwriteAuthUser(currentUser));
    }
  }, [currentUser])

  const showSuccessAnimation = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 1000);
  }
  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);

  const handleOrganizationId = (event: SelectChangeEvent) => setOrganizationId(event.target.value);

  const handleJobPosition = (event: React.ChangeEvent<HTMLInputElement>) => setJobPosition(event.target.value);

  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => event.target.files && setFile(event.target.files[0]);

  const handleForm = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    try {
      await updateSpecialist({
        id: authUser.id, name, email, avatar: '', file, jobPosition, organizationId,
      }).unwrap();
      showSuccessAnimation();
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data)
        setError(JSON.parse(errMsg).message);
      } else if (isErrorWithMessage(err)) {
        setError(err.message);
      }
    }
  }

  return (
    <div className="profile-area">
      {isSaved && <DoneAlert/>}
      <div className="profile-picture">
        <div className="avatar">
          <Avatar src={`${process.env.REACT_APP_BACKEND_URL}/${avatar}`} sx={{width: '120px', height: '120px'}}></Avatar>
        </div>
        <div className="upload-form">
          <h3>Profile Picture</h3>
          <MyFileUploader onChange={onSelectFile} label="Choose a picture"></MyFileUploader>
        </div>
      </div>
      <div>
      </div>
      <form action="" onSubmit={handleForm}>
        <Grid rowSpacing={{xs: 0, sm: 2, md: 3}} columnSpacing={{xs: 0, sm: 2, md: 3}} className="profile-fields">
          <Grid item sm={6} xs={12} className="profile-field">
            <MyInput type='text'
                     name='name'
                     label='Full Name'
                     required={true}
                     icon={userIcon}
                     value={name}
                     onChange={handleName}/>
          </Grid>
          <Grid item sm={6} xs={12} className="profile-field">
            <MyInput type='email'
                     name='email'
                     label='Email address'
                     required={true}
                     icon={emailIcon}
                     value={email}
                     onChange={handleEmail}/>
          </Grid>
          <Grid item xs={12} className="profile-field">
            <MySelect label="Organization"
                      defaultOption="Select Organization"
                      onChange={handleOrganizationId}
                      options={organizationsOptions}
                      value={organizationId}
                      className="margin-0"
                      icon={organizationTaskIcon}/>
          </Grid>
          <Grid item sm={6} xs={12} className="profile-field">
            <MyInput type='text'
                     name='job-position'
                     label='Job Position'
                     required={true}
                     icon={emailIcon}
                     value={jobPosition}
                     onChange={handleJobPosition}/>
          </Grid>
          <Grid item xs={12} className="flex-center">
            {error && <Box className="error-area">{error}</Box>}
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row"
                   justifyContent="space-between"
                   alignItems="center"
                   sx={{mt: 3, mb: 2}}>
              <MyButton>Update profile</MyButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
export default ProfileUser;