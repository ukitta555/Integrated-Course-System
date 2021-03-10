import React from 'react';
import {useSelector} from 'react-redux'
import Header from './Header/Header'
import {
    Switch
    ,Route
    ,Redirect
    }
    from 'react-router-dom'
import LoginForm from './LoginForm/LoginForm';
import RegistrationForm from './RegistrationForm/RegistrationForm'
import QuestionnaireForm from "./QuestionnaireForm/QuestionnaireForm";
import Footer from "./Footer/Footer";
import TeacherWaitingPage from "./TeacherWaitingPage/TeacherWaitingPage";
import StudentWaitingPage from "./StudentWaitingPage/StudentWaitingPage";
import TeacherCabinet from "./TeacherCabinet/TeacherCabinet";
import CourseCreatingPage from "./CourseCreatingPage/CourseCreatingPage";
import CoursesView from './AllCoursesView/CoursesView'
import {UserState, NO_ID} from '../store/types'

const App = () => {
    const user = useSelector ((state: {user: UserState}) => state.user)

    return (
        <>
          <div>
              <Header />
          </div>
          <Switch>
              <Route path = '/register'>
                  <RegistrationForm />
              </Route>
              <Route path = '/login'>
                {(!user || user.id === NO_ID) ? <LoginForm /> : <Redirect to="/questionnaire" />}
              </Route>
              <Route path = '/questionnaire'>
                  <QuestionnaireForm />
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
                  <CourseCreatingPage/>
              </Route>
              <Route path = '/course_view'>
                  <CoursesView/>
              </Route>
              <Route path = '/'>
              </Route>
          </Switch>
          <Footer />
        </>
    )
}

export default App