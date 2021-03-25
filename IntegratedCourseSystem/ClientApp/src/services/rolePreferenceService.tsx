import axios from "axios"
import { RolePreference } from "../store/types"
const baseURL = "/api/rolePreferences"

const addRolePreferences = async (req: {rolePreferences: RolePreference[], questionnaireId: number}) => {
 try {
   const response = await axios.post (
     baseURL,
     req,
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
  addRolePreferences
}