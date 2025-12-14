const FormError = ({ message }: { message: string | undefined }) => {
  return <div className="text-red-500 text-sm mt-1.5">{message}</div>;
};

export default FormError;
