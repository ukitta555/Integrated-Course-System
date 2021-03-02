import axios from 'axios'
//const baseURL = 'http://localhost:3001/users'
const baseURL = '/api/users'

const registerUser = async (userData: {email: string, password: string, role: number}) => {
  try {
    console.log ('user data', userData)
    const response = await axios.post(
      `${baseURL}/register`
      ,userData
     // , {withCredentials: true}
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
      `${baseURL}/login`
      ,userData
      ,{withCredentials: true}
    )
    return response.data
  }
  catch (error) {
    console.log (error.response.data)
    return null
  }
}

const changeUser = async (userData: {role: number}, id: number) => {
  try {
    const response = await axios.patch(
      `${baseURL}/${id}`,
      userData,
      {withCredentials: true}
    )
    console.log('patch req:', response, userData)
  }
  catch (error) {
    console.log (error)
  }
}

export default
{
  registerUser,
  login,
  changeUser
}