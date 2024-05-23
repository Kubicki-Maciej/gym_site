import React from 'react'
import section_img1 from "../images/section_img1.jpg"


function ImgArticle({imageUrl}) {
  return (
    <div
    
    style={{
      display:"flex",
      width:"100%",
      // minHeight:"400px",
      justifyContent:"center",
      alignItems:"center"
    }}
    >
      <img src={imageUrl} alt="Article Image" style={{ maxWidth: '100%' }}></img>
    </div>
  )
}

export default ImgArticle