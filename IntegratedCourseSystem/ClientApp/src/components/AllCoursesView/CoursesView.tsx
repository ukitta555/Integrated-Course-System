import React, {useState, useEffect} from "react"
import courseService from '../../services/courseService'
import {useSelector} from 'react-redux'
import {Class, UserState} from '../../store/types'
import questionnaireService from "../../services/questionnaireService"
import { Link, useHistory } from "react-router-dom"
import {Box, Button, Container, Grid, LinearProgress, ThemeProvider, Typography} from "@material-ui/core"
import BoxWithImageBG from "../BoxWithImageBG/BoxWithImageBG";
import light from "../../themes/light";
import Course from "../Course/Course";
import AddIcon from "@material-ui/icons/Add";

const CoursesView = () => {
  const user = useSelector((state: { user: UserState }) => state.user)
  const history = useHistory()
  console.log(user)
  const [courses, setCourses] = useState <Class[]>([])

  const groupInPairs: <T>(list: T[]) => T[][]
      = list => list.map((el, i) => i >= list.length -1 ? [el] : [el, list[i + 1]]).filter((_, i) => i % 2 == 0)



  useEffect ( () => {
    async function fetchClasses() {
      if (user.role === "teacher") {
        let response = await courseService.getCoursesForTeacher(user.id)
        response = await Promise.all(response.map (async (course: Class) => {
          course.studentsRegistered = await questionnaireService.getAmountOfStudentsRegisteredForCourse(course.id)
          return course
        })
        )
        console.log(response)
        setCourses(response)
      }
      if (user.role === "student") {
        //console.log ('you are a student you don\'t get any courses')
        const response = await questionnaireService.getQuestionnairesByStudent(user.id)
        console.log(response)
        const classIds : Class[]
          = await Promise.all(
              response.map (async (que: {classId: number, id: number}) => {
                const classResponse = courseService.getCourseByID(que.classId)
                return classResponse
              })
            )
        console.log(classIds)
        setCourses(classIds)
      }
    }
    fetchClasses()
  }, [])


  const handleSplitButtonClick = async (event: any, courseId: number) => {
    console.log("course id:", courseId)
    const response = await courseService.patchCourseGroups(courseId, true)
    console.log (response)
    history.push(`/course_view/${courseId}`)

  }

  const courseWrapperStyle = {
    border: "4px double black"
  }

  console.log(courses)
  return (
      <ThemeProvider theme={light}>
        <Container style={{margin: "36px 0"}}>
          <Grid container spacing={10} direction="column">
            <Grid container item>
              <Grid item xs={5}>
                <BoxWithImageBG bgimage="dogs_learning.png"/>
              </Grid>
              <Grid item xs>
                <Box color="theme_black.main" textAlign="center" style={{margin: "13% 0"}}>
                  <Typography variant="h3">
                    Вітаємо, {user.name}.
                  </Typography>
                  <Typography variant="h3">
                    Ваші курси:
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            { courses.length > 0
                  ? groupInPairs(courses).map (
                      ([c1, c2]) => (
                          <Grid container item xs>
                              <Grid item xs={5}>
                                <Course {...c1} role={user.role} onSplitButtonClick={handleSplitButtonClick} />
                              </Grid>
                              { c2 ?
                                  <Grid item xs={5}>
                                    <Course {...c1} role={user.role} onSplitButtonClick={handleSplitButtonClick}/>
                                  </Grid> : null
                              }
                        </Grid>
                      )
                      // <Container key = {c.id} style={courseWrapperStyle}>
                      //   <Box bgcolor="theme_green.dark" color="theme_white.main">
                      //     { c.areGroupsDefined
                      //         ? (
                      //             <Link to={`/course_view/${c.id}`}>
                      //               <Typography> Course name: {c.name} </Typography>
                      //             </Link>
                      //         ) : <Typography> Course name: {c.name} </Typography>
                      //     }
                      //     <Typography>Course id: {c.id}</Typography>
                      //   </Box>
                      //   <Box bgcolor="theme_green.main" color="theme_black.main">
                      //
                      //   </Box>
                      //
                      //   {
                      //     user.role === 'teacher'
                      //         ? <Button variant = "contained" color="primary" onClick={(event: any) => handleSplitButtonClick(event, c.id)}> Запустити розподіл </Button>
                      //         : null
                      //   }
                      // </Container>
                  )
                  : <LinearProgress />
            }
            <Grid item xs>
              <Box color="theme_black.main" textAlign="center" /* style={registrationButtonBoxStyle} */>
                {/*<Link to = '/register' style={{color: "inherit"}}>*/}
                <Button size="large" color="inherit" startIcon={<AddIcon /* fontSize="inherit" */ style={{fontSize: "4rem"}}/>} /* style={registrationButtonStyle} */ /* onClick={(event: any) => props.onSplitButtonClick(event, props.id)} */>
                  <Typography variant="h5">{ user.role === "teacher" ? "Створити новий курс" : "Зареєструватися на новий курс" }</Typography>
                </Button>
                {/*</Link>*/}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
  )
}

export default CoursesView