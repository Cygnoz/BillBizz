
type Props = {
    color?:string,
    size?:number
}

function LightBulb({color,size}: Props) {
  return (
    <>
        <svg width={size||"24"} height={size||"24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 14C15.2 13 15.7 12.3 16.5 11.5C17.5 10.6 18 9.3 18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 9 6.2 10.2 7.5 11.5C8.2 12.2 8.8 13 9 14M9 18H15M10 22H14" stroke={color||"black"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </>
  )
}

export default LightBulb