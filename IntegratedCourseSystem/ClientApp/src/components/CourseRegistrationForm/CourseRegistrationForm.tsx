import React, {useState, useEffect, CSSProperties} from 'react'
import {ClassRole, ClassSubject, ClassTech, RolePreference, TechPreference, UserState, PreferenceLevel, StudentSelect} from '../../store/types'
import {useSelector} from 'react-redux'
import {
  Box,
  Button,
  Checkbox, Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  ThemeProvider, Typography
} from '@material-ui/core'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import courseSubjectService from '../../services/courseSubjectService'
import courseRoleService from '../../services/courseRoleService'
import courseTechService from '../../services/courseTechService'
import studentService from '../../services/studentService'
import SelectInput from '@material-ui/core/Select/SelectInput'
import light from "../../themes/light";
import WrappedInput from "../WrappedInput/WrappedInput";
import CustomInput from "../CustomInput/CustomInput";

const CourseRegistrationForm = () => {
  const NOT_SELECTED = -1
  const user = useSelector ((state: {user: UserState}) => state.user)

  const [name, setName] = useState<string>(user.name ? user.name :  "")
  const [surname, setSurname] = useState<string> (user.surname ? user.surname : "")
  const [classId, setClassId] = useState<number | undefined> (user.currentCourseId ? user.currentCourseId : undefined)

  const [classSubjects, setClassSubjects] =  useState<ClassSubject[]> ([])
  const [classTeches, setClassTeches] = useState<ClassTech[]> ([])
  const [classRoles, setClassRoles] = useState<ClassRole[]> ([])

  const [selectedFriends, setSelectedFriends] = useState<StudentSelect[]> ([])
  const [selectedEnemies, setSelectedEnemies] = useState<StudentSelect[]> ([])

  const [subjectsChecked, setSubjectsChecked] = useState<boolean[]> ([])
  const [rolePreferences, setRolePreferences] = useState<RolePreference[]> ([])
  const [techPreferences, setTechPreferences] = useState<TechPreference[]> ([])

  const [classStudents, setClassStudents] = useState<StudentSelect[]>([])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log ("submitted")
  }

  useEffect (() => {
    async function fetchData() {
      const classSubjectReq =  courseSubjectService.getCourseSubjects(user.currentCourseId)
      const classRolesReq =  courseRoleService.getCourseRoles(user.currentCourseId)
      const classTechesReq =  courseTechService.getCourseTechs(user.currentCourseId)
      const classStudentsReq =  studentService.getStudentsByClass(user.currentCourseId)
      const promises = [classSubjectReq, classRolesReq, classTechesReq, classStudentsReq]
      const response = await Promise.all(promises)

      const [classSubjectsResponse, classRolesResponse, classTechesResponse, classStudentsResponse] = [...response]

      setClassSubjects(classSubjectsResponse)
      setClassRoles(classRolesResponse)
      setClassTeches(classTechesResponse)
      setClassStudents(classStudentsResponse)

      setSubjectsChecked(new Array(classSubjectsResponse.length).fill(false))

      setRolePreferences(classRolesResponse.map((classRole : ClassRole) => {
        return {
          roleName: classRole.name,
          roleId: classRole.id,
          preferenceLevel: PreferenceLevel.IDK
        }
      }))
      setTechPreferences(classTechesResponse.map((classTech : ClassTech) => {
        return {
          techName: classTech.name,
          techId: classTech.id,
          preferenceLevel: PreferenceLevel.IDK
        }
      }))


      setSelectedFriends(
          new Array(3).fill({
            id: classStudentsResponse[0].id,
            name: classStudentsResponse[0].name,
            surname: classStudentsResponse[0].surname
          })
      )

      setSelectedEnemies(
        new Array(3).fill({
          id: classStudentsResponse[0].id,
          name: classStudentsResponse[0].name,
          surname: classStudentsResponse[0].surname
        })
      )
    }
    fetchData()
  }, [])

  const handleNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setName (event.target.value as string)
  }
  const handleSurnameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSurname (event.target.value as string)
  }
  const handleClassIdChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setClassId (event.target.value as number)
  }
  const handleSubjectCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubjectsChecked(subjectsChecked.map (
      (_, index) =>
        index === Number(event.target.name)
        ? !subjectsChecked[index]
        : subjectsChecked[index]
    ))
  }

  const handleRolePrefChange = (event: React.ChangeEvent<HTMLInputElement>,  changedPreferenceInfo: RolePreference) => {
    setRolePreferences(rolePreferences.map (
      (preference) => {
        return (preference.roleName === changedPreferenceInfo.roleName)
          ? {...preference, preferenceLevel: Number(event.target.value)}
          : preference
      }
    ))
  }

  const handleTechPrefChange = (event: React.ChangeEvent<HTMLInputElement>, changedPreferenceInfo: TechPreference) => {
    setTechPreferences(techPreferences.map (
      (preference) => {
        return (preference.techName === changedPreferenceInfo.techName)
          ? {...preference, preferenceLevel: Number(event.target.value)}
          : preference
      }
    ))
  }

  const handleFriendChange = (event: any) => {

    let newFriend : StudentSelect = classStudents.find(
      student => student.id === event.target.value
    ) || classStudents[0] // костыль, чтобы линтер не ругался



    setSelectedFriends(selectedFriends.map((selFriend, i) => {
        return (i === parseInt(event.target.name, 10) - 1) ? newFriend : selFriend
      }
    ))
  }

  const handleEnemyChange = (event: any) => {
    let newEnemy : StudentSelect = classStudents.find (
      student => student.id === event.target.value
    ) || classStudents[0]

    setSelectedEnemies(selectedEnemies.map((selEnemy, i) => {
      return (i === parseInt(event.target.name, 10) - 1) ? newEnemy : selEnemy
      }
    ))
  }
  const wrapperStyle = {
    marginBottom: "24px",
  }
  const dividerStyle = {
    width: "100%",
    margin: "10px 0",
  }
  const classWrapperStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column" as "column",
    borderRadius: 10,
    margin: "0 10%",
  }
  const firstRadioRowStyle = {
    // borderRadius: "25px 25px 0 0",
    borderTopLeftRadius: "25px",
    borderTopRightRadius: "25px",
  }
  const lastRadioRowStyle = {
    // borderRadius: "0 0 25px 25px",
    borderBottomRightRadius: "25px",
    borderBottomLeftRadius: "25px",
  }
//   const radioRowStyle: <T>(index: number, list: T[]) => CSSProperties
//       = (index, list) => (
//       { ...(index == 0 ? firstRadioRowStyle : {}),
//        ...(index == (list.length - 1) ? lastRadioRowStyle : {})}
// )
  const radioWrapperStyle = {
    borderRadius: 25,
    padding: "1% 3% 2% 4%",
  }
  const radioStyle = {
    color: "inherit",
    borderRadius: 50,
    padding: 0,
    margin: "9px",
    backgroundColor: light.palette.theme_white.main,
  }
  const friendsAndEnemiesWrapperStyle = {
    // color: "inherit",
    borderRadius: 50,
    padding: "5px 0"
  }
  const forwardButtonWrapperStyle = {
    borderRadius: 25,
    textAlign: "center" as "center",
    margin: "5px 0",
  }


  console.log(classStudents, selectedFriends, selectedEnemies)
  return (
      <ThemeProvider theme={light}>
        <Container style={wrapperStyle} maxWidth="md">
            <form onSubmit = {handleSubmit}>
              <WrappedInput label="Ім'я" type='text' value={name} onChange={handleNameChange} bgcolor="theme_green.dark" color="theme_black.main" inputbgcolor="theme_white.light"/>
              <WrappedInput label="Прізвище" type='text' value={surname} onChange={handleSurnameChange} bgcolor="theme_green.dark" color="theme_black.main" inputbgcolor="theme_white.light"/>
              <WrappedInput label="ID класу" type='text' value={classId} onChange={handleClassIdChange} bgcolor="theme_green.dark" color="theme_black.main" inputbgcolor="theme_white.light"/>
              {/*<TextField label="Ім'я" type = 'text' value = {name} onChange = {handleNameChange}/>*/}
              {/*<TextField label="Прізвище" type='text' value = {surname} onChange = {handleSurnameChange}/>*/}
              {/*<TextField label="ID класу" type='text' value = {classId} onChange = {handleClassIdChange}/>*/}
              <Divider style={dividerStyle}/>
              <Box color="theme_black.main">
                <FormGroup>
                  What classes are you taking?
                  {
                    classSubjects.map (
                        (subject, index) =>
                            <Box key={subject.id} bgcolor="theme_green.main" style={classWrapperStyle}>
                              <FormControlLabel
                                                control={<Checkbox checked={subjectsChecked[index] || false} color="default" onChange={handleSubjectCheckedChange} name={String(index)} />}
                                                label={subject.name ? subject.name : ""}
                              />
                            </Box>

                    )
                  }
                </FormGroup>
              </Box>
              <Box color="theme_black.main">
                {/*<RadioGroup style={{display: "block"}}>*/}
                  <Typography>What roles are you willing to take?</Typography>
                  <Box bgcolor="theme_green.dark" style={radioWrapperStyle}>
                    <Grid container direction="column" justify="center">
                      <Grid container item alignItems="center" justify="space-around">
                        <Grid item xs/>
                        <Grid item xs><Typography>Bruh....</Typography></Grid>
                        <Grid item xs><Typography>I'm OK with it</Typography></Grid>
                        <Grid item xs><Typography>My dream job!</Typography></Grid>
                      </Grid>
                    {
                      rolePreferences.length > 0
                          ? rolePreferences.map (
                          (pref, index, list) =>
                                  <Grid container alignItems="center" justify="space-around" direction="row" key={index}>
                                    <Grid item xs><Typography>{pref.roleName}</Typography></Grid>
                                    <Grid item xs={10}>
                                      <Box bgcolor="theme_green.main" style={{ ...(index == 0 ? firstRadioRowStyle : {}), ...(index == (list.length - 1) ? lastRadioRowStyle : {})}}>
                                        <RadioGroup row key = {pref.roleId} name = {pref.roleName} value = {pref.preferenceLevel} onChange = {event => handleRolePrefChange(event, pref)}>
                                        <Grid container direction="row" alignItems="center" justify="space-around">
                                          <Grid item xs container justify="center"><Radio icon={<FiberManualRecordIcon style={{color: light.palette.theme_white.main}}/>} checkedIcon={<FiberManualRecordIcon/>} style={radioStyle} value={PreferenceLevel.Hate}/></Grid>
                                          <Grid item xs container justify="center"><Radio icon={<FiberManualRecordIcon style={{color: light.palette.theme_white.main}}/>} checkedIcon={<FiberManualRecordIcon/>} style={radioStyle} value={PreferenceLevel.IDK}/></Grid>
                                          <Grid item xs container justify="center"><Radio icon={<FiberManualRecordIcon style={{color: light.palette.theme_white.main}}/>} checkedIcon={<FiberManualRecordIcon/>} style={radioStyle} value={PreferenceLevel.Love}/></Grid>
                                        </Grid>
                                      </RadioGroup>
                                      </Box>
                                    </Grid>
                                  </Grid>
                          ) : null
                    }
                    </Grid>
                  </Box>
                {/*</RadioGroup>*/}
              </Box>

              <Box color="theme_black.main">
                {/*<RadioGroup style={{display: "block"}}>*/}
                <Typography>What techs do you prefer?</Typography>
                <Box bgcolor="theme_green.dark" style={radioWrapperStyle}>
                  <Grid container direction="column" justify="center">
                    <Grid container item alignItems="center" justify="space-around">
                      <Grid item xs/>
                      <Grid item xs><Typography>Don't want to use it</Typography></Grid>
                      <Grid item xs><Typography>I'm OK with it</Typography></Grid>
                      <Grid item xs><Typography>I want to use it!</Typography></Grid>
                    </Grid>
                    {
                      techPreferences.length > 0
                          ? techPreferences.map (
                          (pref, index, list) =>
                              <Grid container alignItems="center" justify="space-around" direction="row" key={index}>
                                <Grid item xs><Typography>{pref.techName}</Typography></Grid>
                                <Grid item xs={10}>
                                  <Box bgcolor="theme_green.main" style={{ ...(index == 0 ? firstRadioRowStyle : {}), ...(index == (list.length - 1) ? lastRadioRowStyle : {})}}>
                                    <RadioGroup row name={pref.techName} value={pref.preferenceLevel} onChange={event => handleTechPrefChange(event, pref)} >
                                      <Grid container direction="row" alignItems="center" justify="space-around">
                                        <Grid item xs container justify="center">
                                          <Radio icon={<FiberManualRecordIcon style={{color: light.palette.theme_white.main}}/>} checkedIcon={<FiberManualRecordIcon/>} style={radioStyle} value={PreferenceLevel.Hate}/>
                                        </Grid>
                                        <Grid item xs container justify="center">
                                          <Radio icon={<FiberManualRecordIcon style={{color: light.palette.theme_white.main}}/>} checkedIcon={<FiberManualRecordIcon/>} style={radioStyle} value={PreferenceLevel.IDK}/>
                                        </Grid>
                                        <Grid item xs container justify="center">
                                          <Radio icon={<FiberManualRecordIcon style={{color: light.palette.theme_white.main}}/>} checkedIcon={<FiberManualRecordIcon/>} style={radioStyle} value={PreferenceLevel.Love}/>
                                        </Grid>
                                      </Grid>
                                    </RadioGroup>
                                  </Box>
                                </Grid>
                              </Grid>
                          ) : null
                    }
                  </Grid>
                </Box>
                {/*</RadioGroup>*/}
              </Box>

              {
                selectedFriends.length > 0 && selectedEnemies.length > 0
                    ? <>
                      <InputLabel id="Friends">Друзі</InputLabel>
                      <Box bgcolor="theme_green.main" style={friendsAndEnemiesWrapperStyle}>
                        <Grid container justify="space-around">
                          <Select name='1' labelId="friends_1" id="select_friend_1" value={selectedFriends[0].id} onChange={handleFriendChange} input={<CustomInput name='1' value={selectedFriends[0].id} onChange = {handleFriendChange}  />}>
                            {
                              classStudents.map (
                                  student => <MenuItem value = {student.id} key = {student.id}> {`${student.surname} ${student.name}`} </MenuItem>
                              )
                            }
                          </Select>
                          <Select name='2' labelId="friends_2" id="select_friend_2" value={selectedFriends[1].id} onChange={handleFriendChange} input={<CustomInput name='2' value={selectedFriends[1].id} onChange = {handleFriendChange}  />}>
                            {
                              classStudents.map (
                                  student => <MenuItem value = {student.id} key = {student.id}> {`${student.surname} ${student.name}`} </MenuItem>
                              )
                            }
                          </Select>
                          <Select name='3' labelId="friends_3" id="select_friend_3" value={selectedFriends[2].id} onChange={handleFriendChange} input={<CustomInput name='3' value={selectedFriends[2].id} onChange = {handleFriendChange}  />}>
                            {
                              classStudents.map (
                                  student => <MenuItem value = {student.id} key = {student.id}> {`${student.surname} ${student.name}`} </MenuItem>
                              )
                            }
                          </Select>
                        </Grid>
                      </Box>

                      <InputLabel id="Enemies">Вороги</InputLabel>
                      <Box bgcolor="theme_green.main" style={friendsAndEnemiesWrapperStyle}>
                        <Grid container justify="space-around">
                          <Select name='1' labelId="enemies_1" id="select_enemy_1" value={selectedEnemies[0].id} onChange={handleEnemyChange} input={<CustomInput name='1' value={selectedEnemies[0].id} onChange = {handleEnemyChange}  />}>
                            {
                              classStudents.map (
                                  student => <MenuItem value = {student.id} key = {student.id}> {`${student.surname} ${student.name}`} </MenuItem>
                              )
                            }
                          </Select>
                          <Select name='2' labelId="enemies_2" id="select_enemy_2" value={selectedEnemies[1].id} onChange={handleEnemyChange} input={<CustomInput name='2' value={selectedEnemies[1].id} onChange = {handleEnemyChange}  />}>
                            {
                              classStudents.map (
                                  student => <MenuItem value = {student.id} key = {student.id}> {`${student.surname} ${student.name}`} </MenuItem>
                              )
                            }
                          </Select>
                          <Select name='3' labelId="enemies_3" id="select_enemy_3" value={selectedEnemies[2].id} onChange={handleEnemyChange} input={<CustomInput name='3' value={selectedEnemies[2].id} onChange = {handleEnemyChange}  />}>
                            {
                              classStudents.map (
                                  student => <MenuItem value = {student.id} key = {student.id}> {`${student.surname} ${student.name}`} </MenuItem>
                              )
                            }
                          </Select>
                        </Grid>
                      </Box>
                    </>
                    : null
              }
              <Grid container justify="center" alignItems="center" >
                <Grid item xs={5}>
                  <Box bgcolor="theme_green.dark" color="theme_black.main" style={forwardButtonWrapperStyle}>
                    <Button type="submit" color="inherit">Редагувати</Button>
                  </Box>
                </Grid>
              </Grid>

            </form>
        </Container>
      </ThemeProvider>

  )
}

export default CourseRegistrationForm