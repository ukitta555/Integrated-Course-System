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

const getTaskById = async (taskId: number | null) => {
  try {
    if (!taskId) return null
    const response = await axios.get(
      `${baseURL}/${taskId}`,
      {withCredentials: true}
    )
    return response.data
  }
  catch (error) {
    console.log (error.request.data)
    return null
  }
}

const addTask = async (task: {
  taskDescription: string,
  groupId: number,
  name: string,
  deadLine: Date,
  posted: Date, // should be generated on a server (?)
  done: null
  }) => {
  try {
    const response = await axios.post(
      baseURL,
      task,
      {withCredentials: true}
    )
    return response.data
  }
  catch (error) {
    console.log (error.request.data)
    return null
  }
}

const patchLink = async (taskId: number | null, newLink: string) => {
  try {
    const arrayWrapper = [{value: newLink, op: 'replace', path:'/link'}, {value: new Date(), op: 'replace', path: '/done'}]
    if (!taskId) return null
    const response = await axios.patch (
      //`${baseURL}/${classId}`,
      `${baseURL}/${taskId}`,
      arrayWrapper,
      {withCredentials: true}
    )
    return response.data
  }
  catch (error) {
    console.log(error.response.data)
    return null
  }
}

export default {
  getTasksByGroup,
  getTaskById,
  addTask,
  patchLink
}