import { Button, Typography } from "@material-ui/core"
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import React, {FunctionComponent, useImperativeHandle, useState} from "react"

const Togglable = React.forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(true)


  console.log('ref inside togglable', ref)
  useImperativeHandle(ref, () => {
    console.log('inside useimperative')
    return {
      toggleVisibility
    }
  })

  const showWhenVisible = isVisible ? {display: ''} : {display: 'none'}
  const hideWhenVisible = isVisible ? {display: 'none'} : {display: ''}


  const toggleVisibility = (event: any) => {
    setIsVisible(!isVisible)
  }



  return (
    <>
      <div style={showWhenVisible}>
        {props.children}
      </div>
      <div style={hideWhenVisible}>
      </div>
    </>
  )
})

export default Togglable