import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import useField from '../../hooks/useField'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select} from "@material-ui/core";
import {UserState, NO_ID} from '../../store/types'

const QuestionnaireForm = () =>
{
    const user = useSelector((state:{user: UserState}) => state.user)

    type Role = "student" | "teacher"
    const [role, setRole] = useState<Role>("student");
    const handleRoleChange = () => setRole(role === "student" ? "teacher" : "student")


    const name = useField('text');
    const surname = useField('text');
    const course_id = useField('text');
    const course_password = useField ('password');

    // when DB is ready change to data recieved from server
    const [faculty, setFaculty] = useState ('ФКНК')
    const [teacher, setTeacher] = useState ('Омельчук Л.')
    const [cathedra, setCathedra] = useState ('ТТП') // do we need this stuff?

    const courseIdInputProps = {
        pattern: "\\d+"
    }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('submitted registration form')
    console.log(name.value, surname.value, course_id.value, course_password.value)
  }

  const handleFacultyChange = (event:React.ChangeEvent<{ value: unknown }>) => {
    setFaculty(event.target.value as string)
  }

  const handleTeacherChange = (event:React.ChangeEvent<{ value: unknown }>) => {
      setTeacher(event.target.value as string)
  }

  const handleCathedraChange = (event:React.ChangeEvent<{ value: unknown }>) => {
      setCathedra(event.target.value as string)
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
                <TextField label="ID курсу" inputProps={courseIdInputProps} {...course_id} />
                <TextField label="Пароль курсу" {...course_password} />
            </>
             }
            <InputLabel id="faculty">Факультет</InputLabel>
            <Select labelId="faculty" id="select_faculty" value={faculty} onChange = {handleFacultyChange}>
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
            {
            role === "teacher" &&
            <>
                <InputLabel id="cathedra">Кафедра</InputLabel>
                <Select labelId="cathedra" id="select_cathedra" value={cathedra} onChange = {handleCathedraChange}>
                    <MenuItem value="ТТП">ТТП</MenuItem>
                    <MenuItem value="МІ">МІ</MenuItem>
                    <MenuItem value="ТК">ТК</MenuItem>
                    <MenuItem value="ОМ">ОМ</MenuItem>
                    <MenuItem value="ДО">ДО</MenuItem>
                </Select>
            </>
            }
            <Button type="submit" variant="contained" color="primary">Далі</Button>
        </form>
    </>
  )
}

export default QuestionnaireForm