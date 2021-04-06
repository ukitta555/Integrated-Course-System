import {Button, LinearProgress, Typography, ThemeProvider, Container, Grid, Box} from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import React, { useEffect, useState, useRef, createRef } from 'react'
import {Link, useRouteMatch} from 'react-router-dom'
import courseService from '../../services/courseService'
import groupService from '../../services/groupService'
import groupTechService from '../../services/groupTechService'
import studentGroupsService from '../../services/studentGroupsService'
import studentService from '../../services/studentService'
import techService from '../../services/techService'
import { Class, Group, GroupStudent, GroupTech, MatchParamsId } from '../../store/types'
import Togglable from '../Togglable/Togglable'
import light from "../../themes/light";
import BoxWithImageBG from "../BoxWithImageBG/BoxWithImageBG";
import GroupBlock from "../GroupBlock/GroupBlock";


const CoursePage = () => {
  const match = useRouteMatch<MatchParamsId>('/course_view/:id')

  const classId = match
    ? match.params.id
      ? Number(match.params.id)
      : null
    : null

  const [groups, setGroups] = useState<Group[]>([])
  const [courseInfo, setCourseInfo] = useState<Class | null>(null)
  const [dropdownIconStyles, setDropdownIconStyles] = useState<boolean[]>([])
  // fix type pls have no time for this
  let groupBoxesRefs = useRef<React.Ref<{toggleVisibility: (event: any) => void}>[]>([])

  const changeVisibility = (index : number) => {
    console.log(index)
    //@ts-expect-error
    groupBoxesRefs.current[index].current.toggleVisibility()
    setDropdownIconStyles (dropdownIconStyles.map ((isOpen: boolean, dropdownIndex: number) => {
      //console.log (dropdownIndex,  index, isOpen)
      return (index === dropdownIndex)
        ? !dropdownIconStyles[dropdownIndex]
        : dropdownIconStyles[dropdownIndex]
    }))
  }

  useEffect(() => {
    async function fetchData () {
      const courseInfoResponse = await courseService.getCourseByID(classId)
      setCourseInfo(courseInfoResponse)

      let groupsResponse = await groupService.getGroupsByClassId(classId)
      console.log("Groups response", groupsResponse)
      groupsResponse = await Promise.all(
        groupsResponse.map (async (group: Group) => {
          // get groupTech entites for current group
          const groupTeches = await groupTechService.getGroupTechesByGroup(group.id)

          // using their id's, fetch their names and add them to group objects
          const updatedGroupTechs = await Promise.all(
            groupTeches.map(async (groupTech : GroupTech) => {
              const techName = (await techService.getTech(groupTech.techid)).name
              return {
                ...groupTech,
                name: techName
              }
            })
          )

          const studentsInGroup = await studentGroupsService.getStudentsByGroup(group.id)
          const updatedGroupStudents = await Promise.all(
            studentsInGroup.map (async (groupStudent: GroupStudent) => {
              const studentByID = await studentService.getStudentById(groupStudent.studentId)
              return {
                ...groupStudent,
                name: studentByID.name,
                surname: studentByID.surname
              }
            })
          )


          //return updated groups
          return {
            ...group,
            groupTeches: updatedGroupTechs,
            groupMembers: updatedGroupStudents
          }
        })
      )

      console.log('final result:', groupsResponse)
      groupBoxesRefs.current = groupsResponse.map((group : Group) => createRef())
      setDropdownIconStyles(groupsResponse.map ((g : Group) => true))
      setGroups(groupsResponse)

    }
    fetchData()
  }, [])
    const coursePageWrapperStyle = {
        marginTop: "5%",
    }
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
    <ThemeProvider theme={light}>
      {
        groups.length > 0
        ? <Container style={coursePageWrapperStyle}>
            <Grid container direction="column" spacing={8}>
                <Grid container direction="row" item xs>
                    <Grid item xs>
                        <BoxWithImageBG bgimage="a_lot_of_people.png"/>
                    </Grid>
                    <Grid item xs>
                        <Box color="theme_black.main" textAlign="center" margin="2em 0 0 0">
                            <Grid container spacing={8} direction="column" justify="space-between">
                                <Grid item>
                                    <Typography variant="h2"> Курс {courseInfo?.name} </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h2"> ID курсу: {classId} </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                {
                    groups.map ((group : Group) =>
                        <Grid item xs key={group.id}>
                            <GroupBlock group={group}/>
                        </Grid>
                        // <div key = {group.id}>
                        //   <Button onClick = {(_) => changeVisibility(index)}  disableRipple={true} style = {dropdownIconStyles[index] ? openIconStyle : closedIconStyle}>
                        //       <ArrowDropDownIcon />
                        //   </Button>
                        //   <Link to = {`/group_view/${group.id}`}>
                        //     <Typography> Група {group.name} </Typography>
                        //   </Link>
                        //   {//@ts-expect-error
                        //   }<Togglable ref = {groupBoxesRefs.current[index]}  >
                        //     <div style = {groupWrapperStyle}>
                        //       <Typography> ID групи : {group.id} </Typography>
                        //       <Typography> Технології, на яких працює група: </Typography>
                        //       <ul>
                        //       {
                        //         group.groupTeches.map (groupTech => <li key = {groupTech.id}> {groupTech.name} </li>)
                        //       }
                        //       </ul>
                        //       <Typography> Студенти в групі: </Typography>
                        //       <ul>
                        //       {
                        //         group.groupMembers.map (groupMember => <li key = {groupMember.id}> {groupMember.name} {groupMember.surname} </li>)
                        //       }
                        //       </ul>
                        //     </div>
                        //   </Togglable>
                        // </div>
                    )
                }
            </Grid>
          </Container>
        : <LinearProgress />
      }
    </ThemeProvider>
  )
}

export default CoursePage