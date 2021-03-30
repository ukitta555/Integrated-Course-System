import axios from "axios"
import { TechPreference } from "../store/types"
const baseURL = '/api/TechPreferences'

const addTechPreferences = async (data: {techPreferences: TechPreference[], questionnaireId: number}) => {
  try {
    const response = await axios.post(
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
  addTechPreferences
}