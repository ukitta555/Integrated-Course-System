import axios from 'axios'
//const baseURL = "/api/groups"
const baseURL = "http://localhost:3001/groups"

const getGroupsByClassId = async (classId: number | null) => {
  try {
    if (!classId) return null
    const response = await axios.get (
      `${baseURL}?classId=${classId}`,
      {withCredentials: true}
    )
    return response.data
  }
  catch (error) {
     console.log (error.response.data)
     return null
  }
}

export default {
  getGroupsByClassId
}