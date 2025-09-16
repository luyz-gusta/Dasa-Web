import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  state?: "default" | "success" | "error";
  name: string;
  icon?: ReactNode;
  position?: "left" | "right";
}
export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      label = "default",
      helperText,
      state,
      className,
      name,
      icon,
      position = "left",
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col w-full">
        {label && (
          <label
            htmlFor={name}
            className="block mb-[0.5rem] font-inter font-semibold"
          >
            {label}
            {props.required && <span className="ml-1 text-error-500">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && position == "left" && (
            <div className="top-1/2 left-[1.25rem] z-10 absolute flex justify-center items-center w-[1.5rem] h-[1.5rem] text-neutral-400 -translate-y-1/2 pointer-events-none transform">
              {icon}
            </div>
          )}
          <input
            {...props}
            ref={ref}
            type={props.type}
            id={name}
            className={`${className}`}
            aria-invalid={state === "error"}
            aria-describedby={helperText ? `${name}-helper` : undefined}
          />
          {icon && position == "right" && (
            <div className="top-1/2 right-[1.25rem] z-10 absolute flex justify-center items-center w-[1.5rem] h-[1.5rem] text-neutral-400 -translate-y-1/2 pointer-events-none transform">
              {icon}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
