import React from 'react'
import section_img1 from "../images/section_img1.jpg"

function ImgArticle({imageUrl}) {
  return (
    <div
    style={{
      
      width:"800px",
      minWidth:"600px"
    }}
    >
      <img src={imageUrl} alt="Article Image" style={{ maxWidth: '100%' }}></img>
    </div>
  )
}

export default ImgArticle