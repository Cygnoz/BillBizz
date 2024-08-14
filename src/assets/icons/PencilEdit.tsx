type Props = { color: string };

function PencilEdit({ color }: Props) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 5L19 9M17 2.9999C17.2547 2.69894 17.5697 2.45396 17.925 2.28059C18.2803 2.10721 18.6681 2.00924 19.0636 1.99292C19.4592 1.9766 19.8538 2.04228 20.2224 2.18579C20.5909 2.3293 20.9254 2.54748 21.2043 2.82642C21.4833 3.10537 21.7006 3.43897 21.8425 3.80595C21.9845 4.17292 22.0478 4.56524 22.0286 4.95788C22.0094 5.35053 21.908 5.73489 21.7309 6.08647C21.5538 6.43805 21.3049 6.74914 21 6.9999L7.5 20.4999L2 21.9999L3.5 16.4999L17 2.9999Z"
        stroke={color ? color : "balck"}
        stroke-width="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default PencilEdit;