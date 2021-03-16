import React, {useState} from 'react'
import facultyService from '../../services/facultyService'
import FacultyInputs from '../FacultyInputs/FacultyInputs'
import {Faculty, Role} from '../FacultyInputs/FacultyInputs'

const CourseRegistrationForm = () => {
  const NOT_SELECTED = -1
  const [faculties, setFaculties] = useState<Faculty[]>([])
	const [selectedFacultyId, setSelectedFacultyID] = useState<number>(NOT_SELECTED)
	const [selectedTeacherId, setSelectedTeacherId] = useState<number>(NOT_SELECTED)

  const fetchFaculties = async () =>
	{
		const response = await facultyService.getFaculties()
		setFaculties(response)
		setSelectedFacultyID(response[0].id)
		setSelectedTeacherId(response[0].facultyTeachers[0].id)
	}


  return (
    <div>
      {//<FacultyInputs />
      }
    </div>
  )
}

export default CourseRegistrationForm