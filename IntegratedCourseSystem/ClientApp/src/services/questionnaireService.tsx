import axios from "axios"
const baseURL = "/api/questionnaire"
//const baseURL = "http://localhost:3001/questionnaire"

const createQuestionnaire = async (queInfo: {studentId: number, classId: number}) => {
  try {
    const response = await axios.post (
      baseURL,
      queInfo,
      {withCredentials: true}
    )
    return response.data
  }
  catch (error) {
    console.log(error.response.data)
  }
}

const getQuestionnairesByStudent = async (studentId: number) => {
  try {
    const response = await axios.post (
      `${baseURL}/getByStudent`,
      {studentId: studentId},
      {withCredentials: true}
    )
    return response.data
  }
  catch (error) {
    console.log (error.response.data)
  }
}

const getQuestionnaire = async (data: {studentId: number | null, classId: number | null}) => {
  try {
    if (!data.studentId || !data.classId) {
      return null
    }
    const response = await axios.post (
      `${baseURL}/getByEquality`,
      data,
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
  createQuestionnaire,
  getQuestionnairesByStudent,
  getQuestionnaire
}
