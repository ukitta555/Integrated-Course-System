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

const patchGrade = async (newActualGrade: number, subjTaskId: number) => {
  try {
    const arrayWrapper = [{value: newActualGrade, op: 'replace', path:'/actualGrade'}]
    const response = await axios.patch (
      //`${baseURL}/${classId}`,
      `${baseURL}/${subjTaskId}`,
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
  addGrades,
  patchGrade
}