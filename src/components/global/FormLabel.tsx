const FormLabel = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => {
  return (
    <label htmlFor={htmlFor} className="block mb-2.5 text-gray-700">
      {children}
    </label>
  );
};

export default FormLabel;
