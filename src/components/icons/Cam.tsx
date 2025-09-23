import { SVGProps } from "@/utils/SVGProps";

export default function ICam({ width = 24, height = 24, }: SVGProps) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 20 18"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13 0L15 3H19C19.5523 3 20 3.44772 20 4V17C20 17.5523 19.5523 18 19 18H1C0.447715 18 0 17.5523 0 17V4C0 3.44772 0.447715 3 1 3H5L7 0H13ZM11.764 2H8.235L6.23607 5H2V16H18V5H13.7639L11.764 2ZM10 6C12.2091 6 14 7.79086 14 10C14 12.2091 12.2091 14 10 14C7.79086 14 6 12.2091 6 10C6 7.79086 7.79086 6 10 6ZM10 8C8.89543 8 8 8.89543 8 10C8 11.1046 8.89543 12 10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8Z"
          fill="currentColor"
        />
      </svg>
    </>
  );
}
