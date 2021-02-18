import React from 'react'
import {
  Link
  ,Switch
  ,Route
  }
  from 'react-router-dom'
import ImageFitToParent from '../ImageFitToParent/ImageFitToParent'

const Header = () => {


  const divStyle = {
      width: 50,
      height: 50
  }


  return (
    <div>
      <div style = {divStyle}>
          <Link to = '/'>
              <ImageFitToParent src = './img/logo.png' alt = 'logo'/>
          </Link>
      </div>
      T-Collab

      <Link to = '/register'> register </Link>
      <Link to = '/login'> login </Link>

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