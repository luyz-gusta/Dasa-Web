import { SVGProps } from "@/types/SVGProps";

export default function BoxIcon(props: SVGProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2l3 1.5 6 3v15l-6-3-6 3-6-3V6l6-3L12 2zm-2 5.5L4 5.5v11l6 3v-12zm8 12l4-2v-11l-4 2v11z"
        fill="currentColor"
      />
    </svg>
  );
}