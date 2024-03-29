import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import Header from './Header/Header'
import { Switch ,Route ,Redirect } from 'react-router-dom'
import LoginForm from './LoginForm/LoginForm';
import RegistrationForm from './RegistrationForm/RegistrationForm'
import QuestionnaireForm from "./QuestionnaireForm/QuestionnaireForm";
import Footer from "./Footer/Footer";
import TeacherWaitingPage from "./TeacherWaitingPage/TeacherWaitingPage";
import StudentWaitingPage from "./StudentWaitingPage/StudentWaitingPage";
import TeacherCabinet from "./TeacherCabinet/TeacherCabinet";
import CourseCreatingPage from "./CourseCreatingPage/CourseCreatingPage";
import CoursesView from './AllCoursesView/CoursesView'
import {UserState} from '../store/types'
import TestingPage from "./TestingPage/TestingPage";
import CourseRegistrationForm from './CourseRegistrationForm/CourseRegistrationForm'
import { LinearProgress } from '@material-ui/core';
import { loginUser } from '../reducers/userReducer/userThunks';
import TaskPage from "./TaskPage/TaskPage";
import NoPage from './NoPage/NoPage';
import CoursePage from './CoursePage/CoursePage';
import GroupPage from './GroupPage/GroupPage';
import LandingPage from "./LandingPage/LandingPage";
import AdminPanel from "./AdminPanel/AdminPanel";



const App = () => {
    const user = useSelector ((state: {user: UserState}) => state.user)
    const dispatch = useDispatch()

    useEffect ( () => {
      dispatch (loginUser("", "", "onEnteringApp"))
    }, [])

    const routes = (
      // style so that footer doesn't hide the content
      <div style = {{paddingBottom: "8vh"}}>
        <Switch>
            <Route path = '/register'>
                <RegistrationForm />
            </Route>
            <Route path = '/login'>
              <LoginForm />
            </Route>
            <Route path = '/questionnaire'>
              {
                user.role === "user"
                ? <QuestionnaireForm />
                : user.role === "student"
                  ? user.isRegFilledIn
                    ? <Redirect to = "/courses_view" />
                    : <Redirect to = "/course_registration" />
                  : user.role === "teacher"
                    ? user.currentCourseId
                      ? <Redirect to = "/courses_view" />
                      : <Redirect to = "/course_creating_page" />
                    : <Redirect to = "/" /> // admin or no role
              }
            </Route>
            <Route path = '/teacher_waiting_page'>
                <TeacherWaitingPage />
            </Route>
            <Route path = '/student_waiting_page'>
                <StudentWaitingPage/>
            </Route>
            <Route path = '/teacher_cabinet'>
                <TeacherCabinet/>
            </Route>
            <Route path = '/course_creating_page'>
              {
                user.role === "teacher"
                ? <CourseCreatingPage/>
                : <Redirect to = '/' />
              }
            </Route>
            <Route path = '/course_view/:id'>
                <CoursePage />
            </Route>
            <Route path = '/courses_view'>
                <CoursesView/>
            </Route>
            <Route path = '/course_registration'>
              {
                user.role === "student"
                ? <CourseRegistrationForm />
                : <Redirect to = '/' />
              }
            </Route>
            <Route path = '/group_view/:id'>
              <GroupPage />
            </Route>
            <Route path = '/task_page'>
                <TaskPage/>
            </Route>
            <Route path = '/testing_page'>
                <TestingPage />
            </Route>
            <Route path = '/index'>
                <LandingPage/>
            </Route>
            <Route path = '/task/:id'>
                <TaskPage/>
            </Route>
            <Route path = '/admin'>
                <AdminPanel/>
            </Route>
            <Route path = '/'>
              <NoPage />
            </Route>
        </Switch>
      </div>
    )

    return (
      <>
          <Header />
          {
              user.isAuthLoading
                  ? <LinearProgress />
                  : <> {routes} </>
          }
        <Footer />
      </>
    )
}

export default App