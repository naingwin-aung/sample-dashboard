const TableSkeleton = () => {
  return (
    <div>
        <div className="animate-pulse">
            {/* <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div> */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium tracking-wider">
                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            </th>
                            <th className="px-6 py-3 text-right text-sm font-medium tracking-wide">
                                <div className="h-4 bg-gray-300 rounded w-1/2 ms-auto"></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                                </td>
                                <td className="px-6 py-4 text-end">
                                    <div className="h-4 bg-gray-300 rounded w-1/3 ms-auto"></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default TableSkeleton