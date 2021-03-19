import React, {useState} from 'react'
import useField from '../../hooks/useField'
import {useSelector} from 'react-redux'
import { UserState } from '../../store/types'
import { Button, TextField } from '@material-ui/core'

const CourseRegistrationForm = () => {
  const NOT_SELECTED = -1
  const user = useSelector ((state: {user: UserState}) => state.user)
  const [name, setName] = useState(user.name ? user.name :  "")
  const [surname, setSurname] = useState (user.surname ? user.surname : "")
  const [classId, setClassId] = useState (user.currentCourseId ? user.currentCourseId : undefined)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log ("submitted")
  }

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