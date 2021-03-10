import axios from "axios"
const baseURL = "/api/classSubjects"
//const baseURL = "http://localhost:3001/courseTechs"


const addCourseSubjects = async (requestData: {subjects: {id:number}[], courseId: number}) => {
  try {
    const modifiedRequest = requestData.subjects.map (item => {
      return {
        subjectId: item,
        classId: requestData.courseId
      }
    })
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
  addCourseSubjects
}