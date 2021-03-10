import React, {useState, useEffect} from "react"
import courseService from '../../services/courseService'

const CoursesView = () => {
  const [courses, setCourses] = useState
  <{id:number,
    inviteCode: string,
    maxCapacity: number,
    name: string}[]>
    ([{id: 123, inviteCode: "a", maxCapacity:1, name: '123'}])

  useEffect ( () => {
    async function fetchClasses() {
      const response = await courseService.getCourses()
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

