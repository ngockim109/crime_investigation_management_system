"use client"

import { useState } from "react"
import { LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./Component/Button"
import { Input } from "./Component/Input"
import { Select } from "./Component/Select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./Component/Table"
import { Badge } from "./Component/Badge"

interface CaseData {
  caseId: string
  typeOfCrime: string
  levelOfSeverity: string
  date: string
  receivingUnit: string
  location: string
  status: "Under Investigation" | "Awaiting Prosecution" | "Closed"
}

const caseData: CaseData[] = [
  {
    caseId: "#20462",
    typeOfCrime: "Violent Crimes",
    levelOfSeverity: "3rd Degree Felony",
    date: "13/05/2022",
    receivingUnit: "Local PD - Investigation Division",
    location: "Austin, TX",
    status: "Under Investigation",
  },
  {
    caseId: "#20462",
    typeOfCrime: "Violent Crimes",
    levelOfSeverity: "3rd Degree Felony",
    date: "13/05/2022",
    receivingUnit: "Violent Crimes Unit (PD)",
    location: "Chicago, IL",
    status: "Under Investigation",
  },
  {
    caseId: "#18933",
    typeOfCrime: "Property Crimes",
    levelOfSeverity: "Misdemeanor",
    date: "22/05/2022",
    receivingUnit: "Local PD - Investigation Division",
    location: "New York, NY",
    status: "Under Investigation",
  },
  {
    caseId: "#43169",
    typeOfCrime: "Drug Offenses",
    levelOfSeverity: "3rd Degree Felony",
    date: "15/06/2022",
    receivingUnit: "ATF",
    location: "San Francisco, CA",
    status: "Awaiting Prosecution",
  },
  {
    caseId: "#34304",
    typeOfCrime: "Cybercrimes",
    levelOfSeverity: "2nd Degree Felony",
    date: "06/09/2022",
    receivingUnit: "State Bureau of Investigation (SBI)",
    location: "Chicago, IL",
    status: "Awaiting Prosecution",
  },
  {
    caseId: "#17188",
    typeOfCrime: "Drug Offenses",
    levelOfSeverity: "Misdemeanor",
    date: "25/09/2022",
    receivingUnit: "ATF",
    location: "Seattle, WA",
    status: "Closed",
  },
  {
    caseId: "#73003",
    typeOfCrime: "Property Crimes",
    levelOfSeverity: "Misdemeanor",
    date: "04/10/2022",
    receivingUnit: "Local PD - Investigation Division",
    location: "Seattle, WA",
    status: "Under Investigation",
  },
  {
    caseId: "#58825",
    typeOfCrime: "White-Collar Crimes",
    levelOfSeverity: "2nd Degree Felony",
    date: "17/10/2022",
    receivingUnit: "Economic Crimes Division (PD)",
    location: "New York, NY",
    status: "Under Investigation",
  },
  {
    caseId: "#89094",
    typeOfCrime: "Public Order Crimes",
    levelOfSeverity: "Misdemeanor",
    date: "01/11/2022",
    receivingUnit: "Local PD - Investigation Division",
    location: "Seattle, WA",
    status: "Closed",
  },
  {
    caseId: "#85252",
    typeOfCrime: "Property Crimes",
    levelOfSeverity: "3rd Degree Felony",
    date: "22/11/2022",
    receivingUnit: "Local PD - Investigation Division",
    location: "Chicago, IL",
    status: "Awaiting Prosecution",
  },
]

const entriesOptions = [
  { value: "10", label: "10" },
  { value: "25", label: "25" },
  { value: "50", label: "50" },
]

const CaseListPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [entriesPerPage, setEntriesPerPage] = useState("10")
  const [currentPage, setCurrentPage] = useState(1)

  const getStatusBadge = (status: CaseData["status"]) => {
    switch (status) {
      case "Under Investigation":
        return <Badge variant="success">{status}</Badge>
      case "Awaiting Prosecution":
        return <Badge variant="warning">{status}</Badge>
      case "Closed":
        return <Badge variant="destructive">{status}</Badge>
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
            {/* <Button variant="ghost" size="icon">
              <LogOut className="h-4 w-4" />
            </Button> */}
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
        <div className="bg-white shadow-sm ">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex gap-3 items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Show</span>
                <Select
                  options={entriesOptions}
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(e.target.value)}
                  className="w-20"
                />
                <span className="text-sm text-gray-700">entries</span>
              </div>
              <div className="flex-6/12">
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-900">Case ID</TableHead>
                <TableHead className="font-semibold text-gray-900">Type of Crime</TableHead>
                <TableHead className="font-semibold text-gray-900">Level of severity</TableHead>
                <TableHead className="font-semibold text-gray-900">Date</TableHead>
                <TableHead className="font-semibold text-gray-900">Receiving Unit</TableHead>
                <TableHead className="font-semibold text-gray-900">Location</TableHead>
                <TableHead className="font-semibold text-gray-900">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{item.caseId}</TableCell>
                  <TableCell>{item.typeOfCrime}</TableCell>
                  <TableCell>{item.levelOfSeverity}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.receivingUnit}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex justify-center items-center gap-2">
              <Button variant="ghost" size="sm" disabled>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button variant="default" size="sm">
                1
              </Button>
              <Button variant="ghost" size="sm">
                2
              </Button>
              <Button variant="ghost" size="sm">
                3
              </Button>
              <Button variant="ghost" size="sm">
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