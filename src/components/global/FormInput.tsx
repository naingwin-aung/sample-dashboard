import { forwardRef, type InputHTMLAttributes } from "react";

type FormInputProps = InputHTMLAttributes<HTMLInputElement>;

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        className={`w-full px-2.5 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:ring-0 outline-none placeholder:text-sm ${className ?? ""}`}
        {...props}
      />
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
