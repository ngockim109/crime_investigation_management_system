import React from "react"
import { useQuery } from '@tanstack/react-query';
import { casesApi } from "@/api/cases";

const caseId = '5f8c92b5-4e20-4c4b-bf3b-08badc4c92a1'; // Thay bằng caseId thực tế

const PreliminaryPhysicalEvidence = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['scene-info', caseId],
    queryFn: () => casesApi.getSceneInfo(caseId).then(res => res.data),
  });

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">
          PRELIMINARY PHYSICAL EVIDENCE INFORMATION
        </span>
        <button className="flex items-center gap-1 px-2 py-1 border rounded text-xs">
          ADD <span>+</span>
        </button>
      </div>
      <div className="bg-[#F6F7F8] rounded p-4 min-h-[120px]">
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <table className="w-full text-sm border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Location</th>
                <th className="p-2 border">Collector</th>
                <th className="p-2 border">Time</th>
              </tr>
            </thead>
            <tbody>
              {(data?.data?.preliminary_physical_evidences ?? []).map((item: any) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2 border text-center">{item.id}</td>
                  <td className="p-2 border">{item.location}</td>
                  <td className="p-2 border">{item.collector}</td>
                  <td className="p-2 border">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}

export default PreliminaryPhysicalEvidence
