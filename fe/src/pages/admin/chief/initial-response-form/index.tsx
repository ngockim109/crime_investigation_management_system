import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Plus, ChevronDownIcon, CalendarIcon, Pencil, CirclePlus, ChevronsUpDown, Check } from "lucide-react"
import { formatUUID } from "@/utils/id"
import { useParams } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'
import { Navbar } from "./components/navbar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format, isValid, parse, set, startOfDay } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import PatrolOfficersList from "./components/patrol-officer-list"
import MedicalRescueSupport from "./components/medical-supports"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import ScenePreservationMeasures from "./components/scene-preservation-measures"
import { setInitialResponse } from "@/redux/reduxInitialResponse"

function formatDate(date: Date | undefined) {
    if (!date) {
        return ""
    }
    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}
function isValidDate(date: Date | undefined) {
    if (!date) {
        return false
    }
    return !isNaN(date.getTime())
}

export default function InitialResponseForm() {
    const [arrivalTime, setArrivalTime] = useState("09:32")
    const [arrivalPeriod, setArrivalPeriod] = useState("AM")
    const [assessment, setAssessment] = useState("")
    const { id } = useParams<{ id: string }>()
    console.log("Params:", id)

    const [openDatePicker, setOpenDatePicker] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [month, setMonth] = useState<Date | undefined>(date)
    const [valueDate, setValueDate] = useState(formatDate(date))

    const dispath = useDispatch()
    // const patrolOfficers = useSelector((state: RootState) => state.initialResponse.patrol_officers)
    const preservationMeasures = useSelector((state: RootState) => state.initialResponse.preservation_measures)
    const medicalSupports = useSelector((state: RootState) => state.initialResponse.medical_supports)
    const caseId = id

    const handleSave = () => {
        if (!isValidDate(date)) {
            alert("Please select a valid date.")
            return
        }

        // date is checked above, so it's safe to cast
        const formattedDate = format(date as Date, "yyyy-MM-dd")
        const formattedTime = `${arrivalTime} ${arrivalPeriod}`

        const initialResponseData = {
            dispatching_time: formattedDate,
            arrival_time: formattedTime,
            preliminary_assessment: assessment,
            // patrol_officers: patrolOfficers,
            preservation_measures: preservationMeasures,
            medical_supports: medicalSupports,
            case_id: caseId,
        }

        console.log("Initial Response Data:", initialResponseData)

        // Dispatch the action to save the data
        dispath(setInitialResponse(initialResponseData))
    }

    return (
        <div className="flex h-screen w-full">
            <Navbar />
            {/* Main Content */}
            <div className="flex-1 p-6 space-y-6 overflow-auto">
                <h2 className="text-xl font-bold bg-blue-100 p-3 rounded text-center">INITIAL RESPONSE</h2>

                {/* Dispatch Time */}
                <Card>
                    <CardContent className="flex justify-between items-center">
                        <label className="block font-semibold ">TIME OF DISPATCHING FORCES TO THE SCENE</label>
                        <div className="flex flex-col ">
                            <Popover open={openDatePicker} onOpenChange={setOpenDatePicker}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        id="date"
                                        className="w-28 justify-between font-medium bg-blue-100"
                                    >
                                        {date ? date.toLocaleDateString() : "Choose"}
                                        <CalendarIcon className="size-3.5" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        captionLayout="dropdown"
                                        month={month}
                                        today={new Date()}
                                        onMonthChange={setMonth}
                                        onSelect={(date) => {
                                            setDate(date)
                                            setValueDate(formatDate(date))
                                            setOpenDatePicker(false)
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </CardContent>
                </Card>

                {/* Arrival Time */}
                <Card>
                    <CardContent className="flex items-center justify-between">
                        <label className="block font-semibold mb-2">TIME OF ARRIVAL AT THE SCENE</label>
                        <div className="flex items-center gap-2">
                            <Input
                                type="time"
                                value={arrivalTime}
                                onChange={(e) => setArrivalTime(e.target.value)}
                                className="w-32  bg-blue-100"
                            />
                            <div className="flex border rounded-md overflow-hidden bg-blue-100 p-1">
                                <button
                                    className={`px-2 py-1 rounded-sm text-sm ${arrivalPeriod === "AM" ? "bg-white" : "bg-blue-100"}`}
                                    onClick={() => setArrivalPeriod("AM")}
                                >
                                    AM
                                </button>
                                <button
                                    className={`px-2 py-1 rounded-sm text-sm ${arrivalPeriod === "PM" ? "bg-white" : "bg-blue-100"}`}
                                    onClick={() => setArrivalPeriod("PM")}
                                >
                                    PM
                                </button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <PatrolOfficersList />

                {/* Assessment */}
                <Card>
                    <CardContent >
                        <label className="block font-semibold mb-2">PRELIMINARY ASSESSMENT OF THE SCENE SITUATION</label>
                        <Textarea className="w-full" value={assessment} onChange={(e) => setAssessment(e.target.value)} />
                    </CardContent>
                </Card >

                {/* Scene Preservation */}
                <ScenePreservationMeasures />

                {/* Medical Support */}
                <MedicalRescueSupport />

                <div className="flex justify-between items-center mt-6">
                    <Button variant="ghost" className="border rounded-sm">Cancel</Button>
                    <div className="flex gap-2">
                        <Button variant="outline" className="bg-blue-100" onClick={handleSave}>Save</Button>
                        <Button className="bg-gray-500">Next page</Button>
                    </div>

                </div>
            </div >
        </div >
    )
}
