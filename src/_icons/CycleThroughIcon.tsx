import { SVGProps, memo } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    id="Icons"
    viewBox="0 0 32 32"
    {...props}
  >
    <style>
      {
        ".st0{fill:none;stroke:#000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}"
      }
    </style>
    <path d="m17 3-4 4 4 4" className="st0" />
    <path
      d="M7.9 10.5C6.1 12.5 5 15.1 5 18c0 6.1 4.9 11 11 11s11-4.9 11-11S22.1 7 16 7h-1"
      className="st0"
    />
  </svg>
);
const CycleThroughIcon = memo(SvgComponent);
export default CycleThroughIcon;
