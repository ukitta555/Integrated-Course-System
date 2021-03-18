import React from 'react'
//import {useDispatch, useSelector} from 'react-redux'
import {useDispatch, useSelector} from 'react-redux'


import useField from '../../hooks/useField'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {loginUser} from '../../reducers/userReducer/userThunks'
import {EMAIL_VALIDATOR} from '../RegistrationForm/emailValidatingRegExp'
import {Box, Grid, InputLabel, ThemeProvider} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import {useHistory} from "react-router-dom";
import light from "../../themes/light";
import { UserState } from '../../store/types';


const LoginForm = () => {
  const user = useSelector ((state: {user: UserState}) => state.user)
  const dispatch = useDispatch()
  const history = useHistory()
  const email = useField('text')
  const password = useField ('password')



  const emailProps = {
    pattern: EMAIL_VALIDATOR,
    autoComplete: 'username',
    required: true,
    ...email
  }

  const passwordProps = {
    autoComplete: 'current-password',
    required: true,
    ...password
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await dispatch(loginUser(email.value, password.value))
      history.push("/questionnaire")
    }
    catch (error) {
      console.log (error)
    }
  }

  const wrapperStyle = {
    height: "80vh",
    marginTop: "50px",
  }

  const catOnBooksStyle = {
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(img/cat_on_books.png)",
    backgroundSize: "contain",
    backgroundPosition: "center",
  }
  const logWrapperStyle = {
    height: "100%",
    borderRadius: 44,
    backgroundColor: "#A5CACC",
  }
  const textFieldWrapperStyle = {
    width: "80%",
  }
  const textFieldStyle = {
    background: "#F5F5F5",
    borderRadius: 50,
    width: "100%",
    margin: "3% 0",
    color: "inherit",
  }
  const submitButtonWrapperStyle = {
    width: "50%",
    textAlign: "center" as "center",
  }
  const submitButtonBoxStyle = {
    borderRadius: 50,
  }
  const submitButtonStyle = {
    borderRadius: 50,
    width: "100%",
  }
  return (
      <ThemeProvider theme={light}>
        <form onSubmit = {onSubmit}>
          <Grid container direction="row" justify="space-evenly" alignItems="center" style={wrapperStyle}>
            <Grid item xs={5} style={catOnBooksStyle} />
              <Grid container item xs={5} spacing={3} direction="column" justify="center" alignItems="center" style={logWrapperStyle}>
              <Grid item style={textFieldWrapperStyle}>
                {/*<TextField name="email" label="Enter email:" inputProps = {emailProps} />*/}
                <InputLabel>Enter email:</InputLabel>
                {/*<Box bgcolor="theme_white.main">*/}
                  <InputBase name="email" style={textFieldStyle} inputProps={{...emailProps, style: {paddingLeft: "1em"}}}/>
                {/*</Box>*/}
              </Grid>
              <Grid item style={textFieldWrapperStyle}>
                {/*<TextField name="password" label="Enter password:" inputProps = {passwordProps} />*/}
                <InputLabel>Enter password:</InputLabel>
                {/*<Box>*/}
                  <InputBase name="password" style={textFieldStyle} inputProps={{...passwordProps, style: {paddingLeft: "1em"}}}/>
                {/*</Box>*/}
              </Grid>
              <Grid item style={submitButtonWrapperStyle}>
                <Box bgcolor="theme_grey.main" color="theme_white.main" style={submitButtonBoxStyle}>
                  <Grid item>
                    <Button type="submit" color="inherit" style={submitButtonStyle}>
                        submit!
                    </Button>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </ThemeProvider>
  )
}

export default LoginForm