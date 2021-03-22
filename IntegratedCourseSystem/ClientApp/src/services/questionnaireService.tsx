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

const getQuestionnaires = async (studentId: number) => {
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

export default {
  createQuestionnaire,
  getQuestionnaires
}
