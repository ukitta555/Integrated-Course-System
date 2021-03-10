import axios from "axios"
const baseURL = "/api/roles"
//const baseURL = "http://localhost:3001/roles"


const addRoles = async (requestData: {roles: {name: string}[]}) => {
  try {
    const promisesArray = requestData.roles.map (role =>
      axios.post(
        baseURL,
        role,
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
  addRoles
}