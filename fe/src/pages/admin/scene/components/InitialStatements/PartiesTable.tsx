import React from "react";
import { FaArrowCircleRight, FaTrash } from 'react-icons/fa';

interface PartiesTableProps {
  data: any[];
  onDelete: (item: any) => void;
  onView: (item: any) => void;
}

function formatDateTime(dateString: string) {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
}

const PartiesTable = ({ data, onDelete, onView }: PartiesTableProps) => (
  <table className="w-full text-sm border border-gray-200 mb-4">
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
        <tr key={item.parties_id} className="border-b" >
          <td className="p-2 border text-center">{idx + 1}</td>
          <td className="p-2 border">{item.type_Party}</td>
          <td className="p-2 border">{item.full_name}</td>
          <td className="p-2 border">{formatDateTime(item.created_at)}</td>
          <td className="p-2 border flex gap-2 justify-center">
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
              onClick={e => { e.stopPropagation(); onView(item);}}
            >
              <FaArrowCircleRight size={16} className="text-gray-500 group-hover:text-green-600 transition-colors duration-150" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default PartiesTable; 