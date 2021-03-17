import React, {useState} from 'react'
import useField from '../../hooks/useField'
import {useSelector} from 'react-redux'
import { UserState } from '../../store/types'
import { Button, TextField } from '@material-ui/core'

const CourseRegistrationForm = () => {
  const NOT_SELECTED = -1
  const user = useSelector ((state: {user: UserState}) => state.user)
  const name = useField('text')
  const surname = useField('text')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log ("fuck!")
  }
  return (
    <div>
      {
        <form onSubmit = {handleSubmit}>
          <TextField  {...name}> </TextField>
          <TextField {...surname}> </TextField>
          <Button type="submit" variant="contained" color="primary">Далі</Button>
         </form>
      }
    </div>
  )
}

export default CourseRegistrationForm