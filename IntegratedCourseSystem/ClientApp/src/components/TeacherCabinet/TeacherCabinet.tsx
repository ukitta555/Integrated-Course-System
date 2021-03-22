import React from 'react'

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import light from "../../themes/light";
import {Box, Container, ThemeProvider} from "@material-ui/core";

const TeacherCabinet = () => {
  const GridWrapperStyle = {
    gridTemplateAreas: "'question_mark .' 'question_mark waiting_text' 'question_mark forward_button' 'question_mark .'",
    margin: "2vw 10vw",
    height: "40vw",
    display: "grid",
    gridTemplateColumns: "40% auto",
    gridTemplateRows: "auto auto auto auto",
  }
  const waitingTextWrapperStyle = {
    gridArea: "waiting_text",
    display: "flex",
    alignItems: "center"
  }
  const waitingTextStyle = {
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
    width: "100%",
    borderRadius: "inherit",
    backgroundColor: "inherit",
  }
  const forwardButtonWrapperStyle = {
    gridArea: "forward_button",
    padding: "0 25%",
  }
  const forwardButtonBoxStyle = {
    borderRadius: 27.5,
    // width: "100%",
  }

  return (
      <ThemeProvider theme={light}>
        <div style={GridWrapperStyle}>
          <div style={questionMarkStyle} />
            <Box color="theme_black.main" style={waitingTextWrapperStyle}>
              <Typography component="h6" style={waitingTextStyle}>
                У вас ще немає своїх курсів. Давайте створимо перший!
              </Typography>
            </Box>
          <Container maxWidth="xs" style={forwardButtonWrapperStyle}>
            <Box bgcolor="theme_green.dark" color="theme_black.main" style={forwardButtonBoxStyle}>
              <Button variant="contained" color="inherit" style={forwardButtonStyle}>Вперед!</Button>
            </Box>
          </Container>


        </div>
      </ThemeProvider>
  )
}

export default TeacherCabinet