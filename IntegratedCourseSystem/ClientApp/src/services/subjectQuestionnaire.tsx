import axios from "axios"
const baseURL = "/api/subjectQuestionnaires"
//const baseURL = "http://localhost:3001/subjectQuestionnaire"


// refactor when backend arrives
const getSubjects = async (queId: number) => {
  try {
    const response = await axios.post(
      `${baseURL}/getByQue`,
      {id: queId},
      {withCredentials: true}
    )
    return response.data
  }
  catch (error) {
    console.log (error.response.data)
  }
}

export default {
  getSubjects
}