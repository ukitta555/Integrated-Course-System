import React, {useState, useEffect} from 'react'
import {ClassRole, ClassSubject, ClassTech, UserState} from '../../store/types'
import {useSelector} from 'react-redux'
import { Button, TextField } from '@material-ui/core'
import courseSubjectService from '../../services/courseSubjectService'
import courseRoleService from '../../services/courseRoleService'
import courseTechService from '../../services/courseTechService'

const CourseRegistrationForm = () => {
  const NOT_SELECTED = -1
  const user = useSelector ((state: {user: UserState}) => state.user)
  const [name, setName] = useState<string>(user.name ? user.name :  "")
  const [surname, setSurname] = useState<string> (user.surname ? user.surname : "")
  const [classId, setClassId] = useState<number | undefined> (user.currentCourseId ? user.currentCourseId : undefined)
  const [classSubjects, setClassSubjects] =  useState<ClassSubject[]>([])
  const [classTeches, setClassTeches] = useState<ClassTech[]>([])
  const [classRoles, setClassRoles] = useState<ClassRole[]>([])
  // add a type(maybe some day one day never ok?????????????????????????????????????????)
  const [classStudents, setClassStudents] = useState([])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log ("submitted")
    debugger;
  }

  useEffect (() => {
    async function fetchData() {
      console.log('fetching smthing')
      const apiClassSubjects = await courseSubjectService.getCourseSubjects(user.currentCourseId)
      setClassSubjects(apiClassSubjects)
      const apiClassRoles = await courseRoleService.getCourseRoles(user.currentCourseId)
      setClassRoles(apiClassRoles)
      const apiClassTeches = await courseTechService.getCourseTechs(user.currentCourseId)
      setClassTeches(apiClassTeches)

    }
    fetchData()
  }, [])

  const handleNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setName (event.target.value as string)
  }
  const handleSurnameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSurname (event.target.value as string)
  }
  const handleClassIdChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setClassId (event.target.value as number)
  }

  return (
    <div>
      {
        <form onSubmit = {handleSubmit}>
          <TextField label="Ім'я" type = 'text' value = {name} onChange = {handleNameChange}/>
          <TextField label="Прізвище" type = 'text' value = {surname} onChange = {handleSurnameChange}/>
          <TextField label="ID класу" type = 'text' value = {classId} onChange = {handleClassIdChange}/>
          <Button type="submit" variant="contained" color="primary">Далі</Button>
         </form>
      }
    </div>
  )
}

export default CourseRegistrationForm