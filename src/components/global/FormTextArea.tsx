const FormTextArea = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  return <textarea className={`${className} w-full border border-gray-200 rounded-md p-2 text-sm min-h-[180px] outline-none focus:ring-0 hover:border-gray-300 focus:border-gray-300`}>{children}</textarea>;
};

export default FormTextArea;
