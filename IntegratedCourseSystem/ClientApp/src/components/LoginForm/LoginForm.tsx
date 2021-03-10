import React from 'react'
//import {useDispatch, useSelector} from 'react-redux'
import {useDispatch, useSelector} from 'react-redux'


import useField from '../../hooks/useField'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {loginUser} from '../../reducers/userReducer/userThunks'
import {EMAIL_VALIDATOR} from '../RegistrationForm/emailValidatingRegExp'
import {Grid} from "@material-ui/core";


const LoginForm = () => {
  const dispatch = useDispatch()
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
    await dispatch(loginUser(email.value, password.value))
  }
  return (
    <form onSubmit = {onSubmit}>
      <Grid container direction="column">
        <Grid item>
          <TextField name="email" label="Enter email:" inputProps = {emailProps} />
        </Grid>
        <Grid item>
          <TextField name="password" label="Enter password:" inputProps = {passwordProps} />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">submit!</Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default LoginForm