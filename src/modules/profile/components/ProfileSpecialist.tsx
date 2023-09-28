import React, {FC, useEffect, useState} from "react";
import {Avatar, Grid, Stack} from "@mui/material";
import MyFileUploader from "../../../ui/MyFileUploader";
import MyInput from "../../../ui/MyInput";
import userIcon from "../assets/userIcon.svg";
import emailIcon from "../assets/emailIcon.svg";
import MyButton from "../../../ui/MyButton";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {overwriteAuthUser} from "../../../store/reducers/AuthSlice";
import DoneAlert from "../../../components/DoneAlert";
import {specialistsApi} from "../../../api/specialistsApi";

const ProfileUser: FC = () => {
  const dispatch = useAppDispatch();
  const {authUser, type} = useAppSelector(state => state.authReducer)
  const {data: currentUser} = specialistsApi.useFetchSpecialistByIdQuery(authUser.id);
  const [updateSpecialist, {}] = specialistsApi.useUpdateSpecialistMutation();
  const [name, setName] = useState(authUser.name);
  const [email, setEmail] = useState(authUser.email);
  const [jobPosition, setJobPosition] = useState('');
  const [avatar, setAvatar] = React.useState('');
  const [file, setFile] = React.useState<File>();
  const [isSaved, setIsSaved] = React.useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setJobPosition(currentUser.jobPosition);
      setAvatar(currentUser.avatar);
      dispatch(overwriteAuthUser(currentUser));
    }
  }, [currentUser])

  const toggleIsSaved = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 1000);
  }
  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handleJobPosition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobPosition(event.target.value);
  }

  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  }

  const handleForm = (event: React.FormEvent) => {
    event.preventDefault();
    updateSpecialist({
      name, email, avatar: '', id: authUser.id, file, jobPosition,
      organization: null
    });
    toggleIsSaved();
  }

  return (
    <div className="profile-area">
      {isSaved && <DoneAlert/>}
      <div className="profile-picture">
        <div className="avatar">
          <Avatar src={`http://localhost:4000/${avatar}`} sx={{width: '120px', height: '120px'}}></Avatar>
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
                     icon={userIcon}
                     value={name}
                     onChange={handleName}/>
          </Grid>
          <Grid item sm={6} xs={12} className="profile-field">
            <MyInput type='email'
                     name='email'
                     label='Email address'
                     icon={emailIcon}
                     value={email}
                     onChange={handleEmail}/>
          </Grid>
          <Grid item sm={6} xs={12} className="profile-field">
            <MyInput type='text'
                     name='job-position'
                     label='Job Position'
                     icon={emailIcon}
                     value={jobPosition}
                     onChange={handleJobPosition}/>
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