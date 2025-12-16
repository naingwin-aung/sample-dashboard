import { ListProductQueryOption, type Product } from "@/api/products";
import TableButton from "@/components/TableButton";
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
import { useQuery } from "@tanstack/react-query";
import { MoreHorizontal, PenBox, Trash2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || ITEMS_PER_PAGE;

  const { data, isPending, error } = useQuery(
    ListProductQueryOption(currentPage, limit)
  );

  const setCurrentPage = (page: number) => {
    setSearchParams((params) => {
      params.set("page", String(page));
      return params;
    });
  };

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-medium">Products</h3>
        <TableButton to="/products/create">Create Product</TableButton>
      </div>

      {isPending && <TableSkeleton />}

      {error && <TableError />}

      {data?.data.length === 0 && (
        <TableNotFound>No products found.</TableNotFound>
      )}

      {data && data.data.length > 0 && (
        <>
          <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-xs">
            <table className="min-w-full divide-y divide-gray-200 shadow-xs rounded-lg">
              <thead>
                <tr>
                  <td className="px-6 py-2.5 text-left text-sm font-medium tracking-wide text-gray-600">
                    Name
                  </td>
                  <td className="px-6 py-2.5 text-right text-sm font-medium tracking-wide text-gray-600">
                    Action
                  </td>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.data.map((product: Product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm">
                      {product.name}
                    </td>
                    <td className="px-6 py-2.5 text-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="cursor-pointer">
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link to={`/products/edit/${product.id}`} className="cursor-pointer">
                            <DropdownMenuItem className="mb-2 flex items-center">
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

export default Products;
