import { SVGProps } from "@/utils/SVGProps";

export default function IHome({ width = 16, height = 18 }: SVGProps) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 16 18"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.32873 0.515579C9.3873 0.567641 9.44276 0.6231 9.49482 0.68167L15.4948 7.43167C15.8202 7.79777 16 8.27057 16 8.7604V16C16 17.1046 15.1046 18 14 18H10.002C10.0013 18 10.0007 18 10 18H6C5.99934 18 5.99868 18 5.99803 18H2C0.89543 18 0 17.1046 0 16V8.7604C0 8.27057 0.179757 7.79777 0.505181 7.43167L6.50518 0.68167C7.23902 -0.143896 8.50316 -0.218257 9.32873 0.515579ZM7 16H9V12H7V16ZM11 16V11C11 10.4477 10.5523 10 10 10H6C5.44772 10 5 10.4477 5 11V16H2V8.7604L8 2.0104L14 8.7604V16H11Z"
          fill="currentColor"
        />
      </svg>
    </>
  );
}
