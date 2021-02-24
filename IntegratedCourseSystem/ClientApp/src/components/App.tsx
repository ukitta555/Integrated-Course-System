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
              <Route path = '/test'>
                  <TeacherWaitingPage />
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