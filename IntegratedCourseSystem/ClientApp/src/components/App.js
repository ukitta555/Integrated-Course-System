import React, {useState, useEffect} from "react"
import axios from "axios"

const App = () => {
  const [ukraine, setUkraine] = useState(null);

  useEffect (() => {
    console.log("inside useEffect")
    async function memeReview() {
      const response = await axios.get("api/weatherforecast")
      console.log(response.data)
      setUkraine(response.data)
    }
    memeReview();
  },[])

  console.log(ukraine)

  return (
    <div>
      {
        ukraine
          ? ukraine.map(forecast => <ul key={forecast.date}> {forecast.temperatureC} </ul>)
          : "xd you got promised by js"
      }
    </div>
  )
}
export default App