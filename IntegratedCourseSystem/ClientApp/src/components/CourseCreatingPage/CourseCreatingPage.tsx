import React, {useState} from 'react'

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { Grid, TextField} from "@material-ui/core";
import DeletableTextField from "../DeletableTextField/DeletableTextField";

const CourseCreatingPage = () => {
  const [languages, setLanguages] = useState([0]);
  const [roles, setRoles] = useState([0]);


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
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(img/document_icon.png)",
    backgroundSize: "contain",
    backgroundPosition: "center",
    // gridArea: "document_icon",
  }
  const pythonIconStyle = {
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(img/python_icon.png)",
    backgroundColor: "#97ACC4",
    borderRadius: "1.2vw",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundOrigin: "content-box",
    padding: "2vw",
    // gridArea: "python_icon",
  }
  const programmingLanguagesWrapperStyle = {
    backgroundColor: "#CAE6D8",
    borderRadius: "1.2vw",
    // gridArea: "programming_languages",
  }
  const peopleSearchIconStyle = {
    height: "100%",
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
    height: "100%",
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
  const createButtonWrapperStyle = {
  }
  const createButtonStyle = {
    height: "25%",
  }
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("submitted!")
  }

  return (
      <form onSubmit = {onSubmit}>
        <Grid style={GridWrapperStyle} container justify="center" spacing={5}>
          <Grid item xs={5}>
            <Container maxWidth="lg" style={documentIconStyle} children={false} />
          </Grid>
          <Grid item xs={5} style={titleTextWrapperStyle}>
            <Typography component="h6" style = {titleTextStyle}>
              Створення нового інтегрованого курсу
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Container maxWidth="lg" style={pythonIconStyle} children={false} />
          </Grid>
          <Grid item xs={5}>
            <p>Мови програмування</p>
            <Grid container direction="column" style={programmingLanguagesWrapperStyle}>
              {languages.map((langId) => <DeletableTextField id={`lang-${langId}`} key={langId} />)}
              <Grid item>
                <Button onClick={() => setLanguages([...languages, languages.length])}>Додати нову мову</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <Container maxWidth="lg" style={peopleSearchIconStyle} children={false} />
          </Grid>
          <Grid item xs={5}>
            <p>Ролі у проекті</p>
            <Grid container direction="column" style={rolesWrapperStyle}>
              {roles.map((roleId) => <DeletableTextField id={`role-${roleId}`} key={roleId} />)}
              <Grid item>
                <Button onClick={() => setRoles([...roles, roles.length])}>Додати нову роль</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <Container maxWidth="lg" style={papersIconStyle} children={false} />
          </Grid>
          <Grid item xs={5}>
            <p>Загальна інформація</p>
            <Grid container direction="column" style={generalInfoWrapperStyle}>
              <TextField label="Назва курсу"/>
              <TextField label="Пароль курсу"/>
            </Grid>
          </Grid>
          <Grid container item xs={10} justify="center" style={createButtonWrapperStyle}>
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