import React from 'react'
import TextArticle from './TextArticle'
import ImgArticle from './ImgArticle'
import section_img1 from "../images/section_img1.jpg"
import { useState, useEffect } from 'react'
import './style.css';

import {flexArticleDirection , titleSize} from '../TypographyFunctions/navbarTypography'

function Article() {


  return (
    <div 
      className='articleDiv'
        style={{
            display: 'flex',
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