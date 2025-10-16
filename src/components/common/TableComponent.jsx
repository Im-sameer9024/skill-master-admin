import React from "react";

const TableComponent = ({ column, data }) => {
  

  return (
    <div className="border border-gray-200 p-6 w-full rounded-xl bg-white shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            {column.map((item) => {
              return (
                <th className="text-left py-4  text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                index === data.length - 1 ? "border-b-0" : ""
              }`}
            >
              <td className="py-4 text-sm text-black font-medium">
                {item.id}
              </td>
              <td className="py-4  text-sm text-smallHeading font-bold ">{item.name}</td>
              <td className="py-4  text-sm text-smallHeading">{item.email}</td>
              <td className="py-4 text-sm text-smallHeading ">
               {item.phone}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
