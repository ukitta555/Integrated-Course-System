import React from 'react'

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const TeacherCabinet = () => {
  const GridWrapperStyle = {
    gridTemplateAreas: "'question_mark .' 'question_mark waiting_text' 'question_mark forward_button' 'question_mark .'",
    margin: "2vw 10vw",
    height: "40vw",
    display: "grid",
    gridTemplateColumns: "40vw 40vw",
    gridTemplateRows: "auto auto auto auto",
  }
  const waitingTextWrapperStyle = {
    gridArea: "waiting_text",
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
  const questionMarkStyle = {
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(img/question_mark.png)",
    backgroundSize: "contain",
    backgroundPosition: "center",
    gridArea: "question_mark",
  }
  const forwardButtonStyle = {
    gridArea: "forward_button",
  }

  return (
      <div style={GridWrapperStyle}>
        <div style={questionMarkStyle} />
        <div style={waitingTextWrapperStyle}>
          <Typography component="h6" style = {waitingTextStyle}>
            У вас ще немає своїх курсів. Давайте створимо перший!
        </Typography>
        </div>
        <Button style={forwardButtonStyle} variant="contained" color="primary">Вперед!</Button>
      </div>

  )
}

export default TeacherCabinet