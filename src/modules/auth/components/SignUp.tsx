import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from "react";
import {Box, Grid} from "@mui/material";
import MyInput from "../../../ui/MyInput";
import emailIcon from "../../profile/assets/emailIcon.svg";
import passwordIcon from "../assets/passwordIcon.png";
import MyButton from "../../../ui/MyButton";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {ISelectOptions, MySelect} from "../../../ui/MySelect/MySelect";
import organizationTaskIcon from "../../../ui/assets/organizationTaskIcon.svg";
import {SelectChangeEvent} from "@mui/material/Select";
import {organizationsApi} from "../../../api/organizationsApi";
import {register} from "../../../store/actions/AuthActionCreator";

interface ISignUpProps {
  setPage: (page: string) => void,
  type: string,
}

const SignUp: FC<ISignUpProps> = ({setPage, type}) => {
  const dispatch = useAppDispatch();
  const [organizationsOptions, setOrganizationsOptions] = React.useState<ISelectOptions[]>([]);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organizationId, setOrganizationId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const {data: organizations} = organizationsApi.useFetchAllOrganizationsQuery();
  const {error: specialistAuthError} = useAppSelector(state => state.authReducer)

  const handleName = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value);
  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
  const handleOrganizationId = (event: SelectChangeEvent) => setOrganizationId(event.target.value);
  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);
  const handleConfirmedPassword = (event: ChangeEvent<HTMLInputElement>) => setConfirmedPassword(event.target.value);
  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError('');
    if (password !== confirmedPassword) {
      setError('Passwords not match!');
    }
    dispatch(register({name, email, password, type, organizationId}));
  }

  useEffect(() => {
    if (!organizations) return;
    setOrganizationsOptions(organizations.map(organization => ({
      name: organization.name,
      value: organization.id.toString()
    } as ISelectOptions)));
  }, [organizations])

  useEffect(() => {
    setError(specialistAuthError.message);
  }, [specialistAuthError])

  return (
    <div>
      <h3>Sign Up</h3>
      <form action="" onSubmit={handleFormSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <MyInput type='text'
                     name='name'
                     label='Full Name'
                     required={true}
                     icon={emailIcon}
                     value={name}
                     onChange={handleName}/>
          </Grid>
          <Grid item xs={12}>
            <MyInput type='email'
                     name='email'
                     label='Email'
                     required={true}
                     icon={emailIcon}
                     value={email}
                     onChange={handleEmail}/>
          </Grid>
          {
            type === 'specialist' &&
              <Grid item xs={12}>
                  <MySelect label="Organization"
                            defaultOption="Select Organization"
                            onChange={handleOrganizationId}
                            options={organizationsOptions}
                            value={organizationId}
                            className="margin-0"
                            icon={organizationTaskIcon}/>
              </Grid>
          }
          <Grid item xs={12}>
            <MyInput type='password'
                     name='email'
                     label='Password'
                     required={true}
                     icon={passwordIcon}
                     value={password}
                     onChange={handlePassword}/>
          </Grid>
          <Grid item xs={12}>
            <MyInput type='password'
                     name='email'
                     label='Confirm Password'
                     icon={passwordIcon}
                     required={true}
                     value={confirmedPassword}
                     onChange={handleConfirmedPassword}/>
          </Grid>
          <Grid item xs={12} className="flex-center">
            {error && <Box className="error-area">{error}</Box>}
          </Grid>
          <Grid item xs={12} className="flex-center">
            <MyButton className="btn-sm">Sign Up</MyButton>
          </Grid>
          <Grid item xs={12} className="flex-center">
            <p>Already have an account? <span className="span-link" onClick={() => setPage('signIn')}>Sign In</span></p>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default SignUp;