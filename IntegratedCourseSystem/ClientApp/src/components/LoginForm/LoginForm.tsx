import { useFormControl } from '@material-ui/core'
import React from 'react'
import useField from '../../hooks/useField'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const LoginForm = () => {
  const login = useField('text')
  const password = useField ('password')
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('I submitted something!')
    console.log (login.value, password.value)
  }
  return (
    <form onSubmit = {onSubmit}>
        <TextField name="login" label="Enter login:" {...login} />
        <TextField name="password" label="Enter password:" {...password} />
        <Button type="submit" variant="contained" color="primary">submit!</Button>
    </form>
  )
}

export default LoginForm