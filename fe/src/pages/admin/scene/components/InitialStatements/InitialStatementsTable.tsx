import React from "react";
import { FaArrowCircleRight, FaEdit, FaTrash } from 'react-icons/fa';

interface InitialStatementsTableProps {
  data: any[];
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
  onView: (item: any) => void;
}

function formatDateTime(dateString: string) {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
}

const InitialStatementsTable = ({ data, onEdit, onDelete, onView }: InitialStatementsTableProps) => (
  <table className="w-full text-sm border border-gray-200">
    <thead>
      <tr className="bg-gray-100">
        <th className="p-2 border">#</th>
        <th className="p-2 border">Statement Type</th>
        <th className="p-2 border">Provider</th>
        <th className="p-2 border">Date</th>
        <th className="p-2 border"></th>
      </tr>
    </thead>
    <tbody>
      {(data ?? []).map((item, idx) => (
        <tr key={item.id} className="border-b">
          <td className="p-2 border text-center">{idx + 1}</td>
          <td className="p-2 border">{item.statement_type}</td>
          <td className="p-2 border">{item.provider}</td>
          <td className="p-2 border">{formatDateTime(item.date)}</td>
          <td className="p-2 border flex gap-2 justify-center">
            <button
              className="cursor-pointer group rounded-full border border-gray-300 p-2 bg-white hover:bg-blue-100 transition-colors duration-150 flex items-center justify-center"
              title="Edit"
              onClick={e => { e.stopPropagation(); onEdit(item); }}
            >
              <FaEdit size={16} className="text-gray-500 group-hover:text-blue-600 transition-colors duration-150" />
            </button>
            <button
              className="cursor-pointer group rounded-full border border-gray-300 p-2 bg-white hover:bg-red-100 transition-colors duration-150 flex items-center justify-center"
              title="Delete"
              onClick={e => { e.stopPropagation(); onDelete(item); }}
            >
              <FaTrash size={16} className="text-gray-500 group-hover:text-red-600 transition-colors duration-150" />
            </button>
            <button
              className="cursor-pointer group rounded-full border border-gray-300 p-2 bg-white hover:bg-green-100 transition-colors duration-150 flex items-center justify-center"
              title="View Detail"
              onClick={e => { e.stopPropagation(); onView(item); }}
            >
              <FaArrowCircleRight size={16} className="text-gray-500 group-hover:text-green-600 transition-colors duration-150" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default InitialStatementsTable; 