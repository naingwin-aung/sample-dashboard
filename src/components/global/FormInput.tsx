const FormInput = ({ id, placeholder }: { id: string; name: string; placeholder: string }) => {
  return (
    <input
      type="text"
      id={id}
      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-0 outline-none"
      placeholder={placeholder}
    />
  );
};

export default FormInput;
