
type Props = {
    size?:number,
    color?:string
} 

function WalletMinimal({size,color}: Props) {
  return (
    <>
    <svg width={size||"24"} height={size||"24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 14H17.01M7 7H19C19.5304 7 20.0391 7.21071 20.4142 7.58579C20.7893 7.96086 21 8.46957 21 9V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19" stroke={color||"black"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    </>
  )
}

export default WalletMinimal