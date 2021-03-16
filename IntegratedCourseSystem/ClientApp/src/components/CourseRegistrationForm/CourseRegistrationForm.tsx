import React, {useState} from 'react'


const CourseRegistrationForm = () => {
  const NOT_SELECTED = -1
  const [selectedCourse, setSelectedCourse] = useState<number>(NOT_SELECTED)
  return (
    <div>
      Course Registration Form
    </div>
  )
}

export default CourseRegistrationForm