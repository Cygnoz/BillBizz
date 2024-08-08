
type Props = { color: string };

const ChevronLeft = ({ color }: Props) => {
  return (
    <div>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 18L9 12L15 6"
          stroke={color}
          stroke-width="2"
          strokeLinecap="round"
        strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default ChevronLeft;
