import axios from 'axios'
const baseURL = 'http://localhost:3001/users'

const registerUser = async (userData: {email: string, password: string}) => {
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