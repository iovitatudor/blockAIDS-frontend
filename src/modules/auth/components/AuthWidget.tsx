import React, {FC, useState} from "react";
import "../styles/Auth.scss";
import {Grid} from "@mui/material";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const AuthWidget: FC = () => {
  const [type, setType] = useState('specialist');
  const [page, setPage] = useState('signIn');

  const changePage = (pageType: string) => {
    setPage(pageType);
  };

  return (
    <div className="auth-area">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="auth-heading">
            <h1>Get started</h1>
            <p>as</p>
            <div className="auth-option-list">
              <div className={"auth-option-item " + (type === 'specialist' ? 'active' : '')}
                   onClick={() => setType('specialist')}>
                specialist
              </div>
              <div className={"auth-option-item " + (type === 'user' ? 'active' : '')}
                   onClick={() => setType('client')}>
                client
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