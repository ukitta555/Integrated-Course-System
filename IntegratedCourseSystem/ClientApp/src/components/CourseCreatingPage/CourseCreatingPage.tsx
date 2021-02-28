import React from 'react'

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Grid, TextField} from "@material-ui/core";

const CourseCreatingPage = () => {
  const GridWrapperStyle = {
    // gridTemplateAreas: "'document_icon title_text' 'python_icon programming_languages' 'people_search_icon roles' 'papers_icon general_info' 'create_button create_button'",
    paddingHorizontal: "calc(100vw * 1/12)",
    height: "100vw",
    // display: "grid",
    // gridRowGap: "2vw",
    // gridColumnGap: "10vw",
    // gridTemplateColumns: "35vw 35vw",
    // gridTemplateRows: "auto auto auto auto auto",
  }
  const titleTextWrapperStyle = {
    gridArea: "title_text",
    display: "flex",
    alignItems: "center",
    justifyContent: "center" as "center",
  }
  const titleTextStyle = {
    color: "#606675",
    fontStyle: "normal",
    fontWeight: "normal" as "normal",
    textAlign: 'center' as 'center',
    fontSize: "4vw",
    // fontFamily: Roboto;
  }
  const documentIconStyle = {
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(img/document_icon.png)",
    backgroundSize: "contain",
    backgroundPosition: "center",
    // gridArea: "document_icon",
  }
  const pythonIconStyle = {
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(img/python_icon.png)",
    backgroundColor: "#97ACC4",
    borderRadius: "1.2vw",
    backgroundSize: "contain",
    backgroundPosition: "center",
    padding: "2vw",
    // gridArea: "python_icon",
  }
  const programmingLanguagesWrapperStyle = {
    backgroundColor: "#CAE6D8",
    borderRadius: "1.2vw",
    // gridArea: "programming_languages",
  }
  const peopleSearchIconStyle = {
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(img/people_search_icon.png)",
    backgroundColor: "#97ACC4",
    borderRadius: "1.2vw",
    backgroundSize: "contain",
    backgroundPosition: "center",
    // gridArea: "people_search_icon",
  }
  const rolesWrapperStyle = {
    backgroundColor: "#CAE6D8",
    borderRadius: "1.2vw",
    // gridArea: "roles",
  }
  const papersIconStyle = {
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(img/papers_icon.png)",
    backgroundColor: "#97ACC4",
    borderRadius: "1.2vw",
    backgroundSize: "contain",
    backgroundPosition: "center",
    // gridArea: "papers_icon",
  }
  const generalInfoWrapperStyle = {
    backgroundColor: "#CAE6D8",
    borderRadius: "1.2vw",
    // gridArea: "general_info",
  }
  const createButtonStyle = {
    // gridArea: "create_button",
  }
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("submitted!")
  }

  return (
      <form onSubmit = {onSubmit}>
        <Grid style={GridWrapperStyle} container justify="center" spacing={0}>
          <Grid item xs={5} style={documentIconStyle} />
          <Grid item xs={5} style={titleTextWrapperStyle}>
            <Typography component="h6" style = {titleTextStyle}>
              Створення нового інтегрованого курсу
            </Typography>
          </Grid>
          <Grid item xs={5} style={pythonIconStyle} />
          <Grid item xs={5}>
            <p>Мови програмування</p>
            <Grid container direction="column" style={programmingLanguagesWrapperStyle}>
              <Grid item>
                <TextField variant="outlined"/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5} style={peopleSearchIconStyle} />
          <Grid item xs={5}>
            <p>Ролі у проекті</p>
            <Grid container direction="column" style={rolesWrapperStyle}>
              <Grid item>
                <TextField variant="outlined" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5} style={papersIconStyle} />
          <Grid item xs={5}>
            <p>Загальна інформація</p>
            <Grid container direction="column" style={generalInfoWrapperStyle}>
              <Grid item>
                <TextField variant="outlined" />
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={10} item>
            <Button type="submit" style={createButtonStyle} variant="contained" color="primary">Створити</Button>
          </Grid>
        </Grid>
      </form>
      // <div style={GridWrapperStyle}>
      //   <div style={documentIconStyle} />
      //   <div style={pythonIconStyle} />
      //   <div style={programmingLanguagesWrapperStyle}>
      //
      //   </div>
      //   <div style={peopleSearchIconStyle} />
      //   <div style={rolesWrapperStyle}></div>
      //   <div style={papersIconStyle} />
      //   <div style={generalInfoWrapperStyle}></div>
      //   <div style={titleTextWrapperStyle}>
      //     <Typography component="h6" style = {titleTextStyle}>
      //       Створення нового інтегрованого курсу
      //     </Typography>
      //   </div>
      //   <Button style={createButtonStyle} variant="contained" color="primary">Створити</Button>
      // </div>

  )
}

export default CourseCreatingPage