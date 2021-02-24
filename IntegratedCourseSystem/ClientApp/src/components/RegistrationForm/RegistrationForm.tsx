import React from 'react'
import useField from '../../hooks/useField'

// react-redux
import {useDispatch} from 'react-redux'
import {registerUser} from '../../reducers/userReducer/userThunks'

// design
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export const validateEmail: (email: string) => boolean
= email => email.search(/^[^\n\r\s]+@knu\.ua$/) !== -1

const RegistrationForm = () => {
  const dispatch = useDispatch()

  const email = useField('text');
  const password = useField ('password')
  const repeatPassword = useField ('password');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('submitted registration form')
    dispatch (registerUser(email.value, password.value, repeatPassword.value))
  }

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