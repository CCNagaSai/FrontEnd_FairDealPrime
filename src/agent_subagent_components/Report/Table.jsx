import React, { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

function FormTable({ data, columns, showTotals, showPagination }) {
  const [sortedData, setSortedData] = useState(data);
  const [sortConfig, setSortConfig] = useState(null);

  const totalIn = data.reduce((acc, entry) => acc + parseFloat(entry.in || 0), 0);
  const totalOut = data.reduce((acc, entry) => acc + parseFloat(entry.out || 0), 0);

  const handleSort = (column) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === column.toLowerCase() &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    const sorted = [...data].sort((a, b) => {
      const aValue = a[column.toLowerCase()];
      const bValue = b[column.toLowerCase()];
      if (aValue < bValue) return direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setSortedData(sorted);
    setSortConfig({ key: column.toLowerCase(), direction });
  };

  return (
    <div className="mt-6">
      {showTotals && (
        <div className="mb-4 ml-2 text-blue-800 font-bold text-xl">
          <h3>Total: In ({totalIn}) Out ({totalOut})</h3>
        </div>
      )}

      <div className="overflow-x-auto w-full max-w-full flex justify-center">
        <table className="w-full[950] table-auto border-collapse border border-gray-400">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-4 py-2 text-left border border-gray-400 bg-[#e6ebff]  text-blue-600 text-xs sm:text-sm whitespace-nowrap"
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center">
                    {column}
                    <span className="ml-2">
                      {sortConfig?.key === column.toLowerCase() ? (
                        sortConfig.direction === "ascending" ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        <FaSort />
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((entry, index) => (
              <tr key={index} className="border-b border-gray-400">
                {columns.map((column, idx) => (
                  <td
                    key={idx}
                    className="px-4 py-2 text-xs sm:text-sm border border-gray-400"
                  >
                    {entry[column.toLowerCase()] || "-"}
                  </td>
                ))}
              </tr>
            ))}
            {sortedData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-2 text-center text-sm"
                >
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showPagination && (
        <div className="flex justify-end mt-4 text-gray-800">
          <button className="px-4 py-2 mx-2 border rounded-lg text-sm border-gray-800 hover:bg-blue-500 hover:text-white">
            Previous
          </button>
          <button className="px-4 py-2 mx-2 border rounded-lg text-sm border-gray-800 hover:bg-blue-500 hover:text-white">
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default FormTable;
