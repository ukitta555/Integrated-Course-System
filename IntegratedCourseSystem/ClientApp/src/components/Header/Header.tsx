import React from 'react'
import {Link}
  from 'react-router-dom'
import {useSelector} from 'react-redux'

import ImageFitToParent from '../ImageFitToParent/ImageFitToParent'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {UserState, NO_ID} from '../../store/types'
import {Box, Grid, ThemeProvider} from "@material-ui/core";
import light from "../../themes/light";

const Header = () => {
  const user = useSelector ((state: {user: UserState}) => state.user)

  const logoImgStyle = {
      width: 50,
      height: 50
  }

  const logoWrapperStyle = {
      width: "initial",
  }

  const logoTextStyle = {
      fontFamily: "Ribeye",
  }


  const wholeHeaderStyle = {
      backgroundColor: "inherit",
  }

  const headerWrapperStyle = {
      flexDirection: 'row' as 'row',
      justifyContent: 'space-between',
      alignItems: 'center' as 'center',
      width: '100%'
  }
  const registrationButtonsWrapperStyle = {
        marginRight: "5px",
    }
  const registrationButtonsStyle = {
      borderRadius: 50,
  }



  const registrationButtons = (
      <div>
          <Grid container item justify="space-between" spacing={3} style={registrationButtonsWrapperStyle}>
              <Box bgcolor="theme_grey.main" color="theme_white.main" style={registrationButtonsStyle}>
                  <Grid item>
                      <Button color="inherit">
                          <Link to = '/register' style={{color: "inherit"}}>
                              register
                          </Link>
                      </Button>
                  </Grid>
              </Box>

              <Box bgcolor="theme_green.dark" color="theme_black.main"  style={registrationButtonsStyle}>
                  <Grid item>
                      <Button color = "inherit">
                          <Link to = '/login' style={{color: "inherit"}}>
                              login
                          </Link>
                      </Button>
                  </Grid>
              </Box>
          </Grid>
      </div>
  )

  const loggedInButtons = ( <div>
      <Button color = "inherit">
        <Link to = '/course_creating_page'>
          Create course
        </Link>
      </Button>

      <Button color = "inherit">
        <Link to = '/course_registration'>
          CourseReg
        </Link>
      </Button>
    </div>

  )

  return (
    <ThemeProvider theme={light}>
        <Box bgcolor="theme_grey.light">
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