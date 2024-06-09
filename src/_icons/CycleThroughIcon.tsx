import { SVGProps, memo } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 512 512"
    {...props}
  >
    <path
      d="M455.11 199.11v256H56.31V56.89h256V0H56.89C25.58 0 0 25.61 0 56.89v398.22C0 486.39 25.58 512 56.89 512h398.22c31.28 0 56.89-25.61 56.89-56.89v-256h-56.89zm-83.64-58.58 26.75 58.58 26.72-58.58 58.61-26.75-58.61-26.75-26.72-58.58-26.75 58.58-58.58 26.75 58.58 26.75zM256 142.22l-35.56 78.22L142.22 256l78.22 35.56L256 369.78l35.56-78.22L369.78 256l-78.22-35.56L256 142.22z"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: "#1d1d1d",
      }}
    />
  </svg>
);
const CycleThroughIcon = memo(SvgComponent);
export default CycleThroughIcon;
