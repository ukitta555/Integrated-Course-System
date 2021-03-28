import React, {useState, useEffect} from "react"
import courseService from '../../services/courseService'
import {useSelector} from 'react-redux'
import {Class, UserState} from '../../store/types'
import questionnaireService from "../../services/questionnaireService"
import { Link, useHistory } from "react-router-dom"
import { Button, LinearProgress, Typography } from "@material-ui/core"

const CoursesView = () => {
  const user = useSelector((state: { user: UserState }) => state.user)
  const history = useHistory()
  console.log(user)
  const [courses, setCourses] = useState <Class[]>([])


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
    <>
      {
        courses.length > 0
        ? courses.map (
          c =>
            <div key = {c.id} style = {courseWrapperStyle}>
                <Typography>Course id: {c.id} </Typography>
                <Typography> Students registred: {c.studentsRegistered}/{c.maxCapacity} </Typography>
                {
                  c.areGroupsDefined
                  ? <Link to={`/course_view/${c.id}`}> <Typography>   Course name: {c.name}  </Typography> </Link>
                  : <> Course name: {c.name} </>
                }

                {
                  user.role === 'teacher'
                  ? <Button variant = "contained" color="primary" onClick={(event: any) => handleSplitButtonClick(event, c.id)}> Запустити розподіл </Button>
                  : null
                }
            </div>
        )
        : <LinearProgress />
      }
    </>

  )
}

export default CoursesView