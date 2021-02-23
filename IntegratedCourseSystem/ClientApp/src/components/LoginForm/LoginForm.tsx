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
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(loginUser(email.value, password.value))
  }
  return (
    <form onSubmit = {onSubmit}>
        <TextField name="email" label="Enter email:" {...email} />
        <TextField name="password" label="Enter password:" {...password} />
        <Button type="submit" variant="contained" color="primary">submit!</Button>
    </form>
  )
}

export default LoginForm