import { deleteBoatTypeQueryOption, ListBoatTypeQueryOption, type BoatType } from "@/api/boat-types";
import TableError from "@/components/TableError";
import TableNotFound from "@/components/TableNotFound";
import TablePagination from "@/components/TablePagination";
import TableSkeleton from "@/components/TableSkeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal, PenBox, Trash2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

const BoatTypes = () => {
  const[searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || ITEMS_PER_PAGE;
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery(
    ListBoatTypeQueryOption(currentPage, limit)
  );

  const setCurrentPage = (page: number) => {
    setSearchParams((params) => {
      params.set("page", String(page));
      return params;
    });
  };

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  const mutation = useMutation({
    ...deleteBoatTypeQueryOption(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boat-types'] });
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-medium">Boat Types</h3>
        <Link to="/boat-types/create" className="text-sm bg-gray-800 text-white px-5 py-2.5 rounded-md cursor-pointer hover:bg-gray-900 transition">
          Create Boat Type
        </Link>
      </div>

      {isPending && <TableSkeleton />}

      {error && <TableError />}

      {data?.data.length === 0 && (
        <TableNotFound>No Boat Types found.</TableNotFound>
      )}

      {data && data.data.length > 0 && (
        <>
          <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-xs">
            <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium tracking-wide text-gray-600">
                    Name
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium tracking-wide text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.data.map((type: BoatType) => (
                  <tr key={type.id}>
                    <td className="px-6 py-3 whitespace-nowrap text-sm">
                      {type.name}
                    </td>
                    <td className="px-6 py-3 text-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="cursor-pointer">
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link to={`/boat-types/edit/${type.id}`} className="cursor-pointer">
                            <DropdownMenuItem className="mb-2 flex items-center">
                              <PenBox
                                strokeWidth={2.2}
                                className="me-1.5 font-medium text-gray-600"
                              />
                              <span>Edit</span>
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem>
                            <div onClick={() => mutation.mutate(type.id)} className="text-red-600 flex items-center">
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

export default BoatTypes;
