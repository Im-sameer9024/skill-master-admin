import React from "react";

const TableComponent = ({ column, data, renderRow }) => {
  return (
    <div className="border border-gray-200 p-6 w-full rounded-xl bg-white shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            {column.map((item,i) => {
              return (
                <th key={i} className="text-left py-4  text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item,index) => renderRow(item,index))
          ) : (
            <tr className=" text-center py-4">
              <td>No Data Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
