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
import { Spinner } from "reactstrap"
import studentGroupsService from "../../services/studentGroupsService"

const CoursesView = () => {
  const user = useSelector((state: { user: UserState }) => state.user)
  const history = useHistory()
  console.log(user)
  const [courses, setCourses] = useState <Class[]>([])
  const groupInPairs: <T>(list: T[]) => T[][]
      = list => list.map((el, i) => i >= list.length - 1 ? [el] : [el, list[i + 1]]).filter((_, i) => i % 2 == 0)



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
        let classIds : Class[]
          = await Promise.all(
              response.map(async (que: {classId: number, id: number}) => {
                const classResponse = courseService.getCourseByID(que.classId)
                return classResponse
              })
            )
        classIds = await Promise.all(classIds.map (async (course: Class) => {
              course.studentsRegistered = await questionnaireService.getAmountOfStudentsRegisteredForCourse(course.id)
              return course
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
    const algoResp = await courseService.runAlgo(courseId)
    console.log (response)
    history.push(`/course_view/${courseId}`)
  }

  console.log(courses)
  return (
      <ThemeProvider theme={light}>
      {
        courses.length > 0
        ?
        <Container style={{margin: "36px 0"}}>
          <Grid container spacing={10} direction="column" >
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
            {
            groupInPairs(courses).map (
                      ([c1, c2]) => (
                          <Grid container justify="space-around" item xs key={c1.id}>
                              <Grid item xs={5}>
                                <Course {...c1} role={user.role} onSplitButtonClick={handleSplitButtonClick} />
                              </Grid>
                              { c2 ?
                                  <Grid item xs={5}>
                                    <Course {...c2}  role={user.role} onSplitButtonClick={handleSplitButtonClick}/>
                                  </Grid> : null
                              }
                        </Grid>
                      )
                  )
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
      : <LinearProgress />
      }
      </ThemeProvider>
  )
}

export default CoursesView