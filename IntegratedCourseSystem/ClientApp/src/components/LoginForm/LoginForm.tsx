import React from 'react'
//import {useDispatch, useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'

import useField from '../../hooks/useField'
import {loginUserAction} from '../../reducers/userReducer/userActionCreators'

const LoginForm = () => {
  const dispatch = useDispatch()

  const email = useField('text')
  const password = useField ('password')
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('I submitted something!')
    dispatch(loginUserAction(email.value, password.value))
  }
  return (
    <form onSubmit = {onSubmit}>
      <input {...email} name="login"/>
      <input {...password} name="password"/>
      <button type='submit'> submit!</button>
    </form>
  )
}

export default LoginForm