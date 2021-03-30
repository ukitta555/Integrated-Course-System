import axios from 'axios'
//const baseURL = "/api/groups"
const baseURL = "http://localhost:3001/groups"



// change to normal api after algorithm implementation
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

const getGroup = async (groupId: number | null) => {
  try {
    if (!groupId) return null
    const response = await axios.get (
      `${baseURL}/${groupId}`,
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
  getGroup,
  getGroupsByClassId
}