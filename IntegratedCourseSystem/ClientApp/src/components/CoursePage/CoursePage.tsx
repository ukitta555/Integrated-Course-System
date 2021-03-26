import { LinearProgress } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {useRouteMatch} from 'react-router-dom'
import courseService from '../../services/courseService'
import groupService from '../../services/groupService'
import { Class, Group, MatchParamsId } from '../../store/types'
import CourseRegistrationForm from '../CourseRegistrationForm/CourseRegistrationForm'

const CoursePage = () => {
  const match = useRouteMatch<MatchParamsId>('/course_view/:id')
  const classId = match
    ? match.params.id
      ? Number(match.params.id)
      : null
    : null

  const [groups, setGroups] = useState<Group[]>([])
  const [courseInfo, setCourseInfo] = useState<Class | null>(null)
  useEffect(() => {
    async function fetchData () {
      const courseInfoResponse = await courseService.getCourseByID(classId)
      setCourseInfo(courseInfoResponse)

      const response = await groupService.getGroupsByClassId(classId)
      console.log(response)
      setGroups(response)
    }
    fetchData()
  }, [])

  const groupWrapperStyle = {
    border: "4px double black"
  }

  return (
    <div>
      {
        groups.length > 0
        ? <>
            Курс {courseInfo?.name}
            <br />
            ID курсу: {classId}
            {
              groups.map ( (group : Group) =>
              <div style = {groupWrapperStyle} key = {group.id}>
                {group.id}
                <br />
                {group.name}
                <br />
                {group.classId}
              </div>
              )
            }
          </>
        : <LinearProgress />
      }
    </div>
  )
}

export default CoursePage