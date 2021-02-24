import axios from 'axios'
//const baseURL = 'http://localhost:3001/users'
const baseURL = '/api/users'

const registerUser = async (userData: {email: string, password: string, role: number}) => {
  try {
    console.log ('user data', userData)
    const response = await axios.post(
      `${baseURL}/register`
      ,userData
    )
    console.log(response)
    return response.data
  }
  catch (error) {
    console.log(error.response.data)
    return null
  }
}

const login = async (userData: {email: string, password: string}) => {
  console.log ('inside userService: login user')
  try {
    const response = await axios.post(
      `${baseURL}/login`,
      userData
    )
    return response.data
  }
  catch (error) {
    console.log (error)
    return null
  }
}

export default
{
  registerUser,
  login
}