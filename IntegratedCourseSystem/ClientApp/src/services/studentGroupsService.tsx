import axios from "axios"
 const baseURL = "/api/studentGroups"
//const baseURL = "http://localhost:3001/studentGroups"


// fix when fake division arrives
const getStudentsByGroup = async (groupId: number | null) => {
  try {
    if (!groupId) return null
    const response = await axios.post (
        `${baseURL}/getByGroup`,
        {id: groupId},
        {withCredentials : true}
      )
    return response.data
  }
  catch (error) {
    console.log (error.response.data)
    return null
  }
}

export default {
  getStudentsByGroup
}