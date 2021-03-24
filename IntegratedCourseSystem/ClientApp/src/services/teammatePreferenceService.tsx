import axios from "axios"
const baseURL = "/api/TeammatePreferences"

const addTeammatePreferences = async (req: {friendId1: number,friendId2: number, friendId3: number, questionnaireId: number}) => {
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
  addTeammatePreferences
}