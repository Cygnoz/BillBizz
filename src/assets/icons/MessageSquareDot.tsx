type Props = {
    size?:number
    color?:string
}
 
function MessageSquareDot({size,color}:Props) {
  return (
   <>
   <svg width={size||"12"} height={size||"12"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
   <path d="M11.7 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V21L7 17H19C19.5304 17 20.0391 16.7893 20.4142 16.4142C20.7893 16.0391 21 15.5304 21 15V12.3M21 6C21 7.65685 19.6569 9 18 9C16.3431 9 15 7.65685 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6Z" stroke={color||'black'}  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
   </>
  )
}
 
export default MessageSquareDot