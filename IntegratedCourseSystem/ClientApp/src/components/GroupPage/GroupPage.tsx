import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  LinearProgress,
  TextField,
  ThemeProvider,
  Typography
} from "@material-ui/core"
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import React, { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom"
import courseSubjectService from "../../services/courseSubjectService"
import groupService from "../../services/groupService"
import groupTechService from "../../services/groupTechService"
import studentGroupsService from "../../services/studentGroupsService"
import studentService from "../../services/studentService"
import subjectTaskService from "../../services/subjectTaskService";
import taskService from "../../services/taskService";
import techService from "../../services/techService"
import { ClassSubject, Group, GroupStudent, GroupTech, MatchParamsId, Student, TaskDTO, TaskType, UserState } from "../../store/types"
import Task from "../Task/Task";
import Togglable from "../Togglable/Togglable"
import light from "../../themes/light";
import BoxWithImageBG from "../BoxWithImageBG/BoxWithImageBG";
import GroupBlock from "../GroupBlock/GroupBlock";
import CustomInput from "../CustomInput/CustomInput";
import {InputBaseComponentProps} from "@material-ui/core/InputBase";

// group should be extracted into its own logical component,
// but I feel like I'm gonna debug it a lot longer than re-write code from scratch




// TODO: sort tasks by date & load task info from server & remove hardcoding in Task props
const GroupPage = () =>
{
  const match = useRouteMatch<MatchParamsId>()
  const groupId = match
    ? match.params.id
      ? Number(match.params.id)
      : null
    : null

  const user : UserState = useSelector((state : {user : UserState}) => state.user)
  const [classSubjects, setClassSubjects] = useState<ClassSubject[]>([])
  const [maxGrades, setMaxGrades] = useState<number[]> ([]) // max grades for classes (set by teacher)
  const [deadlineDate, setDeadlineDate] = useState<string>("") // deadline date. stored as a string, converted to Date in form handler
  const [group, setGroup] = useState<Group | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(true)
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [taskName, setTaskName] = useState<string> ("")
  const [newTaskDescription, setNewTaskDescription] = useState<string>("")
  // once again, pls fix types
  const ref = useRef()


  const handleGroupDropdown = (event: any) =>
  {
    //@ts-expect-error
    ref.current.toggleVisibility()
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleNewTaskDescriptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNewTaskDescription(event.target.value as string)
  }

  const handleTaskFormSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!group) return;
    const taskToAdd = {
      taskDescription: newTaskDescription,
      groupId: group.id,
      name: taskName,
      deadLine: new Date(deadlineDate),
      posted: new Date(), // should be generated on a server (?)
      done: null,
      authorName: `${user.surname} ${user.name}`
    }
    const addedTask = await taskService.addTask(taskToAdd)

    addedTask.posted = new Date (addedTask.posted)
    addedTask.deadLine = new Date (addedTask.deadLine)
    addedTask.amountOfComments = 0

    const subjectTaskEntities = classSubjects.map ( (classSubj : ClassSubject, index: number) => {
      return {
        classSubjectId: classSubj.id,
        actualGrade: 0,
        taskId: addedTask.id,
        maxGrade: maxGrades[index]
      }
    })


    console.log(addedTask)

    //setTasks (tasks.concat(addedTask))
    const responseArray = await Promise.all (
      subjectTaskEntities.map (async (subjTask: {
        classSubjectId: number,
        actualGrade: number,
        taskId: number,
        maxGrade: number
        }) => {
        const response = await subjectTaskService.addGrades(subjTask)
        return response
      })
    )

    console.log (responseArray)
    addedTask.grades = await Promise.all (responseArray.map (async (grade: any) => {
      const subjName = await courseSubjectService.getSubjectNameById(grade.classSubjectId)
      console.log (subjName)
      return {
        grades: grade,
        name: subjName
      }
    })
    )
    console.log (addedTask)
    console.log (responseArray)
    setTasks(tasks.concat(addedTask))


  }
  useEffect(() =>
  {
    async function fetchData()
    {
      //get info about groups
      const groupResponse: Group = await groupService.getGroup(groupId)
      // set subjects
      const classSubjectsResponse = await courseSubjectService.getCourseSubjects(groupResponse.classid)
      console.log()
      setClassSubjects(classSubjectsResponse)
      // set max grades
      setMaxGrades(new Array(classSubjectsResponse.length).fill(5))

      // populate groups
      const techesInGroup = await groupTechService.getGroupTechesByGroup(groupId)
      const populatedGroupTechs: GroupTech[] = await Promise.all(
        techesInGroup.map(async (groupTech: GroupTech) =>
        {
          const techName = (await techService.getTech(groupTech.techid)).name
          return {
            ...groupTech,
            name: techName
          }
        })
      )

      const studentsInGroup = await studentGroupsService.getStudentsByGroup(groupId)
      const populatedGroupStudents: Student[] = await Promise.all(
        studentsInGroup.map(async (groupStudent: GroupStudent) =>
        {
          const studentByID = await studentService.getStudentById(groupStudent.studentId)
          return {
            ...groupStudent,
            name: studentByID.name,
            surname: studentByID.surname
          }
        })
      )
      // set groups
      groupResponse.groupMembers = populatedGroupStudents
      groupResponse.groupTeches = populatedGroupTechs
      // fetch tasks
      let tasksResponse = await taskService.getTasksByGroup(groupId)

      //const taskGrades = await subjectTaskService.getGradesByTask()

      tasksResponse = tasksResponse.map ((task : TaskDTO) => {
        const newTask : TaskType = {...task.task, grades: task.grades, amountOfComments: task.amountOfComments}
        newTask.deadLine = newTask.deadLine ? new Date(newTask.deadLine) : null
        newTask.done = newTask.done ? new Date(newTask.done) : null
        newTask.posted = new Date(newTask.posted)
        return newTask
      })
      setTasks(tasksResponse)
      setGroup(groupResponse)
    }
    fetchData()
  }, [])

  console.log('tasks', tasks)

  const handleMaxGradeChange = (event: React.ChangeEvent<{ value: unknown }>, changedGradeIndex: number) => {
    setMaxGrades (
      maxGrades.map ((grade: number, currentGradeIndex: number) => {
        const convertedInputValue = Number(event.target.value as string)
        return (currentGradeIndex === changedGradeIndex
          ? convertedInputValue
            ? convertedInputValue
            : 0
          : maxGrades[currentGradeIndex]
        )
      })
    )
  }

  const handleDeadlineChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDeadlineDate(event.target.value as string)
    console.log(new Date(deadlineDate))
  }

  const handleTaskNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTaskName (event.target.value as string)
  }
  const groupPageWrapperStyle = {
    marginTop: "5%",
  }

  const groupWrapperStyle = {
    // border: "4px double black"
  }

  const openIconStyle = {
    transform: 'rotate(180deg)'
  }

  const closedIconStyle = {
    transform: 'rotate(0deg)'
  }
  const creatingTaskInputStyle = {
    padding: "0.5em",
    borderRadius: "54px",
    fontSize: "36px",
  }
  const addButtonBoxStyle = {
    borderRadius: 21,
  }
  const addButtonStyle = {
    borderRadius: 21,
    width: "100%",
  }

  return (
    <ThemeProvider theme={light}>
      {
        group
          ? <Container style={groupPageWrapperStyle}>
              <Grid container direction="column" spacing={8}>
                <Grid container direction="row" item xs>
                  <Grid item xs>
                    <BoxWithImageBG bgimage="a_lot_of_people.png"/>
                  </Grid>
                  <Grid item xs>
                    <Box color="theme_black.main" textAlign="center" margin="2em 0 0 0">
                      <Grid container spacing={8} direction="column" justify="space-between">
                        <Grid item>
                          <Typography variant="h2"> Курс "ООП (2 та 4 курс){/* {courseInfo?.name} */}" </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="h2"> ID курсу: {/* {classId} */} </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item xs>
                  <GroupBlock {...{group, classSubjects}}/>
                </Grid>
                <Grid item xs>
                  <Box bgcolor="theme_grey.light" color="theme_black.main" borderRadius={43}>
                    <Box paddingX="6%">
                      <Typography variant="h2">Додати нове завдання</Typography>
                    </Box>
                    <Divider/>
                    <form onSubmit = {handleTaskFormSubmit} style = {groupWrapperStyle}>
                      <Box marginX="2%" paddingY="16px">
                        <Grid container direction="column" alignItems="stretch" spacing={3}>
                          <Grid item>
                            <CustomInput fullWidth type = 'text' value = {taskName} onChange = {handleTaskNameChange} placeholder = "Назва завдання..." inputProps={{style: creatingTaskInputStyle}}/>
                          </Grid>
                          <Grid item>
                            <CustomInput fullWidth type = 'text' value = {newTaskDescription} onChange = {handleNewTaskDescriptionChange} placeholder = "Текст завдання..." inputProps={{style: creatingTaskInputStyle}}/>
                          </Grid>
                        </Grid>
                      </Box>
                      <Divider/>
                      <Box textAlign="center" paddingBottom="1em">
                        {
                          classSubjects.map ( (classSubj : ClassSubject, index) => {
                            return (
                                <Box key = {classSubj.id} marginTop="2em" display="flex" alignItems="center" justifyContent="center">
                                  <Typography display="inline" variant="h5">Максимальний бал за дисципліну {classSubj.name}: </Typography>
                                  <CustomInput type = 'text' value = {maxGrades[index]} onChange = {(event: React.ChangeEvent<{ value: unknown }>) => handleMaxGradeChange(event, index)} style={{width: "4em"}} inputProps={{style: {padding: "0.5em"}}}/>
                                </Box>
                            )
                          })
                        }
                        <Box marginTop="2em" display="flex" alignItems="center" justifyContent="center">
                          <Typography display="inline" variant="h5">Встановіть дедлайн завдання: </Typography>
                          <CustomInput type = 'text' value = {deadlineDate} onChange = {handleDeadlineChange} style={{width: "8em"}} inputProps={{style: {padding: "0.5em"}}}/>
                        </Box>
                        <Box bgcolor="theme_grey.main" color="theme_white.main" margin="1em 40% 0" textAlign="center" borderRadius={21}>
                          <Button type="submit" color="inherit" style={addButtonStyle}><Typography display="inline" variant="h5">Додати</Typography></Button>
                        </Box>
                      </Box>
                    </form>
                  </Box>
                </Grid>
              </Grid>
            {
              //remove hardcoding!

              tasks.map ( (task: TaskType) => {
                return (
                  <Task
                    key = {task.id}
                    id = {task.id}
                    name = {task.name}
                    deadline = {task.deadLine ? task.deadLine : new Date() }
                    taskDescription = {task.taskDescription}
                    isHandedOver = {task.done ? true : false}
                    author = {task.authorName || "Omelchuk L.L."}
                    marks =
                    {
                      new Map (task.grades.map ( grade => {
                        return [grade.name, [grade.grades.actualGrade, grade.grades.maxGrade]]
                      }
                      ))
                    }
                    commentCount = {task.amountOfComments}
                    style = {{marginTop: "4vh"}}
                  />
                )
              })

            }
          </Container>
          : <LinearProgress />
      }
    </ThemeProvider>
  )
}

export default GroupPage