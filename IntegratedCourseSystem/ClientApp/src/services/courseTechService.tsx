import axios from "axios"
const baseURL = "/api/classTeches"
//const baseURL = "http://localhost:3001/courseTechs"


const addCourseTechs = async (requestData: {techs: {id:number}[], courseId: number}) => {
  try {
    const modifiedRequest = requestData.techs.map (item => {
      return {
        techId: item,
        classId: requestData.courseId
      }
    })
    console.log ("modified request:",modifiedRequest)
    const promisesArray = modifiedRequest.map (entity =>
      axios.post(
        baseURL,
        entity,
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
  addCourseTechs
}