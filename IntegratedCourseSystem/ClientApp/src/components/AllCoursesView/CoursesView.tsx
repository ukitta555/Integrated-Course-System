import React, {useState, useEffect} from "react"
import courseService from '../../services/courseService'
import {useSelector} from 'react-redux'
import {UserState} from '../../store/types'
import questionnaireService from "../../services/questionnaireService"
import { Link } from "react-router-dom"
import { Button } from "@material-ui/core"

const CoursesView = () => {
  const user = useSelector((state: { user: UserState }) => state.user)
  console.log(user)
  const [courses, setCourses] = useState
  <{id:number,
    inviteCode: string,
    maxCapacity: number,
    name: string,
    areGroupsDefined: boolean}[]>
    ([])

  const courseWrapperStyle = {
    border: "4px double black"
  }

  useEffect ( () => {
    async function fetchClasses() {
      if (user.role === "teacher") {
        const response = await courseService.getCoursesForTeacher(user.id)
        console.log(response)
        setCourses(response)
      }
      if (user.role === "student") {
        //console.log ('you are a student you don\'t get any courses')
        const response = await questionnaireService.getQuestionnairesByStudent(user.id)
        console.log(response)
        const classIds : {id:number,
          inviteCode: string,
          maxCapacity: number,
          name: string,
          areGroupsDefined: boolean}[]
          = await Promise.all(
              response.map (async (que: {classId: number, id: number}) => {
                const classResponse = courseService.getCourseForStudent(que.classId)
                return classResponse
              })
            )
        console.log(classIds)
        setCourses(classIds)
      }
    }
    fetchClasses()
  }, [])
  console.log(courses)
  return (
    <>
      {
        courses
        ? courses.map (
          c =>
            <div key = {c.id} style = {courseWrapperStyle}>
                Course id: {c.id}
                <br />
                {
                  c.areGroupsDefined
                  ? <Link to='/group_view'> Course name: {c.name} </Link>
                  : <> Course name: {c.name} </>
                }

                <br />
                {
                  user.role === 'teacher'
                  ? <Button variant = "contained" color="primary"> Запустити розподіл </Button>
                  : null
                }
            </div>
        )
        : null
      }
    </>

  )
}

export default CoursesView