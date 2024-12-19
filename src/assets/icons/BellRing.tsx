
type Props = {
  color?:string
}

function BellRing({color}: Props) {
  return (
    <>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.3 21C10.4674 21.3044 10.7135 21.5583 11.0125 21.7352C11.3116 21.912 11.6526 22.0053 12 22.0053C12.3475 22.0053 12.6885 21.912 12.9876 21.7352C13.2866 21.5583 13.5327 21.3044 13.7 21M4 2C2.8 3.7 2 5.7 2 8M22 8C22 5.7 21.2 3.7 20 2M6 8C6 6.4087 6.63214 4.88258 7.75736 3.75736C8.88258 2.63214 10.4087 2 12 2C13.5913 2 15.1174 2.63214 16.2426 3.75736C17.3679 4.88258 18 6.4087 18 8C18 15 21 17 21 17H3C3 17 6 15 6 8Z" stroke={color||"#DFE1E2"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    </>
  )
}

export default BellRing