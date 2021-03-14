import React, {useState} from 'react'
import useField from '../../hooks/useField'

// react-redux
import {useDispatch} from 'react-redux'
import {registerUser} from '../../reducers/userReducer/userThunks'

// design
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {EMAIL_VALIDATOR} from './emailValidatingRegExp'
import Grid from "@material-ui/core/Grid";

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
  const wrapperStyle = {
    height: "80vh",
  }

  const catOnBooksStyle = {
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(img/cat_on_books.png)",
    backgroundSize: "contain",
    backgroundPosition: "center",
  }
  const regWrapperStyle = {
    height: "100%",
    backgroundColor: "#A5CACC",
  }

  return (
    <form onSubmit = {onSubmit}>
      <Grid container direction="row" justify="space-evenly" alignItems="center" style={wrapperStyle}>
        <Grid item xs={6} style={catOnBooksStyle} />
        <Grid container item xs={6} spacing={3} direction="column" justify="center" alignItems="center" style={regWrapperStyle}>
          <Grid item>
            <TextField label="Enter email:" inputProps = {emailProps}  />
          </Grid>
          <Grid item>
            <TextField label="Enter password:" error = {arePwdsWrong} helperText = {pwdErrorMsg} inputProps = {passwordProps} />
          </Grid>
          <Grid item>
            <TextField label="Repeat password:"  error = {arePwdsWrong} helperText = {pwdErrorMsg} inputProps = {repeatPasswordProps} />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">Register!</Button>
          </Grid>
        </Grid>
      </Grid>

    </form>
  )
}

export default RegistrationForm