import React, { useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useField from '../../hooks/useField'
import {UserState} from '../../store/types'
import { createTeacher, createStudent, updateUserRole } from '../../reducers/userReducer/userThunks'
import questionnaireService from '../../services/questionnaireService'
// import {useHistory} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import {
	Box,
	Container,
	FormControlLabel,
	Grid,
	Radio,
	RadioGroup,
	ThemeProvider, Typography
} from "@material-ui/core";
import facultyService from '../../services/facultyService'
import FacultyInputs, {Faculty, Role} from '../FacultyInputs/FacultyInputs'
import BoxWithImageBG from "../BoxWithImageBG/BoxWithImageBG";
import light from "../../themes/light";
import WrappedInput from "../WrappedInput/WrappedInput";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";


const forwardButtonWrapperStyle = {
	borderRadius: 15,
	width: "20%",
}
const forwardButtonStyle = {
	borderRadius: "inherit",
	textAlign: "center" as "center",
	width: "100%",
}
const radioBoxStyle = {
	borderRadius: 27.5,
}
const radioLabelStyle = {
	margin: "0 5px 0 0",
}
const radioStyle = {
	color: "inherit",
	borderRadius: 50,
	padding: 0,
	margin: "9px",
	backgroundColor: light.palette.theme_white.main,
}
const radioCheckedIconStyle = {
	width: "0.8em",
	height: "0.8em",
}
const radioIconStyle = {
	color: light.palette.theme_white.main,
	...radioCheckedIconStyle,
}
const QuestionnaireForm = () =>
{
	const NOT_SELECTED = -1;
	const dispatch = useDispatch()
	const user = useSelector((state: { user: UserState }) => state.user)
	// const history = useHistory()


	const [role, setRole] = useState<Role>("student");
	const handleRoleChange = () => setRole(role === "student" ? "teacher" : "student")


	const name = useField('text');
	const surname = useField('text');
	const courseId = useField('text');
	const coursePassword = useField('password');

	// when DB is ready change to data received from server
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
			const queResponse = await questionnaireService.createQuestionnaire({
				studentId: user.id,
				classId: Number(courseId.value)
			})
			await dispatch(updateUserRole(2, user.id))
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
		<ThemeProvider theme={light}>
			<form onSubmit={onSubmit} style={{margin: "3% 0"}}>
				<Container>
					<Grid container direction="column" spacing={2}>
						<Grid container item xs direction="row" justify="space-around">
							<Grid item xs={3}>
								<BoxWithImageBG bgimage="document_icon.png"/>
							</Grid>
							<Grid item xs={7}>
								<Box color="theme_black.main">
									<Typography variant="h4" style={{margin: "5% 0"}}>Для продовження роботи, будь ласка, заповніть анкету.</Typography>
								</Box>
							</Grid>
						</Grid>
						<Grid item xs>
							<Box color="theme_black.main">
								<RadioGroup row name="role" value={role} onChange={handleRoleChange}>
									<Grid container direction="row" justify="space-around">
										<Grid container justify="center" item xs={5}>
											<Box bgcolor="theme_green.main" style={radioBoxStyle}>
												<FormControlLabel value="teacher" style={radioLabelStyle} control={<Radio icon={<FiberManualRecordIcon style={radioIconStyle}/>} checkedIcon={<FiberManualRecordIcon style={radioCheckedIconStyle}/>} style={radioStyle} />} label="Я - вчитель" />
											</Box>
										</Grid>
										<Grid container justify="center" item xs={4}>
											<Box bgcolor="theme_green.main" style={radioBoxStyle}>
												<FormControlLabel value="student" style={radioLabelStyle} control={<Radio icon={<FiberManualRecordIcon style={radioIconStyle}/>} checkedIcon={<FiberManualRecordIcon style={radioCheckedIconStyle}/>} style={radioStyle} />} label="Я - учень" />
											</Box>
										</Grid>
									</Grid>
								</RadioGroup>
							</Box>
						</Grid>
						<Grid container item xs direction="row" justify="space-around">
							<Grid item xs={5}>
								<BoxWithImageBG bgimage="name_surname.png" bgcolor="theme_grey.main"/>
							</Grid>
							<Grid container item xs={4} direction="column" spacing={2}>
								<Grid item xs>
									<WrappedInput label="Ім'я" bgcolor="theme_green.main" inputbgcolor="theme_white.main" {...name}/>
								</Grid>
								<Grid item xs>
									<WrappedInput label="Прізвище" bgcolor="theme_green.main" inputbgcolor="theme_white.main" {...surname}/>
								</Grid>
							</Grid>
						</Grid>
						{ role === "student" &&
						<Grid container item xs direction="row" justify="space-around">
							<Grid item xs={5}>
								<BoxWithImageBG bgimage="lock.png" bgcolor="theme_grey.main"/>
							</Grid>
							<Grid container item xs={4} direction="column" spacing={2}>
								<Grid item xs>
									<WrappedInput label="ID курсу" bgcolor="theme_green.main" inputbgcolor="theme_white.main"  inputProps={{pattern: "\\d+",}} {...courseId}/>
								</Grid>
								<Grid item xs>
									<WrappedInput label="Пароль курсу" bgcolor="theme_green.main" inputbgcolor="theme_white.main" inputProps={{autoComplete: "password",}} {...coursePassword}/>
								</Grid>
							</Grid>
						</Grid>
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
						<Grid container item justify="center">
							<Box bgcolor="theme_green.dark" color="theme_black.main" style={forwardButtonWrapperStyle}>
								<Button type="submit" color="inherit" style={forwardButtonStyle}>Далі</Button>
							</Box>
						</Grid>
					</Grid>
				</Container>
			</form>
		</ThemeProvider>
	)
}

export default QuestionnaireForm