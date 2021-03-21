import React from 'react'
import {Link, useHistory}
  from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

import ImageFitToParent from '../ImageFitToParent/ImageFitToParent'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {logout} from '../../reducers/userReducer/userThunks'

import {UserState, NO_ID} from '../../store/types'
import {Box, Grid, ThemeProvider} from "@material-ui/core";
import light from "../../themes/light";

const Header = () => {
  const user = useSelector ((state: {user: UserState}) => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const logoImgStyle = {
      width: 70,
      height: 70
  }

  const logoWrapperStyle = {
      width: "initial",
  }

  const logoTextStyle = {
      fontFamily: "Ribeye",
  }

  const wholeHeaderStyle = {
      backgroundColor: "inherit",
     // borderRadius: "inherit",
  }

  const headerWrapperStyle = {
      padding: "0 1vw 0 1vw",
  }
  const registrationButtonsWrapperStyle = {
      marginRight: "5px",
  }
  const registrationButtonsStyle = {
      borderRadius: 21,
  }
  const registrationButtonStyle = {
      borderRadius: 21,
  }

  const handleLogout = async () => {
      await dispatch (logout())
      history.push('/login')
  }


  const registrationButtons = (
      <div>
          <Grid container item justify="space-between" spacing={4} style={registrationButtonsWrapperStyle}>
              <Box bgcolor="theme_grey.main" color="theme_white.main" style={registrationButtonsStyle}>
                  <Grid item>
                      <Button color="inherit" style={registrationButtonStyle}>
                          <Link to = '/register' style={{color: "inherit"}}>
                              register
                          </Link>
                      </Button>
                  </Grid>
              </Box>

              <Box bgcolor="theme_green.dark" color="theme_black.main"  style={registrationButtonsStyle}>
                  <Grid item>
                      <Button color = "inherit" style={registrationButtonStyle}>
                          <Link to = '/login' style={{color: "inherit"}}>
                              login
                          </Link>
                      </Button>
                  </Grid>
              </Box>
          </Grid>
      </div>
  )

  const loggedInButtons = (
  <div>
      <Grid container item justify="space-between" spacing={3} style={registrationButtonsWrapperStyle}>

              <Box bgcolor="theme_grey.main" color="theme_white.main"  style={registrationButtonsStyle}>
                  <Grid item>
                    <Button color = "inherit">
                        <Link to = '/course_registration' style={{color: "inherit"}}>
                            CourseReg
                        </Link>
                    </Button>
                  </Grid>
              </Box>



              <Box bgcolor="theme_green.dark" color="theme_black.main"  style={registrationButtonsStyle}>
                  <Grid item>
                    <Button color = "inherit">
                        <Link to = '/course_creating_page' style={{color: "inherit"}}>
                            Create course
                        </Link>
                    </Button>
                  </Grid>
              </Box>

              <Box bgcolor="theme_grey.main" color="theme_white.main"  style={registrationButtonsStyle}>
                  <Grid item>
                    <Button color = "inherit" onClick = {handleLogout}>
                            Logout
                    </Button>
                  </Grid>
              </Box>

          </Grid>
    </div>

  )

  return (
    <ThemeProvider theme={light}>
        <Box bgcolor="theme_white.main" style={{borderRadius: "0px 0px 35px 35px",}}>
            <AppBar position="static" color="inherit" style={wholeHeaderStyle}>
              <Toolbar>
                  <Grid container direction="row" justify="space-between" alignItems="center" style={headerWrapperStyle}>
                      <Grid container item alignItems="center" style={logoWrapperStyle}>
                          <div style = {logoImgStyle}>
                              <Link to = '/'>
                                  <ImageFitToParent src = './img/logo.png' alt = 'logo'/>
                              </Link>
                          </div>
                          <Typography variant="h6" style={logoTextStyle}>
                              T-Collab
                          </Typography>
                      </Grid>
                      {
                          user.id === NO_ID
                              ? registrationButtons
                              : loggedInButtons
                      }
                  </Grid>
              </Toolbar>
            </AppBar>
        </Box>
    </ThemeProvider>
  )
}

export default Header