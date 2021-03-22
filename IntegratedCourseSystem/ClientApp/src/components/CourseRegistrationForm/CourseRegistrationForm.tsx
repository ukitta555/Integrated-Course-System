import React, {useState, useEffect} from 'react'
import {ClassRole, ClassSubject, ClassTech, RolePreference, TechPreference, UserState, PreferenceLevel, StudentSelect} from '../../store/types'
import {useSelector} from 'react-redux'
import { Button, Checkbox, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core'
import courseSubjectService from '../../services/courseSubjectService'
import courseRoleService from '../../services/courseRoleService'
import courseTechService from '../../services/courseTechService'
import studentService from '../../services/studentService'
import SelectInput from '@material-ui/core/Select/SelectInput'

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

  console.log(classStudents, selectedFriends, selectedEnemies)
  return (
    <div>
      {
        <form onSubmit = {handleSubmit}>
          <TextField label="Ім'я" type = 'text' value = {name} onChange = {handleNameChange}/>
          <TextField label="Прізвище" type = 'text' value = {surname} onChange = {handleSurnameChange}/>
          <TextField label="ID класу" type = 'text' value = {classId} onChange = {handleClassIdChange}/>
          <FormGroup>
          What classes are you taking?
          {
            classSubjects.map (
              (subject, index) =>
              <FormControlLabel key = {subject.id}
                control={<Checkbox checked={subjectsChecked[index] || false} onChange={handleSubjectCheckedChange} name={String(index)} />}
                label={subject.name ? subject.name : ""}
              />
            )
          }
          </FormGroup>

          <FormGroup>
          What roles are you willing to take?
          <br />
          {
            rolePreferences.length > 0
            ? rolePreferences.map (
                (pref, index) =>
                <>
                    <RadioGroup row key = {pref.roleId} name = {pref.roleName} value = {pref.preferenceLevel} onChange = {event => handleRolePrefChange(event, pref)}>
                      {pref.roleName}
                        <FormControlLabel value = {PreferenceLevel.Hate} label = "Bruh...."  labelPlacement = "top" control = {<Radio />} />
                        <FormControlLabel value = {PreferenceLevel.IDK}  label = "I'm OK with it" labelPlacement = "top"  control = {<Radio  />} />
                        <FormControlLabel value = {PreferenceLevel.Love} label = "My dream job!" labelPlacement = "top" control = {<Radio />} />
                    </RadioGroup>
                </>
              )
            : null
          }
          </FormGroup>

          <FormGroup>
          What techs do you prefer?
          <br />
          {
            techPreferences.length > 0
            ? techPreferences.map (
              (pref, index) =>
              <>
                <RadioGroup row name={pref.techName} value={pref.preferenceLevel} onChange={event => handleTechPrefChange(event, pref)} >
                  {pref.techName}
                  <FormControlLabel value = {PreferenceLevel.Hate} label = "Don't want to use it" labelPlacement = "top" control = {<Radio />} />
                  <FormControlLabel value = {PreferenceLevel.IDK}  label =  "I'm OK with it" labelPlacement = "top" control = {<Radio />} />
                  <FormControlLabel value = {PreferenceLevel.Love} label = "I want to use it!" labelPlacement = "top" control = {<Radio />} />
                </RadioGroup>
              </>
              )
            : null
          }
          </FormGroup>

          {
            selectedFriends.length > 0 && selectedEnemies.length > 0
            ? <>
              <InputLabel id="Friends">Друзі</InputLabel>
              <Select name='1' labelId="friends_1" id="select_friend_1" value={selectedFriends[0].id} onChange={handleFriendChange}>
                {
                  classStudents.map (
                    student => <MenuItem value = {student.id} key = {student.id}> {`${student.surname} ${student.name}`} </MenuItem>
                  )
                }
              </Select>
              <Select name='2' labelId="friends_2" id="select_friend_2" value={selectedFriends[1].id} onChange={handleFriendChange}>
                {
                  classStudents.map (
                    student => <MenuItem value = {student.id} key = {student.id}> {`${student.surname} ${student.name}`} </MenuItem>
                  )
                }
              </Select>
              <Select name='3' labelId="friends_3" id="select_friend_3" value={selectedFriends[2].id} onChange={handleFriendChange}>
                {
                  classStudents.map (
                    student => <MenuItem value = {student.id} key = {student.id}> {`${student.surname} ${student.name}`} </MenuItem>
                  )
                }
              </Select>


              <InputLabel id="Enemies">Вороги</InputLabel>
                <Select name='1' labelId="enemies_1" id="select_enemy_1" value={selectedEnemies[0].id} onChange={handleEnemyChange}>
                  {
                    classStudents.map (
                      student => <MenuItem value = {student.id} key = {student.id}> {`${student.surname} ${student.name}`} </MenuItem>
                    )
                  }
                </Select>
                <Select name='2' labelId="enemies_2" id="select_enemy_2" value={selectedEnemies[1].id} onChange={handleEnemyChange}>
                  {
                    classStudents.map (
                      student => <MenuItem value = {student.id} key = {student.id}> {`${student.surname} ${student.name}`} </MenuItem>
                    )
                  }
                </Select>
                <Select name='3' labelId="enemies_3" id="select_enemy_3" value={selectedEnemies[2].id} onChange={handleEnemyChange}>
                  {
                    classStudents.map (
                      student => <MenuItem value = {student.id} key = {student.id}> {`${student.surname} ${student.name}`} </MenuItem>
                    )
                  }
                </Select>
              </>
            : null
          }

          <Button type="submit" variant="contained" color="primary">Далі</Button>
         </form>
      }
    </div>
  )
}

export default CourseRegistrationForm