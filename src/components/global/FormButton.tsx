const FormButton = ({ disabled, children }: { disabled?: boolean; children: React.ReactNode }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="text-sm bg-gray-800 text-white px-5 py-2.5 rounded-md cursor-pointer hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-default"
    >
      {children}
    </button>
  );
};

export default FormButton;
