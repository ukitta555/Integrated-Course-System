import axios from "axios"
const baseURL = "/api/classSubjects"
//const baseURL = "http://localhost:3001/courseTechs"


const getCourseSubjects = async (classId: number | null) => {
  try {
    if (!classId) return []
    const response = await axios.post(
      `${baseURL}/getByClass`,
      {classId},
      {withCredentials: true}
    )
    return response.data
  }
  catch (error){
    console.log (error.response.data)
    return []
  }
}

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


const getSubjectNameById = async (id: number) => {
  try {
    const response = await axios.post(
        `${baseURL}/getName`,
        {id},
        {withCredentials: true}
      )
    return response.data
  }
  catch (error) {
    console.log (error.response.data)
    return []
  }
}


export default {
  getCourseSubjects,
  addCourseSubjects,
  getSubjectNameById
}