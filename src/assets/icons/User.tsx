type Props = { color: string ,height?:number,width?:number};


function User({color,height,width}: Props) {
  return (
    <div><svg width={width?width:"24"}
    height={height?height:"24"} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.6673 14V12.6667C12.6673 11.9594 12.3864 11.2811 11.8863 10.781C11.3862 10.281 10.7079 10 10.0007 10H6.00065C5.29341 10 4.61513 10.281 4.11503 10.781C3.61494 11.2811 3.33398 11.9594 3.33398 12.6667V14M10.6673 4.66667C10.6673 6.13943 9.47341 7.33333 8.00065 7.33333C6.52789 7.33333 5.33398 6.13943 5.33398 4.66667C5.33398 3.19391 6.52789 2 8.00065 2C9.47341 2 10.6673 3.19391 10.6673 4.66667Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    </div>
  )
}

export default User