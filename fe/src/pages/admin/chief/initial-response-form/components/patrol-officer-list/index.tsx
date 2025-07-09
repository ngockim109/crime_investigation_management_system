import Pagination from '@/components/pagination'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatUUID } from '@/utils/id'
import { set } from 'date-fns'
import { ChevronsUpDown, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const index = () => {
    const [showOfficerDialog, setShowOfficerDialog] = useState(false)
    const [selectedOfficers, setSelectedOfficers] = useState<string[]>([])
    const [openCmbOfficerStatus, setOpenCmbOfficerStatus] = useState(false)
    const [valueOfficerStatus, setValueOfficerStatus] = useState("")
    const [openCmbZone, setOpenCmbZone] = useState(false)
    const [valueZone, setValueZone] = useState("")


    const [officers, setOfficers] = useState([
        { id: formatUUID(uuidv4()), name: "Brandie", role: "Patrol Officer", phone: "(225) 555-0118" },
        { id: formatUUID(uuidv4()), name: "Brandie", role: "Patrol Officer", phone: "(225) 555-0118" },
        { id: formatUUID(uuidv4()), name: "John", role: "Detective", phone: "(225) 555-0118" },
    ])


    const patrolOfficers = [
        { id: formatUUID(uuidv4()), name: "Alice", status: "Idle", role: "Patrol Officer", phone: "(225) 555-0120", zone: "Zone 1" },
        { id: formatUUID(uuidv4()), name: "Bob", status: "On Above Case", role: "Patrol Officer", phone: "(225) 555-0121", zone: "Zone 2" },
        { id: formatUUID(uuidv4()), name: "Charlie", status: "Available", role: "Detective", phone: "(225) 555-0122", zone: "Zone 3" },
    ]
    const handleAddOfficer = () => {
        const newOfficers = patrolOfficers
            .filter((patrolOfficer) => selectedOfficers.includes(patrolOfficer.id))
            .map((patrolOfficer) => ({
                id: formatUUID(uuidv4()),
                name: patrolOfficer.name,
                role: patrolOfficer.role,
                phone: patrolOfficer.phone,
            }))
        setOfficers([...officers, ...newOfficers])
        setSelectedOfficers([])
        setShowOfficerDialog(false)
    }

    const handleDeleteOfficer = (id: string) => {
        setOfficers(officers.filter(officer => officer.id !== id))
    }



    // const [filters, setFilters] = useState<patrolOfficerFilter>({
    //     page: 1,
    //     limit: 10,
    //     status: "",
    //     crime_type: "",
    //     severity: "",
    //     created_from: "",
    //     created_to: "",
    // })

    // const {
    //     data: reportsData,
    //     isLoading,
    //     refetch,
    // } = useQuery({
    //     queryKey: ["reports", filters],
    //     queryFn: () => reportsApi.getAllReports(cleanFilters(filters)),
    // })

    // const handleFilterChange = (key: keyof ReportFilters, value: unknown) => {
    //     setFilters((prev) => ({
    //         ...prev,
    //         [key]: value,
    //     }))

    //     setTimeout(() => refetch(), 100)
    // }

    // State for search
    const [searchTerm, setSearchTerm] = useState("");

    // Filtered officers based on search, status, and zone
    const filteredPatrolOfficers = patrolOfficers.filter((officer) => {
        const matchesSearch = officer.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = valueOfficerStatus ? officer.status === valueOfficerStatus : true;
        const matchesZone = valueZone ? officer.zone === valueZone : true;
        return matchesSearch && matchesStatus && matchesZone;
    });

    return (
        <Card>
            <CardContent>
                <div className="flex justify-between items-center mb-2">
                    <label className="font-semibold">LIST OF OFFICERS ASSIGNED TO THE SCENE</label>
                    <Dialog open={showOfficerDialog} onOpenChange={setShowOfficerDialog}>

                        <DialogTrigger asChild>
                            <Button className="bg-blue-100 p-4" variant="outline" size="sm">VIEW</Button>
                        </DialogTrigger>
                        <DialogContent className="min-w-[70%] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold bg-blue-100 p-3 rounded text-center">ADD PATROL OFFICER TO SCENE</DialogTitle>
                            </DialogHeader>
                            <div>
                                <Input
                                    type="text"
                                    placeholder="Search officers..."
                                    className="w-full mb-4"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <div className='flex items-center gap-2 '>
                                    <Popover open={openCmbOfficerStatus} onOpenChange={setOpenCmbOfficerStatus}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={openCmbOfficerStatus}
                                                className="w-45 justify-between"
                                            >
                                                {valueOfficerStatus
                                                    ? patrolOfficers.find((patrolOfficer) => patrolOfficer.status === valueOfficerStatus)?.status
                                                    : "Present Status"}
                                                <ChevronsUpDown className="opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-45 p-0">
                                            <Command>
                                                <CommandList>
                                                    <CommandGroup>
                                                        <CommandItem
                                                            key="all"
                                                            value="all"
                                                            onSelect={() => {
                                                                setValueOfficerStatus("");
                                                                setOpenCmbOfficerStatus(false);
                                                            }}
                                                        >
                                                            <Checkbox
                                                                checked={valueOfficerStatus === ""}
                                                                className="mr-2"
                                                            />
                                                            All
                                                        </CommandItem>
                                                        {[...new Set(patrolOfficers.map((patrolOfficer) => patrolOfficer.status))].map((status) => (
                                                            <CommandItem
                                                                key={status}
                                                                value={status}
                                                                onSelect={(currentValue) => {
                                                                    setValueOfficerStatus(currentValue === valueOfficerStatus ? "" : currentValue);
                                                                    setOpenCmbOfficerStatus(false);
                                                                }}
                                                            >
                                                                <Checkbox
                                                                    checked={valueOfficerStatus === status}
                                                                    className="mr-2"
                                                                />
                                                                {status}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <Popover open={openCmbZone} onOpenChange={setOpenCmbZone}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={openCmbZone}
                                                className="w-35 justify-between"
                                            >
                                                {valueZone
                                                    ? patrolOfficers.find((patrolOfficer) => patrolOfficer.zone === valueZone)?.zone
                                                    : "Zone"}
                                                <ChevronsUpDown className="opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-35 p-0">
                                            <Command>
                                                <CommandList>
                                                    <CommandGroup>
                                                        <CommandItem
                                                            key="all"
                                                            value="all"
                                                            onSelect={() => {
                                                                setValueZone("");
                                                                setOpenCmbZone(false);
                                                            }}
                                                        >
                                                            <Checkbox
                                                                checked={valueZone === ""}
                                                                className="mr-2"
                                                            />
                                                            All
                                                        </CommandItem>
                                                        {[...new Set(patrolOfficers.map((patrolOfficer) => patrolOfficer.zone))].map((zone) => (
                                                            <CommandItem
                                                                key={zone}
                                                                value={zone}
                                                                onSelect={(currentValue) => {
                                                                    setValueZone(currentValue === valueZone ? "" : currentValue)
                                                                    setOpenCmbZone(false)
                                                                }}
                                                            >
                                                                <Checkbox
                                                                    checked={valueZone === zone}
                                                                    className="mr-2"
                                                                />
                                                                {zone}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    onClick={handleAddOfficer}
                                    className="bg-blue-500 text-white hover:bg-blue-700 w-50"
                                    disabled={selectedOfficers.length === 0}
                                >
                                    Add Selected Officers
                                </Button>
                            </div>
                            <Table className="w-full text-sm border">
                                <TableHeader>
                                    <TableRow className="bg-gray-100">

                                        <TableHead className="p-2 border">Serial</TableHead>
                                        <TableHead className="p-2 border text-center">Select</TableHead>
                                        <TableHead className="p-2 border">Full Name</TableHead>
                                        <TableHead className="p-2 border">Present Status</TableHead>
                                        <TableHead className="p-2 border">Role</TableHead>
                                        <TableHead className="p-2 border">Phone Number</TableHead>
                                        <TableHead className="p-2 border">Zone</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {patrolOfficers.map((officer) => (
                                        <TableRow key={officer.id}>
                                            <TableCell className="p-2 border">{officer.id}</TableCell>
                                            <TableCell className="p-2 border text-center">
                                                <Checkbox
                                                    checked={selectedOfficers.includes(officer.id)}
                                                    onCheckedChange={(checked) => {
                                                        setSelectedOfficers((prev) =>
                                                            checked
                                                                ? [...prev, officer.id]
                                                                : prev.filter((id) => id !== officer.id)
                                                        )
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell className="p-2 border">{officer.name}</TableCell>
                                            <TableCell className="p-2 border">
                                                <Badge
                                                    className={
                                                        officer.status === "On Above Case"
                                                            ? "bg-red-400 text-white"
                                                            : officer.status === "Idle"
                                                                ? "bg-blue-500 text-white"
                                                                : "bg-green-500 text-white"
                                                    }
                                                >
                                                    {officer.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="p-2 border">{officer.role}</TableCell>
                                            <TableCell className="p-2 border">{officer.phone}</TableCell>
                                            <TableCell className="p-2 border">{officer.zone}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="mt-auto">
                                {filteredPatrolOfficers.length > 10 && (
                                    <Pagination
                                        page={1}
                                        limit={10}
                                        total={filteredPatrolOfficers.length}
                                        totalPages={Math.ceil(filteredPatrolOfficers.length / 10)}
                                        handleFilterChange={() => { }}
                                    />
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                <Table className="w-full text-sm border ">
                    <TableHeader>
                        <TableRow className="bg-gray-100 border-none ">
                            <TableHead className="p-4">Full Name</TableHead>
                            <TableHead className="p-4">Role</TableHead>
                            <TableHead className="p-4">Phone Number</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {officers.map((officer) => (
                            <TableRow key={officer.id} className="border-none">
                                <TableCell className="p-4 space-x-2">
                                    {officer.name}
                                </TableCell>
                                <TableCell className="p-4 space-x-2">
                                    {officer.role}
                                </TableCell>
                                <TableCell className="p-4 space-x-2">
                                    {officer.phone}
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent >
        </Card >
    )
}

export default index
