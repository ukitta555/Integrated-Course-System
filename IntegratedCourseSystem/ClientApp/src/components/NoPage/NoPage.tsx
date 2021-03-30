import { Typography } from '@material-ui/core'
import React from 'react'
import { Row } from 'reactstrap'

const NoPage = () => {
  const styles = {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: "99vw"
  }
  const fontStyle = {
    fontFamily: "Comic Sans MS"
  }
  return (
    <>
      <div style = {styles}>
        <Typography style = {fontStyle} variant='h2'>
          404 Page Not Found
        </Typography>
        <img src = 'img/travolta.gif' />
      </div>
    </>
  )
}

export default NoPage