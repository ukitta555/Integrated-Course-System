import { InputLabel, MenuItem, Select} from "@material-ui/core";
import React, {useEffect} from "react"
import {Faculty, Role} from '../QuestionnaireForm/QuestionnaireForm'



const FacultyInputs = (props : {
  faculties: Faculty[],
  selectedFacultyId: number,
  selectedTeacherId: number,
  handleSelectedFacultyChange: (event: React.ChangeEvent<{ value: unknown }>) => void,
  handleSelectedTeacherChange: (event: React.ChangeEvent<{ value: unknown }>) => void,
  fetchFaculties: () => void,
  role: Role
}) => {
  const NOT_SELECTED = -1;

  useEffect(() =>
	{
		props.fetchFaculties()
	}, [])
  console.log(props.faculties)
  return (
    <>

    {
      (props.faculties.length === 0 || props.selectedFacultyId === NOT_SELECTED)
        ? null
        :
        <>
          <InputLabel id="faculty">Факультет</InputLabel>
          <Select name='faculty' labelId="faculty" id="select_faculty" value={props.selectedFacultyId} onChange={props.handleSelectedFacultyChange}>
            {
              props.faculties.map((faculty: Faculty) =>
              {
                return <MenuItem key={faculty.id} value={faculty.id}> {faculty.name} </MenuItem>
              })
            }
          </Select>
        </>
    }
    {
      (props.faculties.length === 0 || props.selectedFacultyId === NOT_SELECTED || props.selectedTeacherId === NOT_SELECTED || props.role === "teacher")
        ? null
        :
        <>
          <InputLabel id="teacher">Вчитель</InputLabel>
          <Select name="teacher" labelId="teacher" id="select_teacher" value={props.selectedTeacherId} onChange={props.handleSelectedTeacherChange}>
            {
              props.faculties
                .find((f: Faculty) => {return f.id === props.selectedFacultyId })
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
    </>
  )
}

export default FacultyInputs