type Props = { color: string; classname?: string };

const ListFilter = ({ color, classname }: Props) => {
  return (
    <div className={classname}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={classname}
      >
        <path
          d="M3 6H21M7 12H17M10 18H14"
          stroke={color}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default ListFilter;