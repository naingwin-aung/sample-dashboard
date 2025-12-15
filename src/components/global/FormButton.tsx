const FormButton = ({ type, disabled, onClick, children }: { type?: "button" | "submit" | "reset"; disabled?: boolean; onClick?: React.MouseEventHandler<HTMLButtonElement>; children: React.ReactNode }) => {
  return (
    <button
      type={type || "submit"}
      disabled={disabled}
      onClick={onClick}
      className="text-sm bg-gray-800 text-white px-5 py-2.5 rounded-md cursor-pointer hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-default"
    >
      {children}
    </button>
  );
};

export default FormButton;
