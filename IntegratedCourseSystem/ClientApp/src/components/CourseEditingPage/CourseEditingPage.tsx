import React, {useState} from 'react'

import useField from '../../hooks/useField'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {UserState} from '../../store/types'
import courseService from '../../services/courseService'
import techService from '../../services/techService'
import roleService from '../../services/roleService'
import courseTechService from '../../services/courseTechService'
import subjectService from '../../services/subjectService'
import courseSubjectService from '../../services/courseSubjectService'

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Box, Grid, InputBase, TextField} from "@material-ui/core";
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import DeletableTextField from "../DeletableTextField/DeletableTextField";
import { LocationSearchingTwoTone } from '@material-ui/icons';
import courseRoleService from '../../services/courseRoleService'

import light from "../../themes/light"

const CourseEditingPage = () => {
  const [languages, setLanguages] = useState([{id: 0, value: "C#"}]);
  const [roles, setRoles] = useState([{id: 1, value: "Tester"}]);
  const [subjects, setSubjects] = useState([{id: 2, value: "Obj.-oriented programming"}]);
  const [idCounter, setIdCounter] = useState(3);
  const courseName = useField ('text')
  const coursePassword = useField ('password')
  const user  = useSelector ((state:{user: UserState}) => state.user)
  const history = useHistory()

  const handleAddListItem: <T>(list: T[], setList: React.Dispatch<React.SetStateAction<T[]>>) =>
    (item: T) => () => void = (list, setList) => item => () => {
    setList([...list, item])
    setIdCounter(idCounter + 1)
  };

  const handleDeleteListItem: <T extends { id: number; }>(list: T[], setList: React.Dispatch<React.SetStateAction<T[]>>) => (idToRemove: number) => () => void
    = (list, setList) => idToRemove => () => {
    setList(list.filter(item => item.id != idToRemove));
  };
  const spacing = 4

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const courseInfo = {
      name: courseName.value,
      inviteCode: coursePassword.value,
      teacherId: user.id,
      maxCapacity: 125
    }

    const techValues = languages.map (l => ({name: l.value}))
    const roleValues = roles.map (r => ({name: r.value}))
    const subjectValues = subjects.map (s => ({name: s.value}))

    console.log(courseInfo)
    const courseResponse = await courseService.addCourse(courseInfo)
    console.log("response from addCourse:", courseResponse)
    const techResponse = await techService.addTechs({teches: techValues})
    console.log("response from addTechs:", techResponse)
    const roleResponse = await roleService.addRoles({roles: roleValues})
    console.log("response from addRoles:", roleResponse)
    const subjectResponse = await subjectService.addSubjects({subjects: subjectValues})
    console.log("response from addSubjects:", subjectResponse)

    const courseId = courseResponse.id
    const techIds = techResponse.map (tech => tech.id)
    const roleIds = roleResponse.map (role => role.id)
    const subjectIds = subjectResponse.map (subject => subject.id)

    const courseTechResponse = await courseTechService.addCourseTechs({techs: techIds, courseId})
    console.log("response from addCourseTechs", courseTechResponse)

    const courseRoleResponse = await courseRoleService.addCourseRoles({roles: roleIds, courseId})
    console.log("response from addCourseRoles", courseRoleResponse)

    const courseSubjectResponse = await courseSubjectService.addCourseSubjects({subjects: subjectIds, courseId})
    console.log("response from addCourseSubjects:", courseSubjectResponse)
    history.push("/course_view")
  }

  const GridWrapperStyle = {
    marginTop: "2vw",
    height: "98vw",
  }
  const titleTextWrapperStyle = {

  }
  const titleTextStyle = {
    color: "#606675",
    fontStyle: "normal",
    fontWeight: "normal" as "normal",
    textAlign: 'center' as 'center',
    fontSize: "3vw",
  }
  const documentIconStyle = {
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(img/document_icon.png)",
    backgroundSize: "contain",
    backgroundPosition: "center",
  }
  const pythonIconStyle = {
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(img/python_icon.png)",
    borderRadius: "1.2vw",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundOrigin: "content-box",
    padding: "2vw 0",
  }
  const textFieldsWrapperStyle = {
    borderRadius: "1.2vw",
    paddingTop: "3%",
  }
  const textFieldStyles = {
    borderRadius: "50px",
    margin: "3% 0",
  }
  const peopleSearchIconStyle = {
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(img/people_search_icon.png)",
    backgroundColor: "#97ACC4",
    borderRadius: "1.2vw",
    backgroundSize: "contain",
    backgroundPosition: "center",
  }
  const rolesWrapperStyle = {
    backgroundColor: "#CAE6D8",
    borderRadius: "1.2vw",
    paddingTop: "5%",
  }
  const papersIconStyle = {
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(img/papers_icon.png)",
    backgroundColor: "#97ACC4",
    borderRadius: "1.2vw",
    backgroundSize: "contain",
    backgroundPosition: "center",
  }
  const generalInfoWrapperStyle = {
    backgroundColor: "#CAE6D8",
    borderRadius: "1.2vw",
  }
  const createButtonWrapperStyle = {
  }
  const createButtonBoxStyle = {
    height: "50%",
    width: "25%",
    borderRadius: 50,
}
  const createButtonStyle = {
    height: "100%",
    width: "100%",
    borderRadius: "inherit",
    color: "inherit",
  }
  const addButtonStyle = {
    color: "inherit",
  }
  return (
      <ThemeProvider theme={light}>
      <form onSubmit = {onSubmit} style={{padding: `0 ${spacing * 4}px`}}>
        <Grid container style={GridWrapperStyle} justify="space-around" spacing={spacing}>
          <Grid item xs={5}>
            <Box maxWidth="lg" bgcolor="" style={documentIconStyle} children={false} />
          </Grid>
          <Grid item container justify="center" alignItems="center" xs={5} style={titleTextWrapperStyle}>
            <Typography component="h6" style = {titleTextStyle}>
              Створення нового інтегрованого курсу
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Box maxWidth="lg" bgcolor="theme_grey.main" style={pythonIconStyle} children={false} />
          </Grid>
          <Grid item xs={5}>
            <Box color="theme_black.main">
              <p>Мови програмування</p>
              <Box bgcolor="theme_green.main" style={textFieldsWrapperStyle}>
                <Grid container direction="column" justify="center" alignItems="center">
                  {languages.map( item =>
                      <DeletableTextField
                          onDelete={handleDeleteListItem(languages, setLanguages)(item.id)}
                          id={`lang-${item.id}`}
                          key={item.id}
                          value = {item.value}
                          onChange = {
                            (event: React.ChangeEvent<HTMLInputElement>) => setLanguages(
                                languages.map(language =>
                                    language.id !== item.id
                                        ? language
                                        : {value: event.target.value, id: language.id}))
                          }
                      />
                  )}
                  <Grid item>
                    <Button style={addButtonStyle} onClick={handleAddListItem(languages, setLanguages)({id: idCounter, value: "C#"})}>
                      Додати нову мову
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box maxWidth="lg" bgcolor="theme_grey.main" style={peopleSearchIconStyle} children={false} />
          </Grid>
          <Grid item xs={5}>
            <Box color="theme_black.main">
              <p>Ролі у проекті</p>
              <Box bgcolor="theme_green.main" style={textFieldsWrapperStyle}>
                <Grid container direction="column" justify="center" alignItems="center">
                  {roles.map( item =>
                      <DeletableTextField
                          onDelete={handleDeleteListItem(roles, setRoles)(item.id)}
                          id={`role-${item.id}`}
                          key={item.id}
                          value = {item.value}
                          onChange = {
                            (event: React.ChangeEvent<HTMLInputElement>) => setRoles(
                                roles.map(role =>
                                    role.id !== item.id
                                        ? role
                                        : {value: event.target.value, id: role.id}))
                          }
                      />
                  )}
                  <Grid item>
                    <Button style={addButtonStyle} onClick={handleAddListItem(roles, setRoles)({id: idCounter, value: "Developer"})}>
                      Додати нову роль
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box maxWidth="lg" bgcolor="theme_grey.main" style={papersIconStyle} children={false} />
          </Grid>
          <Grid item xs={5}>
            <Box color="theme_black.main">
              <p>Загальна інформація</p>
              <Box bgcolor="theme_green.main" style={textFieldsWrapperStyle}>
                <Grid container direction="column" justify="center" alignItems="center">
                  <Box bgcolor="theme_white.main" style={textFieldStyles}>
                    <Grid item>
                        <InputBase placeholder="Назва курсу" inputProps={{style: {paddingLeft: "1em"}}} style={{color: "inherit"}} {...courseName}/>
                    </Grid>
                  </Box>
                  <Box bgcolor="theme_white.main" style={textFieldStyles}>
                    <Grid item>
                      <InputBase placeholder="Пароль курсу" inputProps={{style: {paddingLeft: "1em"}}} {...coursePassword}/>
                    </Grid>
                  </Box>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box maxWidth="lg" bgcolor="theme_grey.main" style={pythonIconStyle} children={false} />
          </Grid>
          <Grid item xs={5}>
            <Box color="theme_black.main">
              <p>Предмети для складання</p>
              <Box bgcolor="theme_green.main" color="theme_black.main" style={textFieldsWrapperStyle}>
                <Grid container direction="column" justify="center" alignItems="center">
                  {subjects.map( item =>
                      <DeletableTextField
                          onDelete={handleDeleteListItem(subjects, setSubjects)(item.id)}
                          id={`lang-${item.id}`}
                          key={item.id}
                          value = {item.value}
                          onChange = {
                            (event: React.ChangeEvent<HTMLInputElement>) => setSubjects(
                                subjects.map(subject =>
                                    subject.id !== item.id
                                        ? subject
                                        : {value: event.target.value, id: subject.id}))
                          }
                      />
                  )}
                  <Grid item>
                    <Button style={addButtonStyle} onClick={handleAddListItem(subjects, setSubjects)({id: idCounter, value: "System verification"})}>
                      Додати новий предмет
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid container item xs={10} justify="center" alignItems="center" style={createButtonWrapperStyle}>
            <Box bgcolor="theme_green.dark" color="theme_black.main" style={createButtonBoxStyle}>
              <Button type="submit" style={createButtonStyle}>Зберегти</Button>
            </Box>
          </Grid>
        </Grid>
      </form>
      </ThemeProvider>
  )
}

export default CourseEditingPage