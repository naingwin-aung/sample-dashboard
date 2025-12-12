const TableNotFound = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[60vh] w-full flex justify-center items-center">
      <div>{children}</div>
    </div>
  );
};

export default TableNotFound;
