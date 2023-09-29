import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from "react";
import {Box, Grid} from "@mui/material";
import MyInput from "../../../ui/MyInput";
import emailIcon from "../../profile/assets/emailIcon.svg";
import passwordIcon from "../assets/passwordIcon.png";
import MyButton from "../../../ui/MyButton";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {login} from "../../../store/actions/AuthActionCreator";

interface ISignInProps {
  setPage: (page: string) => void,
  type: string
}

const SignIn: FC<ISignInProps> = ({setPage, type}) => {
  const dispatch = useAppDispatch();

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {error: specialistAuthError} = useAppSelector(state => state.authReducer)

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError('');
    dispatch(login({email, password, type,}));
  }

  useEffect(() => {
    setError(specialistAuthError.message);
  }, [specialistAuthError])

  return (
    <div>
      <h3>Sign In</h3>
      <form action="" onSubmit={handleFormSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <MyInput type='email'
                     name='email'
                     label='Email'
                     required={true}
                     icon={emailIcon}
                     value={email}
                     onChange={handleEmail}/>
          </Grid>
          <Grid item xs={12}>
            <MyInput type='password'
                     name='email'
                     label='Password'
                     required={true}
                     icon={passwordIcon}
                     value={password}
                     onChange={handlePassword}/>
          </Grid>
          <Grid item xs={12} className="flex-center">
            {error && <Box className="error-area">{error}</Box>}
          </Grid>
          <Grid item xs={12} className="flex-center">
            <MyButton className="btn-sm">Sign In</MyButton>
          </Grid>
          <Grid item xs={12} className="flex-center">
            <p>Don't have an account? <span className="span-link" onClick={() => setPage('signUp')}>Sign Up</span></p>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default SignIn;