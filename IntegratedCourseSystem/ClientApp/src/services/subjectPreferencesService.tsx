import axios from "axios"
import { SubjectPreference } from "../store/types"
const baseURL = "/api/SubjectQuestionnaires"

const addSubjectPreferences = async (data: {questionnaireId: number | null, classSubjectId: number | null}[]) => {
  try {
    if (!data[0].classSubjectId) return null
    const response = await axios.post (
      baseURL,
      data,
      {withCredentials: true}
    )
    return response.data
  }
  catch (error) {
    console.log (error.response.data)
    return null
  }
}

export default {
  addSubjectPreferences
}