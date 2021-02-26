import React from 'react'

import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

class DeleteIcon extends React.Component {
  render() {
    return null;
  }
}

const StudentWaitingPage = () => {
  const GridWrapperStyle = {
    gridTemplateAreas: "'waitingText waitingText' 'hand clock' 'reg_button reg_button'",
    margin: "2vw 20vw 0 20vw",
    height: "40vw",
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridTemplateRows: "12.5vw 23.5vw 4vw",
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
    fontSize: "2.75vw",
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
  const regButtonStyle = {
    gridArea: "reg_button",
    marginTop: "1.5vw"
  }

  return (
        <div style={GridWrapperStyle}>
          <div style={waitingTextWrapperStyle}>
            <Typography component="h1" style = {waitingTextStyle}>
              Ваша анкета була прийнята. Очікуйте розподілу по групам. В вашому кабінеті ви можете відредагувати свої побажання.
          </Typography>
          </div>
          <div style={handStyle} />
          <div style={clockStyle} />
          <Button style={regButtonStyle} variant="outlined" color="secondary" startIcon={<DeleteIcon />}>
            Зареєструватися на новий курс
          </Button>
        </div>

  )
}

export default StudentWaitingPage