type Props = { color: string };

const squreUserRound = ({ color }: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 21C18 19.4087 17.3679 17.8826 16.2426 16.7574C15.1174 15.6321 13.5913 15 12 15M12 15C10.4087 15 8.88258 15.6321 7.75736 16.7574C6.63214 17.8826 6 19.4087 6 21M12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15ZM5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z"
        stroke={color}
        strokeWidth="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default squreUserRound;