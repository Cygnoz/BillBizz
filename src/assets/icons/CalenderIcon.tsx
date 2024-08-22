type Props = {color:string}
 
function CalenderIcon({color}: Props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
 
  )
}
 
export default CalenderIcon