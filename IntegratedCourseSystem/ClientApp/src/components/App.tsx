import React from 'react';
import Header from './Header/Header'
import {
    Switch
    ,Route
    }
    from 'react-router-dom'
import LoginForm from './LoginForm/LoginForm';
import RegistrationForm from './RegistrationForm/RegistrationForm'
import QuestionnaireForm from "./QuestionnaireForm/QuestionnaireForm";
import Footer from "./Footer/Footer";
import TeacherWaitingPage from "./TeacherWaitingPage/TeacherWaitingPage";
import StudentWaitingPage from "./StudentWaitingPage/StudentWaitingPage";

const App = () => {
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
                  <LoginForm />
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
              <Route path = '/'>
                  bruh
              </Route>
          </Switch>
          <Footer />
        </>
    )
}

export default App