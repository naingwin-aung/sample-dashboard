const FormLabel = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => {
  return (
    <label htmlFor={htmlFor} className="block mb-2 text-sm text-gray-700">
      {children}
    </label>
  );
};

export default FormLabel;
