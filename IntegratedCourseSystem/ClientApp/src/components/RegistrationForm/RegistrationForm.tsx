import React from 'react'
import {useDispatch} from 'react-redux'
import useField from '../../hooks/useField'
import {registerUserAction} from '../../reducers/userReducer/userActionCreators'


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const RegistrationForm = () => {
  const dispatch = useDispatch()

  const email = useField('text');
  const password = useField ('password')
  const repeatPassword = useField ('password');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('submitted registration form')
    dispatch (registerUserAction(email.value, password.value, repeatPassword.value))
  }

  const validateEmail: (email: string) => boolean
      = email => email.search(/@knu\.ua$/) !== -1

  return (
    <form onSubmit = {onSubmit}>
        <TextField label="Enter email:" {...email} />
        <TextField label="Enter password:" {...password} />
        <TextField label="Repeat password:" {...repeatPassword} />
        <Button type="submit" variant="contained" color="primary">Register!</Button>
    </form>
  )
}

export default RegistrationForm