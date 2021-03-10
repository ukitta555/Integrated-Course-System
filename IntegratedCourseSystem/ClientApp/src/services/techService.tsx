import axios from "axios"
const baseURL = "/api/teches"
//const baseURL = "http://localhost:3001/techs"


const addTechs = async (requestData: {teches: {name: string}[]}) => {
  try {
    const promisesArray = requestData.teches.map (tech =>
      axios.post (
        baseURL,
        tech,
        {withCredentials : true}
      )
    )
    const response = await Promise.all(promisesArray)
    return response.map (r => r.data)
  }
  catch (error) {
    console.log (error.response.data)
    return []
  }
}



export default {
  addTechs
}