"use client"

import { useState } from "react"
import { LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { CaseData } from "@/types/case.interface"
import { CaseStatusType } from "@/enum/case.enum"
import { Outlet, useNavigate } from "react-router-dom"



const caseData: CaseData[] = [
  {
    caseId: "#20462",
    typeOfCrime: "Violent Crimes",
    levelOfSeverity: "3rd Degree Felony",
    date: "13/05/2022",
    receivingUnit: "Local PD - Investigation Division",
    location: "Austin, TX",
    status: CaseStatusType.NEW,
  },
  {
    caseId: "#20462",
    typeOfCrime: "Violent Crimes",
    levelOfSeverity: "3rd Degree Felony",
    date: "13/05/2022",
    receivingUnit: "Violent Crimes Unit (PD)",
    location: "Chicago, IL",
    status: CaseStatusType.DONE,
  },
  {
    caseId: "#20462",
    typeOfCrime: "Violent Crimes",
    levelOfSeverity: "3rd Degree Felony",
    date: "13/05/2022",
    receivingUnit: "Violent Crimes Unit (PD)",
    location: "Chicago, IL",
    status: CaseStatusType.PROCESSING_PHASE_2,
  },

]

const CaseListPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [entriesPerPage, setEntriesPerPage] = useState("10")
  const [currentPage, setCurrentPage] = useState(1)
  const navigateToCaseDetail = useNavigate()

  const getStatusBadge = (status: CaseData["status"]) => {
    switch (status) {
      case CaseStatusType.NEW:
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100/80 border-transparent">{status}</Badge>
      case CaseStatusType.PROCESSING_PHASE_2:
        return (
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100/80 border-transparent">{status}</Badge>
        )
      case CaseStatusType.DONE:
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100/80 border-transparent">{status}</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredData = caseData.filter((item) =>
    Object.values(item).some((value) => value.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Header */}
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

      {/* Main Content */}
      <div className="py-8 bg-[#E7EDF6]">
        <div className="px-7 py-3 bg-white inline-block rounded-t-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-1 inline-block">Preliminary Investigation</h2>
        </div>

        {/* Table Controls */}
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

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-900 text-center">Case ID</TableHead>
                <TableHead className="font-semibold text-gray-900 text-center">Type of Crime</TableHead>
                <TableHead className="font-semibold text-gray-900 text-center">Level of severity</TableHead>
                <TableHead className="font-semibold text-gray-900 text-center">Date</TableHead>
                <TableHead className="font-semibold text-gray-900 text-center">Receiving Unit</TableHead>
                <TableHead className="font-semibold text-gray-900 text-center">Location</TableHead>
                <TableHead className="font-semibold text-gray-900 text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={index} className="hover:bg-gray-50" onClick={() => navigateToCaseDetail(`/chief/cases/${item.caseId}`)}>
                  <TableCell className="font-medium text-center">{item.caseId}</TableCell>
                  <TableCell className="text-center">{item.typeOfCrime}</TableCell>
                  <TableCell className="text-center">{item.levelOfSeverity}</TableCell>
                  <TableCell className="text-center">{item.date}</TableCell>
                  <TableCell className="text-center">{item.receivingUnit}</TableCell>
                  <TableCell className="text-center">{item.location}</TableCell>
                  <TableCell className="text-center">{getStatusBadge(item.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex justify-center items-center gap-2">
              <Button variant="ghost" size="sm" disabled className="hover:bg-gray-100">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                1
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                2
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                3
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaseListPage