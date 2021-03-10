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

const Header = () => {
  const user = useSelector ((state: {user: UserState}) => state.user)

  const logoImgStyle = {
      width: 50,
      height: 50
  }

  const logoWrapperStyle = {
    display: 'flex',
    alignItems: 'center'
  }

  const headerWrapperStyle = {
    display: 'flex',
    flexDirection: 'row' as 'row',
    justifyContent: 'space-between',
    alignItems: 'center' as 'center',
    width: '100%'
  }

  const registrationButtons =  ( <div>
            <Button color = "inherit">
              <Link to = '/register'>
                register
              </Link>
            </Button>

            <Button color = "inherit">
              <Link to = '/login'>
                login
              </Link>
            </Button>
          </div>
  )

  const loggedInButtons = ( <div>
      <Button color = "inherit">
        <Link to = '/course_creating_page'>
          Create course
        </Link>
      </Button>
    </div>
  )

  return (
    <AppBar position="static">
      <Toolbar>
        <div style = {headerWrapperStyle}>
          <div style = {logoWrapperStyle}>
            <div style = {logoImgStyle}>
              <Link to = '/'>
                <ImageFitToParent src = './img/logo.png' alt = 'logo'/>
              </Link>
            </div>
            <Typography variant="h6">
              T-Collab
            </Typography>
          </div>
          {
            user.id === NO_ID
            ? registrationButtons
            : loggedInButtons
          }
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header