import React from 'react'

import Typography from '@material-ui/core/Typography';

const TeacherWaitingPage = () => {
  const GridWrapperStyle = {
    gridTemplateAreas: "'waitingText waitingText' 'hand clock' 'hand clock'",
    margin: "0 20vw",
    height: "80vh",
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridTemplateRows: "auto auto auto",
  }
  const waitingTextWrapperStyle = {
    gridArea: "waitingText",
    display: "flex",
    alignItems: "center"
  }

  const waitingTextStyle = {
    color: "#606675",
    fontStyle: "normal",
    fontWeight: "normal" as "normal",
    textAlign: 'center' as 'center',
    fontSize: "5.5vh",
    // fontFamily: Roboto;
  }
  const handStyle = {
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(img/hand_to_right_emoji.png)",
    backgroundSize: "contain",
    backgroundPosition: "center",
    gridArea: "hand",
  }
  const clockStyle = {
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(img/clock.png)",
    backgroundSize: "contain",
    backgroundPosition: "center",
    gridArea: "clock",
  }

  return (
      <div style={GridWrapperStyle}>
        <div style={waitingTextWrapperStyle}>
          <Typography component="h1" style = {waitingTextStyle}>
          Ваша анкета була прийнята. Очікуйте, поки її розгляне адміністратор платформи.
        </Typography>
        </div>
        <div style={handStyle} />
        <div style={clockStyle} />
      </div>

  )
}

export default TeacherWaitingPage