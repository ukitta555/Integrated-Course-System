import { useFormControl } from '@material-ui/core'
import React from 'react'
import useField from '../../hooks/useField'

const LoginForm = () => {
  const login = useField('text')
  const password = useField ('password')
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('I submitted something!')
    console.log (login.value, password.value)
  }
  return (
    <form onSubmit = {onSubmit}>
      <input {...login} name="login"/>
      <input {...password} name="password"/>
      <button type='submit'> submit!</button>
    </form>
  )
}

export default LoginForm