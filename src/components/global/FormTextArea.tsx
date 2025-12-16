import React from "react";

interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const FormTextArea = React.forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`${className} w-full border border-gray-200 rounded-md p-2 text-sm min-h-[180px] outline-none focus:ring-0 hover:border-gray-300 focus:border-gray-300`}
        {...props}
      />
    );
  }
);

FormTextArea.displayName = "FormTextArea";

export default FormTextArea;
