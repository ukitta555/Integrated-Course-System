import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import useField from '../../hooks/useField'
import {UserState} from '../../store/types'
import {createTeacher, createStudent, updateUserRole} from '../../reducers/userReducer/userThunks'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select} from "@material-ui/core";


const QuestionnaireForm = () =>
{
    const dispatch = useDispatch()
    const user = useSelector((state:{user: UserState}) => state.user)

    type Role = "student" | "teacher"

    const [role, setRole] = useState<Role>("student");
    const handleRoleChange = () => setRole(role === "student" ? "teacher" : "student")


    const name = useField('text');
    const surname = useField('text');
    const courseId = useField('text');
    const coursePassword = useField ('password');

    // when DB is ready change to data recieved from server
    const [faculty, setFaculty] = useState ('ФКНК')
    const [teacher, setTeacher] = useState ('Омельчук Л.')

    const courseIdInputProps = {
        pattern: "\\d+"
    }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('submitted registration form')
    if (role === "student") {
        const studentInfo = {
            name: name.value,
            surname: surname.value,
            courseId: courseId.value,
            coursePassword: coursePassword.value,
            teacherId: 123,
            facultyId: 123
        }
        await dispatch (createStudent(studentInfo))
        await dispatch (updateUserRole(0, user.id))
    }
    else if (role === "teacher") {
        const teacherInfo = {
            name: name.value,
            surname: surname.value,
            facultyId: 123
        }
        await dispatch (createTeacher(teacherInfo))
        await dispatch (updateUserRole(1, user.id))
    }

    console.log(name.value, surname.value, courseId.value, coursePassword.value)
  }

  const handleFacultyChange = (event:React.ChangeEvent<{ value: unknown }>) => {
    setFaculty(event.target.value as string)
  }

  const handleTeacherChange = (event:React.ChangeEvent<{ value: unknown }>) => {
      setTeacher(event.target.value as string)
  }


  return (
    <>
        <div>
            <p>User email:{user.email} </p>
            <p>User ID: {user.id}</p>
        </div>
        <form onSubmit = {onSubmit}>
            <RadioGroup row name="role" value={role} onChange={handleRoleChange}>
                <FormControlLabel value="teacher" control={<Radio />} label="Я - вчитель" />
                <FormControlLabel value="student" control={<Radio />} label="Я - учень" />
            </RadioGroup>
            <TextField label="Ім'я" {...name} />
            <TextField label="Прізвище" {...surname} />
            {
            role === "student" &&
            <>
                <TextField label="ID курсу" inputProps={courseIdInputProps} {...courseId} />
                <TextField label="Пароль курсу" {...coursePassword} />
            </>
             }
            <InputLabel id="faculty">Факультет</InputLabel>
            <Select name = 'fac' labelId="faculty" id="select_faculty" value={faculty} onChange = {handleFacultyChange}>
                <MenuItem value="ФКНК">ФКНК</MenuItem>
                <MenuItem value="ФІТ">ФІТ</MenuItem>
                <MenuItem value="ННЦ">ННЦ</MenuItem>
            </Select>
            {
            role === "student" &&
            <>
                <InputLabel id="teacher">Вчитель</InputLabel>
                <Select labelId="teacher" id="select_teacher" value={teacher} onChange = {handleTeacherChange}>
                    <MenuItem value="Омельчук Л.">Омельчук Л.</MenuItem>
                    <MenuItem value="Русіна Н.">Русіна Н.</MenuItem>
                    <MenuItem value="Шишацька О.">Шишацька О.</MenuItem>
                </Select>
            </>
            }
            <Button type="submit" variant="contained" color="primary">Далі</Button>
        </form>
    </>
  )
}

export default QuestionnaireForm