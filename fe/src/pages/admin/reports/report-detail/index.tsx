import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { reportsApi } from "@/api/reports"
import type { Report } from "@/types/report.interface"
import { formatUUID } from "@/utils/id"

const ReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReport = async () => {
      if (!id) return

      try {
        setLoading(true)
        const response = await reportsApi.getReportById(id)
        console.log("Report data received:", response.data)
        console.log("Parties data:", response.data.parties)
        console.log("Evidences data:", response.data.evidences)
        console.log(
          "Evidence files:",
          response.data.evidences?.map((e) => e.attached_file)
        )
        console.log(
          "Party attachments:",
          response.data.parties?.map((p) => p.attachments_url)
        )
        setReport(response.data)
      } catch (err) {
        console.error("Error fetching report:", err)
        setError("Failed to load report details")
      } finally {
        setLoading(false)
      }
    }

    fetchReport()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-6 text-black font-sans flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-white p-6 text-black font-sans flex items-center justify-center">
        <div className="text-lg text-red-600">
          {error || "Report not found"}
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
    } catch {
      return dateString
    }
  }

  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString)
      const dateStr = date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
      const timeStr = date
        .toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
        .replace(":", " : ")
      return `${dateStr} ${timeStr}`
    } catch {
      return dateString
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "text-yellow-600"
      case "APPROVED":
        return "text-green-600"
      case "REJECTED":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const partyTypes = ["victim", "witness", "suspect", "accomplice"]

  return (
    <div className="min-h-screen bg-white p-6 text-black font-sans">
      {/* Header */}
      <div className="flex justify-between mb-4 text-sm">
        <div>
          <p>
            ReportID: <span className="text-gray-800">{report.report_id}</span>
          </p>
          <p>
            Status:{" "}
            <span className={getStatusColor(report.status)}>
              {report.status}
            </span>
          </p>
        </div>
        <div>
          <p>
            Date:{" "}
            <span className="text-gray-800">
              {formatDate(report.reported_at)}
            </span>
          </p>
          <p>
            Time:{" "}
            <span className="text-gray-800">
              {new Date(report.reported_at)
                .toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
                .replace(":", " : ")}
            </span>
          </p>
        </div>
      </div>

      <hr className="mb-4 border-gray-300" />
      <h2 className="text-center text-lg font-semibold mb-6">REPORT DETAIL</h2>

      {/* MY INFORMATION */}
      <section className="mb-8">
        <h3 className="text-red-600 font-bold mb-4">MY INFORMATION</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Full name</p>
            <p className="min-h-[24px]">{report.reporter_fullname}</p>
          </div>
          <div>
            <p className="font-medium">Email</p>
            <p className="min-h-[24px]">{report.reporter_email}</p>
          </div>
          <div>
            <p className="font-medium">Relationship to the incident</p>
            <p className="min-h-[24px]">{report.relation_incident}</p>
          </div>
          <div>
            <p className="font-medium">Phone</p>
            <p className="min-h-[24px]">{report.reporter_phonenumber || "—"}</p>
          </div>
          <div className="col-span-2">
            <p className="font-medium">Address</p>
            <p className="min-h-[48px] whitespace-pre-wrap">{report.address}</p>
          </div>
        </div>
      </section>

      {/* INCIDENT INFORMATION */}
      <section className="mb-8">
        <h3 className="text-red-600 font-bold mb-4">INCIDENT INFORMATION</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Type of Crime</p>
            <p className="min-h-[24px]">{report.crime_type}</p>
          </div>
          <div>
            <p className="font-medium">Severity</p>
            <p className="min-h-[24px]">{report.severity}</p>
          </div>
          <div>
            <p className="font-medium">Datetime of occurrence</p>
            <p className="min-h-[24px]">
              {report.time_occurrence
                ? formatDateTime(report.time_occurrence)
                : "—"}
            </p>
          </div>
          <div>
            <p className="font-medium">State</p>
            <p className="min-h-[24px]">{report.case_location}</p>
          </div>
          <div>
            <p className="font-medium">Detailed address</p>
            <p className="min-h-[48px] whitespace-pre-wrap">{report.address}</p>
          </div>
          <div>
            <p className="font-medium">Description of the incident</p>
            <p className="min-h-[48px] whitespace-pre-wrap">
              {report.description}
            </p>
          </div>
        </div>
      </section>

      {/* RELEVANT INFORMATION */}
      <section className="mb-8">
        <h3 className="text-red-600 font-bold mb-2">RELEVANT INFORMATION</h3>
        <p className="text-blue-600 font-medium mb-4 cursor-pointer">
          I. Relevant Parties
        </p>

        {partyTypes.map((partyType, index) => {
          const parties =
            report.parties.filter((party) => party.party_type  === partyType) ||
            []

          return (
            <div key={index} className="mb-6">
              <p className="font-medium mb-2">{`${String.fromCharCode(65 + index)}/ ${partyType}`}</p>
              <div className="overflow-x-auto">
                <table className="w-full border text-sm">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-2 border w-20">ID</th>
                      <th className="p-2 border w-40">Full Name</th>
                      <th className="p-2 border w-24">Gender</th>
                      <th className="p-2 border w-32">Nationality</th>
                      <th className="p-2 border w-96">
                        Statement / Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {parties.length > 0 ? (
                      parties.map((party) => (
                        <tr key={party.parties_id}>
                          <td className="p-2 border w-20">
                            {formatUUID(party.parties_id)}
                          </td>
                          <td className="p-2 border w-40">{party.full_name}</td>
                          <td className="p-2 border w-24">{party.gender}</td>
                          <td className="p-2 border w-32">
                            {party.nationality}
                          </td>
                          <td className="p-2 border w-96 break-words whitespace-pre-line">
                            <div>
                              <p>{party.statement}</p>
                              {party.attachments_url &&
                                party.attachments_url.length > 0 && (
                                  <div className="mt-2">
                                    <p className="text-xs text-gray-500">
                                      Attachments:
                                    </p>
                                    {party.attachments_url.map(
                                      (file, fileIndex) => (
                                        <a
                                          key={fileIndex}
                                          href={file.file_url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-500 text-xs block"
                                        >
                                          {file.original_name}
                                        </a>
                                      )
                                    )}
                                  </div>
                                )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="p-2 border w-20">—</td>
                        <td className="p-2 border w-40">—</td>
                        <td className="p-2 border w-24">—</td>
                        <td className="p-2 border w-32">—</td>
                        <td className="p-2 border w-96">—</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )
        })}
      </section>

      {/* INITIAL EVIDENCE */}
      <section className="mb-16">
        <p className="text-blue-600 font-medium mb-2">II. Initial Evidence</p>
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Evidence Location</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Attachments</th>
              </tr>
            </thead>
            <tbody>
              {report.evidences && report.evidences.length > 0 ? (
                report.evidences.map((evidence) => (
                  <tr key={evidence.evidence_id}>
                    <td className="p-2 border">
                      {formatUUID(evidence.evidence_id)}
                    </td>
                    <td className="p-2 border">{evidence.type_evidence}</td>
                    <td className="p-2 border">
                      {evidence.current_location || "—"}
                    </td>
                    <td className="p-2 border">
                      {evidence.description || "—"}
                    </td>
                    <td className="p-2 border">
                      {evidence.attached_file &&
                        evidence.attached_file.length > 0
                        ? evidence.attached_file
                          .map((file) => file.original_name)
                          .join(", ")
                        : "—"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-2 border">—</td>
                  <td className="p-2 border">—</td>
                  <td className="p-2 border">—</td>
                  <td className="p-2 border">—</td>
                  <td className="p-2 border">—</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* File upload display */}
        {report.evidences &&
          report.evidences.some(
            (evidence) =>
              evidence.attached_file && evidence.attached_file.length > 0
          ) && (
            <>
              <p className="mt-4 font-medium text-sm text-gray-700">
                Uploaded:
              </p>
              <div className="flex gap-4 mt-2 flex-wrap">
                {report.evidences.map((evidence) =>
                  evidence.attached_file?.map((file, fileIndex) => (
                    <div
                      key={`${evidence.evidence_id}-${fileIndex}`}
                      className="bg-gray-100 p-4 rounded border w-56"
                    >
                      <p className="text-xs text-gray-500 mb-1 font-medium">
                        {file.original_name}
                      </p>
                      <p className="text-xs text-gray-400 mb-2">
                        Type: {file.resource_type}
                      </p>
                      <a
                        href={file.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 text-xs hover:text-blue-700 underline"
                      >
                        View File
                      </a>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
      </section>

      {/* Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#F6F7F8] border-t border-gray-300 px-6 py-4 flex justify-between">
        <button
          className="px-6 py-2 rounded shadow"
          style={{ backgroundColor: "var(--muted-foreground)", color: "white" }}
        >
          Print
        </button>
        <div className="space-x-4">
          <button
            className="px-6 py-2 rounded shadow"
            style={{ backgroundColor: "var(--destructive)", color: "white" }}
          >
            Decline
          </button>
          <button
            className="px-6 py-2 rounded shadow"
            style={{
              backgroundColor: "#1992FC",
              color: "white",
            }}
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReportDetailPage
