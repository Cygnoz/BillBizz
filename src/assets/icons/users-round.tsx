type Props = { color: string };

const usersRound = ({ color }: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 21C18 18.8783 17.1571 16.8434 15.6569 15.3431C14.1566 13.8429 12.1217 13 10 13M10 13C7.87827 13 5.84344 13.8429 4.34315 15.3431C2.84285 16.8434 2 18.8783 2 21M10 13C12.7614 13 15 10.7614 15 8C15 5.23858 12.7614 3 10 3C7.23858 3 5 5.23858 5 8C5 10.7614 7.23858 13 10 13ZM21.9998 20.0002C21.9998 16.6302 19.9998 13.5002 17.9998 12.0002C18.6572 11.507 19.1829 10.8593 19.5304 10.1145C19.8778 9.36965 20.0363 8.55066 19.9918 7.73C19.9473 6.90933 19.7012 6.11228 19.2753 5.40939C18.8493 4.70651 18.2567 4.11946 17.5498 3.7002"
        stroke={color}
        strokeWidth="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default usersRound;