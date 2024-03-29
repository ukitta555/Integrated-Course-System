import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import useField from '../../hooks/useField'

// react-redux
import {useDispatch} from 'react-redux'
import {registerUser, loginUser} from '../../reducers/userReducer/userThunks'

// design
import Button from '@material-ui/core/Button';
import {EMAIL_VALIDATOR} from './emailValidatingRegExp'
import Grid from "@material-ui/core/Grid";
import {Box, FormHelperText, InputLabel, ThemeProvider} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import light from "../../themes/light";

const RegistrationForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (password.value !== repeatPassword.value) {
      setArePwdsWrong(true)
      setPwdErrorMsg('Паролі не співпадають!')
      setTimeout (() => {
        setPwdErrorMsg('')
        setArePwdsWrong(false)
      }, 2000)
    }
    else {
      await dispatch(registerUser(email.value, password.value))
      await dispatch(loginUser(email.value, password.value, "manually"))
      history.push('/questionnaire') // from questionnaire, the user will be redirected to the page needed
    }
  }
  const wrapperStyle = {
    height: "65vh",
    marginTop: "50px",
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
  const catOnBooksStyle = {
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(img/cat_on_books.png)",
    backgroundSize: "contain",
    backgroundPosition: "center",
  }
  const regWrapperStyle = {
    height: "100%",
    borderRadius: 44,
    backgroundColor: "#A5CACC",
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
            <Grid container item xs={5} spacing={3} direction="column" justify="center" alignItems="center" style={regWrapperStyle}>
              <Grid item style={textFieldWrapperStyle}>
                <InputLabel>Введіть вашу пошту:</InputLabel>
                <InputBase name="email" style={textFieldStyle} inputProps={{...emailProps, style: {paddingLeft: "1em"}}}/>
              </Grid>
              <Grid item style={textFieldWrapperStyle}>
                <InputLabel>Введіть пароль:</InputLabel>
                <InputBase name="password"  aria-describedby="component-error-text1" style={textFieldStyle} inputProps={{...passwordProps, style: {paddingLeft: "1em"}}}/>
              </Grid>
              <Grid item style={textFieldWrapperStyle}>
                <InputLabel>Повторіть пароль:</InputLabel>
                <InputBase name="repeat_password"  aria-describedby="component-error-text2" style={textFieldStyle} inputProps={{...repeatPasswordProps, style: {paddingLeft: "1em"}}}/>
                <FormHelperText id="component-error-text2" error = {arePwdsWrong} >{pwdErrorMsg}</FormHelperText>
              </Grid>
              <Grid item style={submitButtonWrapperStyle}>
                <Box bgcolor="theme_grey.main" color="theme_white.main" style={submitButtonBoxStyle}>
                  <Grid item>
                    <Button type="submit"  style={submitButtonStyle}>
                      Зареєструватися!
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

export default RegistrationForm