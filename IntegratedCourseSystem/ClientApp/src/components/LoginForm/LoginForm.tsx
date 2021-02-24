import React from 'react'
//import {useDispatch, useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'

import useField from '../../hooks/useField'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {loginUser} from '../../reducers/userReducer/userThunks'

const LoginForm = () => {
  const dispatch = useDispatch()

  const email = useField('text')
  const password = useField ('password')

  const emailProps = {
    autoComplete: 'email',
    required: true,
    ...email
  }

  const passwordProps = {
    autoComplete: 'current-password',
    required: true,
    ...password
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(loginUser(email.value, password.value))
  }
  return (
    <form onSubmit = {onSubmit}>
        <TextField name="email" label="Enter email:" inputProps = {emailProps} />
        <TextField name="password" label="Enter password:" inputProps = {passwordProps} />
        <Button type="submit" variant="contained" color="primary">submit!</Button>
    </form>
  )
}

export default LoginForm