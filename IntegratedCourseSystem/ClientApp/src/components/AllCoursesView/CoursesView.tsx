import React, {useState, useEffect} from "react"
import courseService from '../../services/courseService'
import {useSelector} from 'react-redux'
import {UserState} from '../../store/types'
import { useRadioGroup } from "@material-ui/core"

const CoursesView = () => {
  const user = useSelector((state: { user: UserState }) => state.user)
  console.log(user)
  const [courses, setCourses] = useState
  <{id:number,
    inviteCode: string,
    maxCapacity: number,
    name: string}[]>
    ([{id: 123, inviteCode: "a", maxCapacity:1, name: '123'}])

  useEffect ( () => {
    async function fetchClasses() {
      const response = await courseService.getCourses(user.id)
      console.log(response)
      setCourses(response)
    }
    fetchClasses()
  }, [])
  console.log(courses)
  return (
    <table>
      <tbody>
        {
        courses
        ? courses.map (
          c =>
          <tr key = {c.id}>
            <td>
              Course id: {c.id}
            </td>
            <td>
              Course name: {c.name}
            </td>
            <td>
              Course capacity: {c.maxCapacity}
            </td>
          </tr>
        )
        : null
        }
      </tbody>
    </table>


  )
}

export default CoursesView

