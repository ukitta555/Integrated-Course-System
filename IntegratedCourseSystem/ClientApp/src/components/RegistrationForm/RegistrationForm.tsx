import React from 'react'
import {useDispatch} from 'react-redux'
import useField from '../../hooks/useField'
import {registerUserAction} from '../../reducers/userReducer/userActionCreators'


const RegistrationForm = () => {
  const dispatch = useDispatch()

  const email = useField('text');
  const password = useField ('password')
  const repeatPassword = useField ('password');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('submitted registration form')
    dispatch (registerUserAction(email.value, password.value, repeatPassword.value))
  }

  return (
    <form onSubmit = {onSubmit}>
      <input {...email} />
      <input {...password} />
      <input {...repeatPassword} />
      <button type = 'submit'> Register! </button>
    </form>
  )
}

export default RegistrationForm