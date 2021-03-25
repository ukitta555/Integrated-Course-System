import axios from "axios"
const baseURL = "/api/TeammateAntipreferences"

const addEnemyPreferences = async (req: {enemyId1: number, enemyId2: number, enemyId3: number, questionnaireId: number}) => {
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
  addEnemyPreferences
}