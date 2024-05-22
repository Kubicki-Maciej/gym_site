import React from 'react'
import TextArticle from './TextArticle'
import ImgArticle from './ImgArticle'
import section_img1 from "../images/section_img1.jpg"
import { useState, useEffect } from 'react'


function Article() {

  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(()=>{
    const handleResize = () =>{
      setWidth(window.innerWidth)
      console.log(width);
      console.log('tutaj');
    }
    
    window.addEventListener('resize', handleResize)
    
    return () =>{
      window.removeEventListener("resize", handleResize);
    }

  },[])

  return (
    <div 
        style={{
            // padding: "20px 140px 0px 140px",
            // marginRight:"140px",
            padding: "20px 140px 0px 140px",
            display: 'flex',
            flexDirection: width > 1400 ? "row" : "column",

            justifyContent: "space-between",
            position:"relative",
            top:"-100px"
        }}
    >   
        <TextArticle></TextArticle>
        <ImgArticle imageUrl={section_img1}></ImgArticle>
    </div>
  )
}

export default Article