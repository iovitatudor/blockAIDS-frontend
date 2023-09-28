import React, {FC, useState} from "react";
import "../styles/Auth.scss";
import {Box, Grid} from "@mui/material";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {Link} from "react-router-dom";

const AuthWidget: FC = () => {
  const [type, setType] = useState('user');
  const [page, setPage] = useState('signIn');

  const changePage = (pageType: string) => {
    setPage(pageType);
  };

  return (
    <div className="auth-area">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="auth-heading">
            <Box sx={{m: 4}}>
              <Link to="/" className="logo">
                <img src='/images/logo.svg' width="300" alt="BlockAids"/>
              </Link>
            </Box>
            <h1>Get started</h1>
            <p>as</p>
            <div className="auth-option-list">
              <div className={"auth-option-item " + (type === 'user' ? 'active' : '')}
                   onClick={() => setType('user')}>
                customer
              </div>
              <div className={"auth-option-item " + (type === 'specialist' ? 'active' : '')}
                   onClick={() => setType('specialist')}>
                specialist
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="auth-forms">
            {page === 'signIn' && <SignIn setPage={changePage} type={type}/>}
            {page === 'signUp' && <SignUp setPage={changePage} type={type}/>}
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default AuthWidget;