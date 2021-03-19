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
  const response = await axios.post(
    `${baseURL}/login`
    ,userData
    ,{withCredentials: true}
  )
  return response.data
}

const changeUser = async (userData: {value: number, op: string, path: string}, id: number) => {
  try {
    console.log(userData)
    const arrayWrapper = [userData]
    const response = await axios.patch(
      `${baseURL}/${id}`,
      arrayWrapper,
      {withCredentials: true}
    )
    console.log('patch req:', response, userData)
  }
  catch (error) {
    console.log (error.response.data)
  }
}

const loginInOnEnteringApp = async () => {
  try {
    const response = await axios.post (
      `${baseURL}/logged_in`,
      null,
      {withCredentials: true}
    )
    return response.data
  }
  catch (error) {
    console.log (error)
    return undefined
  }
}

const logout = async () => {
  try {
    const reponse = await axios.post (
      `${baseURL}/logout`,
      null,
      {withCredentials: true}
    )
  }
  catch (error) {
    console.log (error)
  }
}

export default {
  registerUser,
  login,
  changeUser,
  loginInOnEnteringApp,
  logout
}