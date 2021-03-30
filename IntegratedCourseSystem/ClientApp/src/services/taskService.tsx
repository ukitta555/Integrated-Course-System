import axios from "axios"
const baseURL = "/api/tasks"

const getTasksByGroup = async (groupId: number | null) => {
  try {
    if (!groupId) return null
    const response = await axios.post(
      `${baseURL}/getByGroup`,
      {id: groupId},
      {withCredentials: true}
    )
    return response.data
  }
  catch (error) {
    console.log (error.request.data)
    return null
  }
}

export default {
  getTasksByGroup
}