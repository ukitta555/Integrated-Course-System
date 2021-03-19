import axios from "axios"
//const baseURL = "/api/questionnaireSubjects"
const baseURL = "http://localhost:3001/subjectQuestionnaire"


// refactor when backend arrives
const getSubjects = async (queId: number) => {
  try {
    const response = await axios.get(
      `${baseURL}?questionnaireId=${queId}`,
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