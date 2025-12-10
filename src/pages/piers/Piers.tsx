import { ListPierQueryOption, type Pier } from "@/api/piers";
import ErrorTable from "@/components/ErrorTable";
import TablePagination from "@/components/TablePagination";
import TableSkeleton from "@/components/TableSkeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { MoreHorizontal, MoreVertical, PenBox, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

const Piers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isPending, error } = useQuery(
    ListPierQueryOption(currentPage, ITEMS_PER_PAGE)
  );

  const totalPages = data ? Math.ceil(data.total / data.limit) : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-medium">Piers</h3>
        <button className="text-sm bg-gray-800 text-white px-5 py-2.5 rounded-md cursor-pointer hover:bg-gray-900 transition">
          Create Pier
        </button>
      </div>

      {isPending && <TableSkeleton />}

      {error && <ErrorTable />}

      {data?.data.length === 0 && (
        <div className="h-[60vh] w-full flex justify-center items-center">
          <div>No Piers found.</div>
        </div>
      )}

      {data && data.data.length > 0 && (
        <>
          <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-xs">
            <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium tracking-wider text-gray-600">
                    Name
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium tracking-wide text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.data.map((pier: Pier) => (
                  <tr key={pier.id}>
                    <td className="px-6 py-3 whitespace-nowrap text-sm">
                      {pier.name}
                    </td>
                    <td className="px-6 py-3 text-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link to={`/piers/edit/${pier.id}`} className="cursor-pointer">
                            <DropdownMenuItem className="mb-1.5 flex items-center">
                              <PenBox
                                strokeWidth={2.2}
                                className="me-1.5 font-medium text-gray-600"
                              />
                              <span>Edit</span>
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem>
                            <div className="text-red-600 flex items-center">
                              <Trash2
                                strokeWidth={2.2}
                                className="me-3.5 text-red-600"
                              />
                              <span>Delete</span>
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={data.total}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default Piers;
