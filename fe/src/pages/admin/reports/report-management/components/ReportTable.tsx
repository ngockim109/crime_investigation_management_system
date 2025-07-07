import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Eye } from "lucide-react"
import { format } from "date-fns"
import { Link } from "react-router-dom"
import { getSeverityBadge, getStatusBadge } from "../helper"
import type { ApiResponse } from "@/types/api.interface"
import type { ReportsResponse } from "@/types/report.interface"
import { formatUUID } from "@/utils/id"

interface ReportTableProps {
  isLoading: boolean
  reportsData: ApiResponse<ReportsResponse> | undefined
}
const ReportTable = ({ isLoading, reportsData }: ReportTableProps) => {
  return (
    <Table className="bg-white rounded-md">
      <TableHeader>
        <TableRow className="bg-blue-200 border-blue-200 hover:bg-blue-200">
          <TableHead className="font-semibold rounded-tl-md text-center">
            #
          </TableHead>
          <TableHead className="font-semibold rounded-tl-md">
            Report ID
          </TableHead>
          <TableHead className="font-semibold">Type of Crime</TableHead>
          <TableHead className="font-semibold">Severity</TableHead>
          <TableHead className="font-semibold">Date</TableHead>
          <TableHead className="font-semibold">Reporter</TableHead>
          <TableHead className="font-semibold">Status</TableHead>
          <TableHead className="font-semibold rounded-tr-md">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8">
              Loading reports...
            </TableCell>
          </TableRow>
        ) : !reportsData ||
          !reportsData?.data ||
          reportsData?.data?.data?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8">
              No reports found
            </TableCell>
          </TableRow>
        ) : (
          reportsData?.data?.data?.map((report, index) => (
            <TableRow
              key={report.report_id}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-blue-50"
              } hover:bg-blue-100 border-0 rounded-md`}
            >
              <TableCell
                className={`py-3 text-center ${index === reportsData.data.data.length - 1 && "rounded-bl-md"}`}
              >
                {index + 1}
              </TableCell>
              <TableCell
                className={`py-3 ${index === reportsData.data.data.length - 1 && "rounded-bl-md"}`}
              >
                {formatUUID(report.report_id)}
              </TableCell>
              <TableCell className=" py-3">
                <span className="capitalize">
                  {report.crime_type.replace("-", " ")}
                </span>
              </TableCell>
              <TableCell className=" py-3">
                <Badge className={getSeverityBadge(report.severity)}>
                  <span className="capitalize">{report.severity}</span>
                </Badge>
              </TableCell>
              <TableCell className=" py-3">
                {format(new Date(report.reported_at), "dd/MM/yyyy")}
              </TableCell>
              <TableCell className=" py-3">
                <span className="capitalize">{report.reporter_fullname}</span>
              </TableCell>
              <TableCell className=" py-3">
                <Badge className={getStatusBadge(report.status)}>
                  <span className="capitalize">{report.status}</span>
                </Badge>
              </TableCell>
              <TableCell
                className={`py-3 ${index === reportsData.data.data.length - 1 && "rounded-br-md"}`}
              >
                <Link
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  to={`/admin/reports/${report.report_id}`}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View detail
                </Link>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}

export default ReportTable
