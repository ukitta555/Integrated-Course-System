import React, {useState} from 'react'
import useField from '../../hooks/useField'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select} from "@material-ui/core";

const QuestionnaireForm = () => {

    type Role = "student" | "teacher"
    const [role, setRole] = useState<Role>("student");
    const handleRoleChange = () => setRole(role === "student" ? "teacher" : "student")


    const name = useField('text');
    const surname = useField('text');
    const course_id = useField('text');
    const course_password = useField ('password');


    const courseIdInputProps = {
        pattern: "\\d+"
    }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('submitted registration form')
    console.log(name.value, surname.value, course_id.value, course_password.value)
  }

  // const validateEmail: (email: string) => boolean
  //     = email => email.search(/@knu\.ua$/) !== -1

  return (
    <form onSubmit = {onSubmit}>
        <RadioGroup row name="role" value={role} onChange={handleRoleChange}>
            <FormControlLabel value="teacher" control={<Radio />} label="Я - вчитель" />
            <FormControlLabel value="student" control={<Radio />} label="Я - учень" />
        </RadioGroup>
        <TextField label="Ім'я" {...name} />
        <TextField label="Прізвище" {...surname} />
        { role === "student" && <>
            <TextField label="ID курсу" inputProps={courseIdInputProps} {...course_id} />
            <TextField label="Пароль курсу" {...course_password} /> </> }
        <InputLabel id="faculty">Факультет</InputLabel>
        <Select labelId="faculty" id="select_faculty" value="ФКНК">
            <MenuItem value="ФКНК">ФКНК</MenuItem>
            <MenuItem value="ФІТ">ФІТ</MenuItem>
            <MenuItem value="ННЦ">ННЦ</MenuItem>
        </Select>
        { role === "student" && <>
            <InputLabel id="teacher">Вчитель</InputLabel>
            <Select labelId="teacher" id="select_teacher" value="Омельчук Л. Л.">
                <MenuItem value="Омельчук Л. Л.">Омельчук Л. Л.</MenuItem>
                <MenuItem value="Русіна Н.">Русіна Н.</MenuItem>
                <MenuItem value="Шишацька О.">Шишацька О.</MenuItem>
            </Select> </>}
        { role === "teacher" && <>
            <InputLabel id="cathedra">Кафедра</InputLabel>
            <Select labelId="cathedra" id="select_cathedra" value="ТТП">
                <MenuItem value="ТТП">ТТП</MenuItem>
                <MenuItem value="МІ">МІ</MenuItem>
                <MenuItem value="ТК">ТК</MenuItem>
                <MenuItem value="ОМ">ОМ</MenuItem>
                <MenuItem value="ДО">ДО</MenuItem>
            </Select> </>}
        <Button type="submit" variant="contained" color="primary">Далі</Button>
    </form>
  )
}

export default QuestionnaireForm