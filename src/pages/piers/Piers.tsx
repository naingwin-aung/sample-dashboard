import { ListPierQueryOption } from "@/api/piers";
import ErrorTable from "@/components/ErrorTable";
import TableSkeleton from "@/components/TableSkeleton";
import { useQuery } from "@tanstack/react-query";
import { PenBox, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Piers = () => {
  const { data, isPending, error } = useQuery(ListPierQueryOption(1, 10));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-medium">Piers</h3>
        <button className="text-sm bg-gray-800 text-white px-5 py-2.5 rounded cursor-pointer hover:bg-gray-900 transition">
          Create Pier
        </button>
      </div>

      {isPending && <TableSkeleton />}

      {error && <ErrorTable />}

      {data?.data.length === 0 && <div>No Piers found.</div>}

      {data?.data.length > 0 && (
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.data.map((pier: any) => (
                <tr key={pier.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {pier.name}
                  </td>
                  <td className="px-6 py-4 text-end">
                    <div className="inline-flex items-center gap-3">
                      <Link to="/piers/edit/1">
                        <PenBox size={21} className="ml-auto" />
                      </Link>
                      <div>
                        <Trash2
                          size={21}
                          className="ml-auto text-red-600 hover:text-red-800 cursor-pointer"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Piers;
