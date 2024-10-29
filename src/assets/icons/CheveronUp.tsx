type Props = { color: string };

function CheveronUp({color}: Props) {
  return (
    <div>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 15L12 9L6 15"
          stroke={color}
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
}

export default CheveronUp;
