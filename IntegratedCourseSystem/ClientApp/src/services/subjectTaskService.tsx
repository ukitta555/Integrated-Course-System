import axios from "axios"
const baseURL = "/api/subjectTasks"

const addGrades = async (subjTask: {
  classSubjectId: number,
  actualGrade: number,
  taskId: number,
  maxGrade: number
  }) => {
  try {
    const response = await axios.post(
      baseURL,
      subjTask,
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
  addGrades
}