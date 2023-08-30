import React, {FC} from "react";
import {Avatar, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Stack} from "@mui/material";
import '../styles/Profile.scss';
import MyButton from "../../../ui/MyButton";
import MyInput from "../../../ui/MyInput";
import userIcon from "../assets/userIcon.svg";
import emailIcon from "../assets/emailIcon.svg";
import phoneIcon from "../assets/phoneIcon.svg";
import calendarIcon from "../assets/calendarIcon.svg";
import ProfileImage from "./ProfileImage";

const ProfileWidget: FC = () => {
  const [value, setValue] = React.useState('female');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <div className="profile-area">

      <div className="profile-picture">
        <div className="avatar">
          <Avatar sx={{width: '120px', height: '120px'}}></Avatar>
        </div>
        <div className="upload-form">
          <h3>Profile Picture</h3>
          {/*<MyButton>Upload image</MyButton>*/}
          <ProfileImage/>
        </div>
      </div>
      <div>

      </div>

      <Grid container spacing={3} className="profile-fields">
        <Grid item xs={6} className="profile-field">
          <MyInput type='text' value='Wade Warren' name='name' label='Full Name' icon={userIcon}/>
        </Grid>
        <Grid item xs={6} className="profile-field">
          <MyInput type='email' value='Wade@gmail.com' name='email' label='Email address' icon={emailIcon}/>
        </Grid>
        <Grid item xs={6} className="profile-field">
          <MyInput type='tel' value='+373 123 123 123' name='phone' label='Phone number' icon={phoneIcon}/>
        </Grid>
        <Grid item xs={6} className="profile-field">
          <MyInput type='text' value='03.04.1987' name='date' label='Date of birth' icon={calendarIcon}/>
        </Grid>
        <Grid item xs={6}>
          <FormLabel id="demo-controlled-radio-buttons-group">Biological sex</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="male" control={<Radio/>} label="Male"/>
            <FormControlLabel value="female" control={<Radio/>} label="Female"/>
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row"
                 justifyContent="space-between"
                 alignItems="center"
                 sx={{mt: 3, mb: 2}}>
            <MyButton className='btn-outlined'>Cancel</MyButton>
            <MyButton>Update profile</MyButton>
          </Stack>
        </Grid>
      </Grid>


    </div>
  );
}

export default ProfileWidget;