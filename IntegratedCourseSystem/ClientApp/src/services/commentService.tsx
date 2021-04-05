import axios from "axios"
const baseURL = "/api/comments"

const getCommentsByTask = async (taskId: number | null) => {
  try {
    if (!taskId) return null
    const response = await axios.post(
      `${baseURL}/getByTask`,
      {id: taskId},
      {withCredentials: true}
    )
    return response.data
  }
  catch (error) {
    console.log (error.request.data)
    return null
  }
}

const addComment = async (comment: {taskId: number | null, text: string, userId: number}) => {
  try {
    if (!comment.taskId) return null
    const response = await axios.post(
      baseURL,
      comment,
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
  getCommentsByTask,
  addComment
}