import { Button, LinearProgress, Typography } from "@material-ui/core"
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import React, { useState, useEffect, useRef } from "react"
import { useRouteMatch } from "react-router-dom"
import courseSubjectService from "../../services/courseSubjectService"
import groupService from "../../services/groupService"
import groupTechService from "../../services/groupTechService"
import studentGroupsService from "../../services/studentGroupsService"
import studentService from "../../services/studentService"
import techService from "../../services/techService"
import { ClassSubject, Group, GroupStudent, GroupTech, MatchParamsId, Student } from "../../store/types"
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
      const groupResponse: Group = await groupService.getGroup(groupId)
      console.log(groupResponse)
      const classSubjectsResponse = await courseSubjectService.getCourseSubjects(groupResponse.classId)
      setClassSubjects(classSubjectsResponse)
      const studentsInGroup = await studentGroupsService.getStudentsByGroup(groupId)
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


      groupResponse.groupMembers = populatedGroupStudents
      groupResponse.groupTeches = populatedGroupTechs
      setGroup(groupResponse)
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
          </>
          : <LinearProgress />
      }
    </div>
  )
}

export default GroupPage