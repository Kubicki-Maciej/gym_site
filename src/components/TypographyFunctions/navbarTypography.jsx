let titleSizeXXL = '3rem'
let titleSizeXL = '2.5rem'
let titleSizeL = '2rem'

let textSizeXXL = '1.05rem'
let textSizeXL = '1rem'
let textSizeL = '0.85rem'

let tabletSwap = 1024

let mobileSwap = 764

export function flexArticleDirection(width) {
    if(width>tabletSwap){
        return "row"
      }else{
        return "column"
      }
}

export function titleSize(width) {
    if(width>tabletSwap){
        return titleSizeXXL
    }else if(width>600){
        return titleSizeXL
    }else{
        return titleSizeL
    }
}

export function textSize(width) {
    if(width>tabletSwap){
        return textSizeXXL
    }else if(width>600){
        return textSizeXL
    }else{
        return textSizeL
    }
}

export function lineHeight(width) {
    if(width>tabletSwap){
        return "140%"
    }else if(width>600){
        return textSizeXL
    }else{
        return textSizeL
    }
}




// const [width, setWidth] = useState(window.innerWidth);
// useEffect(()=>{
//   const handleResize = () =>{
//     setWidth(window.innerWidth)
//   }
//   window.addEventListener('resize', handleResize)
//   return () =>{
//     window.removeEventListener("resize", handleResize);
//   }
// },[])