import axios from "axios"
const baseURL = "/api/subjects"
//const baseURL = "http://localhost:3001/subjects"


const addSubjects = async (requestData: {subjects: {name:string}[]}) => {
  try {
    const promisesArray = requestData.subjects.map (subject =>
      axios.post(
        baseURL,
        subject,
        {withCredentials: true}
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
  addSubjects
}