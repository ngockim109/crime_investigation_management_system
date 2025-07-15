import { useEffect, useState } from "react"
import { LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { Case, CaseFilters } from "@/types/case.interface"
import { CaseStatusType } from "@/enum/case.enum"
import { useNavigate } from "react-router-dom"
import { casesApi } from "@/api/case"
import { cleanFilters } from "@/utils/case"
import { formatUUID } from "@/utils/id"
import Access from "../../not-permitted/access"
import { ALL_PERMISSIONS } from "../../not-permitted/permissions"
import { useAppSelector } from "@/redux/hook"
import { caseUserApi } from "@/api/case-user"



const CaseListPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [entriesPerPage, setEntriesPerPage] = useState("10")
  const [data, setData] = useState<Case[]>([]);
  const [filters, setFilters] = useState<CaseFilters>({
    search: "",
    status: undefined,
    crime_type: "",
    severity: "",
    from_date: "",
    to_date: "",
    page: 1,
    limit: 10,
  })

  const role = useAppSelector(state => state.account.user.role.description);
  console.log(role)
  const navigateToCaseDetail = useNavigate()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case CaseStatusType.NEW:
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100/80 border-transparent">{status}</Badge>
      case CaseStatusType.PROCESSING_PHASE_2:
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100/80 border-transparent">{status}</Badge>
      case CaseStatusType.DONE:
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100/80 border-transparent">{status}</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }
  useEffect(() => {
  getAllCases();
}, [filters, role]);

  const getAllCases = async () => {
    try {
      let formattedData = [];
      if (role === 'police_chief') {
      const res = await casesApi.getAllCases(cleanFilters(filters));
      formattedData = res.data?.data || [];
      } else {
      const res = await caseUserApi.getUsersByUserId();
      console.log(res.data)
      formattedData = (res.data);
      }
      setData(formattedData)
    } catch (error) {
      console.error("Failed to fetch cases:", error);
    }
  };

  return (
    <Access permission={[ALL_PERMISSIONS.CASES.GET, ALL_PERMISSIONS.CASE_USER.GET]}>
    <div className="min-h-screen w-full bg-gray-50">
      <div className="bg-[#E7EDF6] pl-6 py-4">
        <div className="flex justify-between items-center">
          <div></div>
          <div className="flex items-center bg-gray-300 py-3 pl-5 pr-10 gap-10">
            <div className="text-right">
              <div className="font-semibold text-gray-900">MATTHA, JOHN</div>
              <div className="text-sm text-left text-gray-600">Sheriff</div>
            </div>
            <LogOut className="size-8" />
          </div>
        </div>
      </div>

      <div className="py-8 bg-[#E7EDF6]">
        <div className="px-7 py-3 bg-white inline-block rounded-t-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-1 inline-block">Preliminary Investigation</h2>
        </div>

        <div className="bg-white shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex gap-3 items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Show</span>
                <div className="relative">
                  <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
                    <SelectTrigger className="w-20 h-10 bg-gray-300 border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <span className="text-sm text-gray-700">entries</span>
              </div>
              <div className="flex-6/12">
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border-gray-300 focus-visible:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-900 text-center">Case ID</TableHead>
                <TableHead className="font-semibold text-gray-900 text-center">Type of Crime</TableHead>
                <TableHead className="font-semibold text-gray-900 text-center">Level of severity</TableHead>
                <TableHead className="font-semibold text-gray-900 text-center">Date</TableHead>
                <TableHead className="font-semibold text-gray-900 text-center">Reporter</TableHead>
                <TableHead className="font-semibold text-gray-900 text-center">Location</TableHead>
                <TableHead className="font-semibold text-gray-900 text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
<TableBody>
  {data.map((item) => (
    <TableRow
      key={item.case_id}
      className="hover:bg-gray-50 cursor-pointer"
      onClick={() =>
        navigateToCaseDetail(
          `/admin/cases/${item.case_id}/response-information/response-management`
        )
      }
    >
      <TableCell className="text-center font-medium">
        {formatUUID(item.case_id)}
      </TableCell>
      <TableCell className="text-center">{item.crime_type}</TableCell>
      <TableCell className="text-center">{item.severity}</TableCell>
      <TableCell className="text-center">{item.time_occurrence}</TableCell>
      <TableCell className="text-center">
        {item.reports?.map((report) => report.reporter_fullname).join(", ") ?? "-"}
      </TableCell>
      <TableCell className="text-center">{item.case_location}</TableCell>
      <TableCell className="text-center">
        {getStatusBadge(item.case_status)}
      </TableCell>
    </TableRow>
  ))}
</TableBody>

          </Table>

          <div className="mt-auto">
            {/* Pagination */}
            {/* {casesData && casesData?.data.totalPages > 1 && (
              <Pagination
                handleFilterChange={handleFilterChange}
                limit={casesData?.data?.limit}
                page={casesData?.data?.page}
                total={casesData?.data?.total}
                totalPages={casesData?.data?.totalPages}
              />
            )} */}
          </div>
        </div>
      </div>
    </div>
    </Access>
  )
}

export default CaseListPage
