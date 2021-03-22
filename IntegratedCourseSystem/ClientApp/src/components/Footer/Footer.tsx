import React from 'react'

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

const Footer = () => {
  const footerWrapperStyle = {
    background: "#97ACC4",
    position: "fixed" as "fixed",
    bottom: 0,
    //margin: "3vh"
    // width: '100%'
  }

  const footerTextStyle = {
    color: "#F6F6F6",
    fontStyle: "normal",
    fontWeight: "normal" as "normal",
    textAlign: 'center' as 'center',
    // fontFamily: Roboto;
    // fontSize: "28px",
    // lineHeight: "33px",
    // width: '100%',
  }

  return (
    <AppBar position="static" component="footer" style = {footerWrapperStyle}>
      <Typography style = {footerTextStyle}>
        G1 Team, 2021
      </Typography>
    </AppBar>
  )
}

export default Footer