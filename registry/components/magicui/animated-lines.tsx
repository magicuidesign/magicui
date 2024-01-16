export default function AnimatedLines() {
  return (
    <svg
      viewBox="0 0 1005 758"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="stroke-[5px] [mask-repeat:no-repeat] [mask-size:40px]"
    >
      <path
        d="M0.000366211 3C382.5 3 313 362.999 1005 362.999"
        stroke="white"
      />

      <path d="M1004.78 383.5H0.000366211" stroke="white" />
      <path
        d="M1005 404.5C313 404.5 379.5 755.5 0.000366211 755.5"
        stroke="white"
      />

      <path
        d="M0.000366211 3C382.5 3 313 362.999 1005 362.999"
        className="animate-line stroke-blue-500 [mask-image:linear-gradient(to_right,transparent,black,transparent)]"
      />
      <path
        d="M1004.78 383.5H0.000366211"
        className="animate-line stroke-red-500 [mask-image:linear-gradient(to_right,transparent,black,transparent)]"
      />
      <path
        d="M1005 404.5C313 404.5 379.5 755.5 0.000366211 755.5"
        className="animate-line stroke-green-500 [mask-image:linear-gradient(to_right,transparent,black,transparent)]"
      />
    </svg>
  );
}
