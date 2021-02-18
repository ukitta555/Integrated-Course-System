import React from 'react'

type ImageFitToParentProps = {
  src: string,
  alt: string
}

const ImageFitToParent = ({src, alt} : ImageFitToParentProps) =>  {
  const style = {
    maxWidth: '100%',
    maxHeight:'100%'
  }

  return (
    <>
      <img
        src = {src}
        alt = {alt}
        style = {style}
      />
    </>
  )
}

export default ImageFitToParent