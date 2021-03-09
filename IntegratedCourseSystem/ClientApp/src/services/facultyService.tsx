import axios from 'axios'
const baseURL = '/api/faculties'

const getFaculties = async () => {
  try {
    const response = await axios.get (baseURL)
    return response.data
  }
  catch (error) {
    console.log (error.response.data)
  }
}

export default
{
  getFaculties
}