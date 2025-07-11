import { reportsApi } from "@/api/reports"

import { formatDate } from "@/utils/date"
import { formatUUID } from "@/utils/id"
import { useQuery } from "@tanstack/react-query"
import PartyTypeTable from "./PartyTypeTable"

export const ReportDetail = (p: { id: string }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["report_id", p.id],
    queryFn: () => reportsApi.getReportById(p.id),
  })
  if (isPending) return "Loading..."

  if (error) return "An error has occurred: " + error.message

  const report = data.data
  const WITNESS = report.parties
    .filter((v) => {
      return v.party_type == "witness"
    })
    .map((v) => {
      return v
    })
  const VICTIM = report.parties
    .filter((v) => {
      return v.party_type == "victim"
    })
    .map((v) => {
      return v
    })
  const SUSPECT = report.parties
    .filter((v) => {
      return v.party_type == "suspect"
    })
    .map((v) => {
      return v
    })
  const ACCOMPLICE = report.parties
    .filter((v) => {
      return v.party_type == "accomplice"
    })
    .map((v) => {
      return v
    })

  console.log(report.parties.length)

  return (
    <div className="w-full lg:w-5xl mx-auto min-h-screen bg-white p-6 flex flex-col gap-6">
      <div className="flex justify-flex-start gap-20 text-sm">
        <div className="">
          <p>ReportID: {formatUUID(report.report_id)}</p>
          <p className="flex items-center gap-2">
            <span>Status:</span>{" "}
            <p className=" py-1 px-3 rounded-4xl bg-[#FFEDD9]">
              {report.status}
            </p>
          </p>
        </div>
        <div>
          <p>Date: {formatDate(report.time_occurrence).Date}</p>
          <p>Time: {formatDate(report.time_occurrence).Time}</p>
        </div>
      </div>
      <hr className="mt-1" />
      <h2 className="text-center font-bold text-xl">REPORT DETAIL</h2>
      <div className="p-4">
        <h3 className="text-red-600 font-semibold mb-4">MY INFORMATION</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-bold">Fullname</p>
            <span>{report.reporter_fullname}</span>
          </div>
          <div>
            <p className="font-bold">Email</p>
            <span>{report.reporter_email}</span>
          </div>
          <div>
            <p className="font-bold">Relationship to the incident</p>
            <span>{report.relation_incident}</span>
          </div>
          <div>
            <p className="font-bold">Phone</p>
            <span>{report.reporter_phonenumber}</span>
          </div>
          <div className="col-span-2">
            <p className="font-bold">Address</p>
            <span>{report.case_location}</span>
          </div>
        </div>
      </div>
      <hr className="my-3" />
      <div className="p-4">
        <h3 className="text-red-600 font-semibold mb-4">
          INCIDENT INFORMATION
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-bold">Type of Crime</p>
            <span>{report.crime_type}</span>
          </div>
          <div>
            <p className="font-bold">Severity</p>
            <span>{report.severity}</span>
          </div>
          <div>
            <p className="font-bold">Datetime of occurrence</p>
            <span>
              {formatDate(report.time_occurrence).Date}{" "}
              {formatDate(report.time_occurrence).Time}
            </span>
          </div>
          <div>
            <p className="font-bold">Status</p>
            <p className=" py-1 px-3 rounded-4xl w-max bg-[#FFEDD9]">
              {report.status}
            </p>
          </div>
          <div>
            <p className="font-bold">Detailed address</p>
            <p>{report.case_location}</p>
          </div>
          <div>
            <p className="font-bold">Description of the incident</p>
            <p>{report.description}</p>
          </div>
        </div>
      </div>
      <hr className="my-6" />
      <div className="p-4">
        <h3 className="text-red-600 font-semibold mb-4">
          RELEVANT INFORMATION
        </h3>
        <h4 className="text-blue-600 mb-2">I. Relevant Parties</h4>

        <PartyTypeTable ls={VICTIM} title="A/ Victim (optional)" />
        <PartyTypeTable ls={WITNESS} title="B/ Witness (optional)" />
        <PartyTypeTable ls={SUSPECT} title=">C/ Suspect (optional)" />
        <PartyTypeTable ls={ACCOMPLICE} title="D/ Accomplice (optional)" />
      </div>
      <div className="p-4">
        <h4 className="text-blue-600 mb-4 mt-[-40px]">II. Initial Evidence</h4>
        <table className="w-full border mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Evidence Location</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Attachments</th>
            </tr>
          </thead>
          <tbody>
            {report.evidences.map((v, i) => {
              return (
                <tr>
                  <td className="border p-2">#{i}</td>
                  <td className="border p-2">{v.evidence_type}</td>
                  <td className="border p-2">{v.current_location}</td>
                  <td className="border p-2">{v.description}</td>
                  <td className="border p-2">
                    <div>
                      {v.attached_file.map((vf) => {
                        return <div>{vf.original_name}</div>
                      })}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p>Uploaded:</p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 border p-2 rounded w-fit"></div>
          <div className="flex items-center gap-2 border p-2 rounded w-fit"></div>
        </div>
      </div>
    </div>
  )
}
export default ReportDetail
