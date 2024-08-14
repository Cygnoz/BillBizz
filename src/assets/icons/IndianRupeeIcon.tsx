type Props = {color:string}

function IndianRupeeIcon({ color}: Props) {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 3H18M6 8H18M14.5 21L6 13H9C15.667 13 15.667 3 9 3" stroke={color} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    )
}

export default IndianRupeeIcon