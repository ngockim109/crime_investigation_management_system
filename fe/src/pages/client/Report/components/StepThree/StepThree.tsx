import { Fragment, useState } from "react"
import step_three from "@/assets/images/step_three.png"
import { Eye } from "lucide-react"
import ReportDetail from "../ReportDeilPage/ReportDetail"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { reportsApi } from "@/api/reports"
import { useQuery } from "@tanstack/react-query"
import { formatUUID } from "@/utils/id"
import { formatDate } from "@/utils/date"
import type { ReportFilters } from "@/types/report.interface"

const StepThree = (p: { nextStep(n: number): void; cur: number }) => {
  const email = useSelector(
    (state: RootState) => state.report.data.reporter_email
  )
  const [id, setId] = useState("")
  const filters: ReportFilters = {
    page: 1,
    limit: 10,
    email: email ?? "",
  }
  const { isPending, error, data } = useQuery({
    queryKey: [email, p.cur],
    queryFn: () => reportsApi.getAllReports(filters),
    staleTime: 10000,
    enabled: p.cur == 3,
  })
  const [open, setOpen] = useState(false)

  if (p.cur != 3) return <></>
  if (isPending) return "Loading..."

  if (error) return "An error has occurred: " + error.message

  const tableReport = data.data.map((v) => {
    return (
      <tr className="text-center">
        <td> {formatUUID(v.report_id)}</td>
        <td>{email}</td>
        <td>{formatDate(v.reported_at).Date}</td>
        <td>{formatDate(v.reported_at).Time}</td>
        <td className="p-3">
          <p className="w-full py-2 px-3 rounded-4xl bg-[#FFEDD9]">
            {v.status}
          </p>
        </td>
        <td>
          <button
            onClick={() => {
              setOpen(true)
              setId(v.report_id)
            }}
            className="cursor-pointer"
          >
            <Eye />
          </button>
        </td>
      </tr>
    )
  })
  return (
    <Fragment>
      <div className={p.cur == 3 ? " pt-11 " : "hidden"}>
        <div className="w-max mx-auto ">
          <img src={step_three} className="w-30 h-auto" alt="" srcSet="" />
        </div>
        <p className="text-center mt-3 text-[14px]">
          Your report will be reviewed within 5–10 working days. <br />
          Please check the status regularly for updates. <br />
          Thank you for your submission.
        </p>
        <div className="mt-10 overflow-x-auto">
          <table className="w-250  mx-auto">
            <thead className="table-auto ">
              <tr className="bg-[#EEEEEE]">
                <th className="p-4"> ReportID</th>
                <th className="p-4">Provider</th>
                <th className="p-4">Date</th>
                <th className="p-4">Time</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>{tableReport}</tbody>
          </table>
        </div>
      </div>
      {open ? (
        <>
          <div
            onClick={() => {
              setOpen(false)
            }}
            className="fixed top-0 left-0 w-screen h-screen bg-[#00000039] z-50"
          ></div>
          <div className="fixed overflow-y-auto h-screen top-0 left-1/2 -translate-x-1/2 z-60">
            <ReportDetail id={id} />
          </div>
        </>
      ) : (
        <></>
      )}
    </Fragment>
  )
}

export default StepThree
