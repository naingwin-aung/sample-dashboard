import { Link } from "react-router-dom";

const TableButton = ({to, children} : {to: string, children: React.ReactNode}) => {
  return (
    <Link
      to={to}
      className="text-sm bg-gray-800 text-white px-5 py-2.5 rounded-md cursor-pointer hover:bg-gray-900 transition"
    >
      {children}
    </Link>
  );
};

export default TableButton;
