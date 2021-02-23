import axios from 'axios'
const baseURL = 'https://localhost:5001/api/users'

const registerUser = async (userData: {login: string, password: string, role: number}) => {
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

export default
{
  registerUser
}