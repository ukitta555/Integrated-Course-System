import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useField from '../../hooks/useField'
import { UserState } from '../../store/types'
import { createTeacher, createStudent, updateUserRole } from '../../reducers/userReducer/userThunks'
import {useHistory} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@material-ui/core";
import facultyService from '../../services/facultyService'
import { EEXIST } from 'constants'

const QuestionnaireForm = () =>
{
	const NOT_SELECTED = -1;
	const dispatch = useDispatch()
	const user = useSelector((state: { user: UserState }) => state.user)
	const history = useHistory()
	type Role = "student" | "teacher"
	type Faculty = {
		name: string,
		id: number,
		facultyTeachers: {
			name: string,
			surname: string,
			id: number
		}[]
	}

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

	useEffect(() =>
	{
		async function fetchFaculties()
		{
			const response = await facultyService.getFaculties()
			setFaculties(response)
			setSelectedFacultyID(response[0].id)
			setSelectedTeacherId(response[0].facultyTeachers[0].id)
		}
		fetchFaculties()
	}, [])
	console.log(faculties)
	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) =>
	{
		event.preventDefault()
		console.log('submitted registration form')
		if (role === "student") {
			const studentInfo = {
				name: name.value,
				surname: surname.value,
				courseId: courseId.value,
				coursePassword: coursePassword.value,
				teacherId: selectedTeacherId,
				facultyId: selectedFacultyId,
				id: user.id
			}
			await dispatch(createStudent(studentInfo))
			await dispatch(updateUserRole(0, user.id))
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
		history.push("/course_creating_page")
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
				{
					(faculties.length === 0 || selectedFacultyId === NOT_SELECTED)
						? null
						:
						<>
							<InputLabel id="faculty">Факультет</InputLabel>
							<Select name='faculty' labelId="faculty" id="select_faculty" value={selectedFacultyId} onChange={handleSelectedFacultyChange}>
								{
									faculties.map((faculty: Faculty) =>
									{
										return <MenuItem key={faculty.id} value={faculty.id}> {faculty.name} </MenuItem>
									})
								}
							</Select>
						</>
				}
				{
					(faculties.length === 0 || selectedFacultyId === NOT_SELECTED || selectedTeacherId === NOT_SELECTED || role === "teacher")
						? null
						:
						<>
							<InputLabel id="teacher">Вчитель</InputLabel>
							<Select name="teacher" labelId="teacher" id="select_teacher" value={selectedTeacherId} onChange={handleSelectedTeacherChange}>
								{
									faculties
										.find((f: Faculty) => {return f.id === selectedFacultyId })
										?.facultyTeachers
										.map(teacher =>
										{
											console.log(teacher)
											return (<MenuItem value={teacher.id} key={teacher.id}>
												{`${teacher.surname} ${teacher.name.charAt(0)}.`}
											</MenuItem>)
										})
								}
							</Select>
						</>
				}
				<Button type="submit" variant="contained" color="primary">Далі</Button>
			</form>
		</>
	)
}

export default QuestionnaireForm