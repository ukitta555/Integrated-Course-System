import React from 'react'
import useField from '../../hooks/useField'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const RegistrationForm = () => {
  const login = useField('text');
  const email = useField('email');
  const password = useField ('password')

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('submitted registration form')
    console.log(login.value, email.value, password.value)
  }

  const validateEmail: (email: string) => boolean
      = email => email.search(/@knu\.ua$/) !== -1

  return (
    <form onSubmit = {onSubmit}>
        <TextField label="Enter login:" {...login} />
        <TextField label="Enter email:" {...email} />
        <TextField label="Enter password:" {...password} />
        <Button type="submit" variant="contained" color="primary">Register!</Button>
    </form>
  )
}

export default RegistrationForm