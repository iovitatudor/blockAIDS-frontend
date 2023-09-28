import React, {FC, useEffect, useState} from "react";
import {Avatar, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Stack} from "@mui/material";
import MyFileUploader from "../../../ui/MyFileUploader";
import MyInput from "../../../ui/MyInput";
import userIcon from "../assets/userIcon.svg";
import emailIcon from "../assets/emailIcon.svg";
import phoneIcon from "../assets/phoneIcon.svg";
import calendarIcon from "../assets/calendarIcon.svg";
import MyButton from "../../../ui/MyButton";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {usersApi} from "../../../api/usersApi";
import {overwriteAuthUser} from "../../../store/reducers/AuthSlice";
import DoneAlert from "../../../components/DoneAlert";

const ProfileUser: FC = () => {
  const dispatch = useAppDispatch();
  const {authUser, type} = useAppSelector(state => state.authReducer)
  const {data: currentUser} = usersApi.useFetchUserByIdQuery(authUser.id);
  const [updateUser, {}] = usersApi.useUpdateUserMutation();
  const [name, setName] = useState(authUser.name);
  const [email, setEmail] = useState(authUser.email);
  const [phone, setPhone] = useState('');
  const [gender, setGender] = React.useState('');
  const [avatar, setAvatar] = React.useState('');
  const [file, setFile] =  React.useState<File>();
  const [isSaved, setIsSaved] = React.useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setPhone(currentUser.phone);
      setGender(currentUser.gender);
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

  const handlePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  }

  const handleGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender((event.target as HTMLInputElement).value);
  };

  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  }

  const handleForm = (event: React.FormEvent) => {
    event.preventDefault();
    updateUser({name, email, phone, gender, avatar: '', id: authUser.id, file});
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
          <MyInput type='tel'
                   name='phone'
                   label='Phone number'
                   icon={phoneIcon}
                   value={phone}
                   onChange={handlePhone}/>
        </Grid>
        {/*<Grid item sm={6} xs={12} className="profile-field">*/}
        {/*  <MyInput type='text' value='03.04.1987' name='date' label='Date of birth' icon={calendarIcon}/>*/}
        {/*</Grid>*/}
        <Grid item sm={6} xs={12}>
          <FormLabel id="demo-controlled-radio-buttons-group">Biological sex</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={gender}
            onChange={handleGender}
          >
            <FormControlLabel value="male" control={<Radio/>} label="Male"/>
            <FormControlLabel value="female" control={<Radio/>} label="Female"/>
            <FormControlLabel value="nonbinary" control={<Radio/>} label="Non-binary"/>
          </RadioGroup>
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