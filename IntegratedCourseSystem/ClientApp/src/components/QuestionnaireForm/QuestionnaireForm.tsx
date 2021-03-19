import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useField from '../../hooks/useField'
import { UserState } from '../../store/types'
import { createTeacher, createStudent, updateUserRole } from '../../reducers/userReducer/userThunks'
import questionnaireService from '../../services/questionnaireService'
import {useHistory} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@material-ui/core";
import facultyService from '../../services/facultyService'
import FacultyInputs from '../FacultyInputs/FacultyInputs'
import {Faculty, Role} from '../FacultyInputs/FacultyInputs'


const QuestionnaireForm = () =>
{
	const NOT_SELECTED = -1;
	const dispatch = useDispatch()
	const user = useSelector((state: { user: UserState }) => state.user)
	const history = useHistory()


	const [role, setRole] = useState<Role>("student");
	const handleRoleChange = () => setRole(role === "student" ? "teacher" : "student")


	const name = useField('text');
	const surname = useField('text');
	const courseId = useField('text');
	const coursePassword = useField('password');

	// when DB is ready change to data recieved from server
	const [faculties, setFaculties] = useState<Faculty[]>([])
	const [selectedFacultyId, setSelectedFacultyID] = useState<number>(NOT_SELECTED)

	const [selectedTeacherId, setSelectedTeacherId] = useState<number>(NOT_SELECTED)

	const courseIdInputProps = {
		pattern: "\\d+",
		...courseId
	}

	const coursePasswordProps = {
		autoComplete: "password",
		...coursePassword
	}

	const fetchFaculties = async () =>
	{
		const response = await facultyService.getFaculties()
		setFaculties(response)
		setSelectedFacultyID(response[0].id)
		setSelectedTeacherId(response[0].facultyTeachers[0].id)
	}

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) =>
	{
		event.preventDefault()
		console.log('submitted registration form')
		if (role === "student") {
			const studentInfo = {
				name: name.value,
				surname: surname.value,
				courseId: Number(courseId.value), // add check to whether it is actually a number!
				coursePassword: coursePassword.value,
				teacherId: selectedTeacherId,
				facultyId: selectedFacultyId,
				id: user.id,
				isRegFilledIn: false
			}
			await dispatch(createStudent(studentInfo))
			await dispatch(updateUserRole(2, user.id))
			const queResponse = await questionnaireService.createQuestionnaire({
				studentId: user.id,
				classId: Number(courseId.value)
			})
			console.log(queResponse)
		}
		else if (role === "teacher") {
			const teacherInfo = {
				name: name.value,
				surname: surname.value,
				facultyId: selectedFacultyId,
				id: user.id
			}
			console.log(teacherInfo)
			await dispatch(createTeacher(teacherInfo))
			await dispatch(updateUserRole(1, user.id))
		}
		// console.log(name.value, surname.value, courseId.value, coursePassword.value)
	}

	const handleSelectedFacultyChange = (event: React.ChangeEvent<{ value: unknown }>) =>
	{
		setSelectedFacultyID(event.target.value as number)
		const faculty = faculties
			.find((f: Faculty) => {return f.id === event.target.value })

		setSelectedTeacherId(faculty?.facultyTeachers[0].id || NOT_SELECTED)
	}

	const handleSelectedTeacherChange = (event: React.ChangeEvent<{ value: unknown }>) =>
	{
		setSelectedTeacherId(event.target.value as number)
	}

	console.log(selectedFacultyId)
	return (
		<>
			<div>
				<p>User email:{user.email} </p>
				<p>User ID: {user.id}</p>
			</div>
			<form onSubmit={onSubmit}>
				<RadioGroup row name="role" value={role} onChange={handleRoleChange}>
					<FormControlLabel value="teacher" control={<Radio />} label="Я - вчитель" />
					<FormControlLabel value="student" control={<Radio />} label="Я - учень" />
				</RadioGroup>
				<TextField label="Ім'я" {...name} />
				<TextField label="Прізвище" {...surname} />
				{
     		 role === "student" &&
     	 		<>
        	<TextField label="ID курсу" inputProps={courseIdInputProps} />
      	  <TextField label="Пароль курсу"  inputProps={coursePasswordProps}/>
     		 </>
    		}
				<FacultyInputs
					faculties = {faculties}
					selectedFacultyId = {selectedFacultyId}
					selectedTeacherId = {selectedTeacherId}
					handleSelectedFacultyChange = {handleSelectedFacultyChange}
					handleSelectedTeacherChange = {handleSelectedTeacherChange}
					role = {role}
					fetchFaculties = {fetchFaculties}
				/>
				<Button type="submit" variant="contained" color="primary">Далі</Button>

			</form>
		</>
	)

}

export default QuestionnaireForm