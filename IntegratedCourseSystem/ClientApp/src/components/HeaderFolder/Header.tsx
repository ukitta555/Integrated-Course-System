import React from 'react'
import {
  Link
  ,Switch
  ,Route
  }
  from 'react-router-dom'
import ImageFitToParent from '../ImageFitToParent/ImageFitToParent'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/Button';

import Menu from "@material-ui/icons/Menu";


const Header = () => {

  const logoDivStyle = {
      width: 50,
      height: 50
  }

  const headerWrapperStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'spece-between'
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>

          <div style = {logoDivStyle}>
            <Link to = '/'>
              <ImageFitToParent src = './img/logo.png' alt = 'logo'/>
            </Link>
          </div>



          <Typography variant="h6">
            T-Collab
          </Typography>

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

        </Toolbar>
      </AppBar>


      <Switch>
          <Route path = '/register'>
              registration happens here
          </Route>
          <Route path = '/login'>
              login happens here
          </Route>
          <Route path = '/'>
              bruh
          </Route>
      </Switch>

    </div>
  )
}

export default Header