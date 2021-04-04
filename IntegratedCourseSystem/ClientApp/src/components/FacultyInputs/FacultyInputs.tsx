import {Box, Container, Grid, InputLabel, MenuItem, Select} from "@material-ui/core";
import React, {useEffect} from "react"
import BoxWithImageBG from "../BoxWithImageBG/BoxWithImageBG";
import WrappedInput from "../WrappedInput/WrappedInput";
import CustomInput from "../CustomInput/CustomInput";

export type Role = "student" | "teacher" | "admin" | "user"
export type Faculty = {
		name: string,
		id: number,
		facultyTeachers: {
			name: string,
			surname: string,
			id: number
		}[]
	}


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
    const inputBoxStyle = {
        borderRadius: 20,
        padding: `${(props.selectedTeacherId === NOT_SELECTED || props.role === "teacher") ? "45.5px" : "5px"} calc(100% / 12)`,
        // padding: (props.selectedTeacherId === NOT_SELECTED || props.role === "teacher") ? "40.5px 0" : "",
    }
    const inputStyle = {
        backgroundColor: "inherit",
        borderRadius: "inherit",
        width: "100%",
        color: "inherit",
    }
  useEffect(() =>
	{
		props.fetchFaculties()
	}, [])
  console.log(props.faculties)
  return (
      (props.faculties.length === 0 || props.selectedFacultyId === NOT_SELECTED)
          ? null
          :
          <Grid container item xs direction="row" justify="space-around">
              <Grid item xs={5}>
                  <BoxWithImageBG bgimage="ID_card.png" bgcolor="theme_grey.main"/>
              </Grid>
              <Grid container item xs={4} direction="column" spacing={2}>
                  <Grid item xs>
                      <Box bgcolor="theme_green.main" style={inputBoxStyle}>
                          <InputLabel id="faculty">Факультет</InputLabel>
                          <Select labelId="faculty" id="select_faculty" style={inputStyle} input={<CustomInput name='faculty' value={props.selectedFacultyId} onChange={props.handleSelectedFacultyChange} />}>
                              {/*<Select name='faculty' labelId="faculty" id="select_faculty" value={props.selectedFacultyId} onChange={props.handleSelectedFacultyChange}>*/}
                              {
                                  props.faculties.map((faculty: Faculty) =>
                                      (<MenuItem key={faculty.id} value={faculty.id}> {faculty.name} </MenuItem>))
                              }
                          </Select>
                      </Box>
                  </Grid>
                      {
                          (props.selectedTeacherId === NOT_SELECTED || props.role === "teacher")
                              ? null
                              :
                              <Grid item xs>
                              <Box bgcolor="theme_green.main" style={inputBoxStyle}>
                                  <InputLabel id="teacher">Вчитель</InputLabel>
                                  <Select labelId="teacher" id="select_teacher" style={inputStyle} input={<CustomInput name='teacher' value={props.selectedTeacherId} onChange={props.handleSelectedTeacherChange} />}>
                                      {/*<Select name="teacher" labelId="teacher" id="select_teacher" value={props.selectedTeacherId} onChange={props.handleSelectedTeacherChange}>*/}
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
                              </Box>
                              </Grid>
                      }
              </Grid>
          </Grid>
  )
}

export default FacultyInputs