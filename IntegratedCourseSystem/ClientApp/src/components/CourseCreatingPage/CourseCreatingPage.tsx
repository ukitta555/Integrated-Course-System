import React, {useState} from 'react'

import useField from '../../hooks/useField'
import {useSelector} from 'react-redux'
import {UserState} from '../../store/types'
import courseService from '../../services/courseService'
import techService from '../../services/techService'
import roleService from '../../services/roleService'
import courseTechService from '../../services/courseTechService'
import subjectService from '../../services/subjectService'
import courseSubjectService from '../../services/courseSubjectService'

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {Grid, InputBase, TextField} from "@material-ui/core";
import DeletableTextField from "../DeletableTextField/DeletableTextField";
import { LocationSearchingTwoTone } from '@material-ui/icons';
import courseRoleService from '../../services/courseRoleService'

const CourseCreatingPage = () => {
  const [languages, setLanguages] = useState([{id: 0, value: "C#"}]);
  const [roles, setRoles] = useState([{id: 1, value: "Tester"}]);
  const [subjects, setSubjects] = useState([{id: 2, value: "Obj.-oriented programming"}]);
  const [idCounter, setIdCounter] = useState(3);
  const courseName = useField ('text')
  const coursePassword = useField ('password')
  const user  = useSelector ((state:{user: UserState}) => state.user)

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
      //languages,
      //roles,
      //subjects,
      name: courseName.value,
      inviteCode: coursePassword.value,
      teacherId: user.id,
      maxCapacity: 125
    }


    const techValues = languages.map (l => {return {name: l.value}})
    const roleValues = roles.map (r => {return {name: r.value}})
    const subjectValues = subjects.map (s => {return {name: s.value}})

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

  }

  const GridWrapperStyle = {
    marginTop: "2vw",
    height: "98vw",
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
    fontSize: "3vw",
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
    padding: "2vw 0",

    // gridArea: "python_icon",
  }
  const programmingLanguagesWrapperStyle = {
    backgroundColor: "#CAE6D8",
    borderRadius: "1.2vw",
    // gridArea: "programming_languages",
  }
  const textFieldStyles = {
    background: "#F5F5F5",
    borderRadius: "50px",
    margin: "5% 0",
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
    paddingTop: "5%",
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
    height: "30%",
    width: "25%",
    borderRadius: 50,
  }


  return (
      <form onSubmit = {onSubmit} style={{padding: `0 ${spacing * 4}px`}}>
        <Grid style={GridWrapperStyle} container justify="space-around" spacing={spacing}>
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
            <Grid container direction="column" justify="center" alignItems="center" style={programmingLanguagesWrapperStyle}>
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
                <Button onClick={handleAddListItem(languages, setLanguages)({id: idCounter, value: "C#"})}>
                  Додати нову мову
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <Container maxWidth="lg" style={peopleSearchIconStyle} children={false} />
          </Grid>
          <Grid item xs={5}>
            <p>Ролі у проекті</p>
            <Grid container direction="column" justify="center" alignItems="center" style={rolesWrapperStyle}>
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
                <Button onClick={handleAddListItem(roles, setRoles)({id: idCounter, value: "Developer"})}>
                  Додати нову роль
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <Container maxWidth="lg" style={papersIconStyle} children={false} />
          </Grid>
          <Grid item xs={5}>
            <p>Загальна інформація</p>
            <Grid container direction="column" justify="center" alignItems="center" style={generalInfoWrapperStyle}>
              <InputBase style={textFieldStyles} placeholder="Назва курсу" inputProps={{style: {paddingLeft: "1em"}}} {...courseName}/>
              <InputBase style={textFieldStyles} placeholder="Пароль курсу" inputProps={{style: {paddingLeft: "1em"}}} {...coursePassword}/>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <Container maxWidth="lg" style={pythonIconStyle} children={false} />
          </Grid>
          <Grid item xs={5}>
            <p>Предмети для складання</p>
            <Grid container direction="column" style={programmingLanguagesWrapperStyle}>
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
                <Button onClick={handleAddListItem(subjects, setSubjects)({id: idCounter, value: "System verification"})}>
                  Додати новий предмет
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item xs={10} justify="center" alignItems="center" style={createButtonWrapperStyle}>
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