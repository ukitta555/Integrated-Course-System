import React from 'react'
import useField from '../../hooks/useField'

const RegistrationForm = () => {
  const login = useField('text');
  const email = useField('text');
  const password = useField ('password')

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('submitted registration form')
    console.log(login.value, email.value, password.value)
  }

  return (
    <form onSubmit = {onSubmit}>
      <input {...login} />
      <input {...email} />
      <input {...password} />
      <button type = 'submit'> Register! </button>
    </form>
  )
}

export default RegistrationForm