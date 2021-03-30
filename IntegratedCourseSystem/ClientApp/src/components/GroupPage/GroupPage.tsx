import { Button, LinearProgress, Typography } from "@material-ui/core"
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import React, { useState, useEffect, useRef } from "react"
import { useRouteMatch } from "react-router-dom"
import courseSubjectService from "../../services/courseSubjectService"
import groupService from "../../services/groupService"
import groupTechService from "../../services/groupTechService"
import studentGroupsService from "../../services/studentGroupsService"
import studentService from "../../services/studentService"
import taskService from "../../services/taskService";
import techService from "../../services/techService"
import { ClassSubject, Group, GroupStudent, GroupTech, MatchParamsId, Student, TaskType } from "../../store/types"
import Task from "../Task/Task";
import Togglable from "../Togglable/Togglable"

// group should be extracted into its own logical component,
// but I feel like I'm gonna debug it a lot longer than re-write code from scratch

const GroupPage = () =>
{
  const match = useRouteMatch<MatchParamsId>()
  const groupId = match
    ? match.params.id
      ? Number(match.params.id)
      : null
    : null

  const [classSubjects, setClassSubjects] = useState<ClassSubject[]>([])
  const [group, setGroup] = useState<Group | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(true)
  const [tasks, setTasks] = useState<TaskType[]>([])
  // once again, pls fix types
  const ref = useRef()


  const handleGroupDropdown = (event: any) =>
  {
    //@ts-expect-error
    ref.current.toggleVisibility()
    setIsDropdownOpen(!isDropdownOpen)
  }

  useEffect(() =>
  {
    async function fetchData()
    {
      //get info about groups
      const groupResponse: Group = await groupService.getGroup(groupId)
      // set subjects
      const classSubjectsResponse = await courseSubjectService.getCourseSubjects(groupResponse.classId)
      setClassSubjects(classSubjectsResponse)

      // populate groups
      const techesInGroup = await groupTechService.getGroupTechesByGroup(groupId)
      const populatedGroupTechs: GroupTech[] = await Promise.all(
        techesInGroup.map(async (groupTech: GroupTech) =>
        {
          const techName = (await techService.getTech(groupTech.techId)).name
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
      setGroup(groupResponse)
      // fetch tasks
      let tasksResponse = await taskService.getTasksByGroup(groupId)
      console.log('tasks', tasksResponse)
      tasksResponse = tasksResponse.map ((task : TaskType) => {
        task.deadLine = task.deadLine ? new Date(task.deadLine) : null
        task.done = task.done ? new Date(task.done) : null
        task.posted = new Date(task.posted)
        return task
      })
      setTasks(tasksResponse)
    }
    fetchData()
  }, [])

  const groupWrapperStyle = {
    border: "4px double black"
  }

  const openIconStyle = {
    transform: 'rotate(180deg)'
  }

  const closedIconStyle = {
    transform: 'rotate(0deg)'
  }

  return (
    <div>
      {
        group
          ? <>
            <Button onClick={handleGroupDropdown} disableRipple={true} style={isDropdownOpen ? openIconStyle : closedIconStyle}>
              <ArrowDropDownIcon />
            </Button>
            {//@ts-expect-error
            }<Togglable ref={ref}>
              <div style={groupWrapperStyle}>
                <Typography> Group ID : {group.id} </Typography>
                <Typography> Techs preferred by the group: </Typography>
                <ul>
                  {
                    group.groupTeches.map(groupTech => <li key={groupTech.id}> {groupTech.name} </li>)
                  }
                </ul>
                <Typography> Students in group: </Typography>
                <ul>
                  {
                    group.groupMembers.map(groupMember => <li key={groupMember.id}> {groupMember.name} {groupMember.surname} </li>)
                  }
                </ul>
                <Typography> Class subjects: </Typography>
                <ul>
                  {
                    classSubjects.map(classSubj => <li key={classSubj.id}> {classSubj.name} </li>)
                  }
                </ul>
              </div>
            </Togglable>
            {
              //remove hardcoding!
              tasks.map ( (task: TaskType) => {
                return (
                  <Task
                    key = {task.id}
                    name = {task.name}
                    deadline = {task.deadLine ? task.deadLine : new Date() }
                    taskDescription = {task.taskDescription}
                    isHandedOver = {task.done ? true : false}
                    author = "Omelchuk L.L."
                    marks = {new Map([["ООП", [2, 2]]])}
                    commentCount = {2}
                  />
                )
              })
            }
          </>
          : <LinearProgress />
      }
    </div>
  )
}

export default GroupPage