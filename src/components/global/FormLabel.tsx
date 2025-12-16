const FormLabel = ({ htmlFor, children, className }: { htmlFor?: string; children: React.ReactNode; className?: string }) => {
  return (
    <label htmlFor={htmlFor} className={`block mb-2 text-sm text-gray-700 ${className ?? ""}`}>
      {children}
    </label>
  );
};

export default FormLabel;
