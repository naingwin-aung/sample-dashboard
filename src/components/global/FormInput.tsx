import { forwardRef, type InputHTMLAttributes } from "react";

type FormInputProps = InputHTMLAttributes<HTMLInputElement>;

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        className={`w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-0 outline-none ${className ?? ""}`}
        {...props}
      />
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
