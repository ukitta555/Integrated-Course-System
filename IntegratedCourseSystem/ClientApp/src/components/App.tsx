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
              <Route path = '/'>
                  bruh
              </Route>
          </Switch>
        </>
    )
}

export default App