import React, {useState} from 'react'
import useField from '../../hooks/useField'

// react-redux
import {useDispatch} from 'react-redux'
import {registerUser} from '../../reducers/userReducer/userThunks'

// design
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {EMAIL_VALIDATOR} from './emailValidatingRegExp'

const RegistrationForm = () => {
  const dispatch = useDispatch()

  const email = useField('text');
  const password = useField ('password')
  const repeatPassword = useField ('password');
  const [arePwdsWrong, setArePwdsWrong] = useState(false)
  const [pwdErrorMsg, setPwdErrorMsg] = useState('')

  const emailProps = {
    pattern: EMAIL_VALIDATOR,
    required: true,
    autoComplete: "username",
    ...email
  }

  const passwordProps = {
    required: true,
    autoComplete: "new-password",
    ...password
  }

  const repeatPasswordProps = {
    required: true,
    autoComplete: "new-password",
    ...repeatPassword
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (password.value !== repeatPassword.value) {
      setArePwdsWrong(true)
      setPwdErrorMsg('Passwords don\'t match!')
      setTimeout (() => {
        setPwdErrorMsg('')
        setArePwdsWrong(false)
      }, 2000)
    }
    else {
      dispatch (registerUser(email.value, password.value))
    }
  }

  return (
    <form onSubmit = {onSubmit}>
        <TextField label="Enter email:" inputProps = {emailProps}  />
        <TextField label="Enter password:" error = {arePwdsWrong} helperText = {pwdErrorMsg} inputProps = {passwordProps} />
        <TextField label="Repeat password:"  error = {arePwdsWrong} helperText = {pwdErrorMsg} inputProps = {repeatPasswordProps} />
        <Button type="submit" variant="contained" color="primary">Register!</Button>
    </form>
  )
}

export default RegistrationForm