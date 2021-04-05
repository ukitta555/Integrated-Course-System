import axios from 'axios'
const baseURL = "/api/groupTeches"
//const baseURL = "http://localhost:3001/groupTeches"



// change to normal api after algorithm implementation
const getGroupTechesByGroup = async (groupId: number | null) => {
  try {
    if (!groupId) return null
    const response = await axios.post (
      `${baseURL}/getByGroup`,
      {id: groupId},
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
  getGroupTechesByGroup
}