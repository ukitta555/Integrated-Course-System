import axios from 'axios'
const baseURL = '/api/users'

const registerUser = async (userData: {email: string, password: string, role: number}) => {
  try {
    console.log ('user data', userData)
    const response = await axios.post(
      `${baseURL}`
      ,userData
    )
    return response.data
  }
  catch (error) {
    console.log(error)
    return null
  }
}

const loginUser = async (userData: {email: string, password: string}) => {
  console.log('huh')
  return null
}

export default
{
  registerUser
}