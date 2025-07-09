import { useMemo, useState } from 'react'
import { CirclePlus, Pencil, Trash2, UploadCloud } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { formatUUID } from '@/utils/id'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import Attachments from '@/pages/client/report/components/Attachments'

const MedicalRescueSupport = () => {
    const [unitId, setUnitId] = useState('EMS45')
    const [supportType, setSupportType] = useState('MEDICAL EMERGENCY')
    const [personnel, setPersonnel] = useState('JOHN, JOHNSON')
    const [location, setLocation] = useState('JOHN, JOHNSON')
    const [arrivalTime, setArrivalTime] = useState('09:32')
    const [arrivalPeriod, setArrivalPeriod] = useState<'AM' | 'PM'>('AM')
    const [notes, setNotes] = useState('NO HAND, OUT OF BLOOD,………')
    const [file, setFile] = useState<File | null>(null)
    const [showDialog, setShowDialog] = useState(true)

    const [supports, setSupports] = useState([
        { id: formatUUID(uuidv4()), unit: 'EMS45', type: 'Medical Emergency', time: '08:00 PM' },
        { id: formatUUID(uuidv4()), unit: 'RES-Q12', type: 'Patrol Officer', time: '08:00 PM' },
        { id: formatUUID(uuidv4()), unit: 'RES-Q12', type: 'Detective', time: '08:00 PM' },
    ])

    const data = {
        attached_file: [],
    }

    const handleUpload = () => {
        console.log('Uploading file:', file)
    }

    const handleAddSupport = () => {
        const formattedTime = `${arrivalTime} ${arrivalPeriod}`
        const newSupport = { id: formatUUID(uuidv4()), unit: unitId, type: supportType, time: formattedTime }
        setSupports((prev) => [...prev, newSupport])
        setShowDialog(false)
    }

    const handleDeleteSupport = (id: string) => {
        setSupports((prev) => prev.filter((s) => s.id !== id))
    }

    const renderMedicalSupportTable = useMemo(
        () =>
            supports.map((unit) => (
                <TableRow key={unit.id} className="border-none">
                    <TableCell className="py-2 px-4">{unit.unit}</TableCell>
                    <TableCell className="py-2 px-4">{unit.type}</TableCell>
                    <TableCell className="py-2 px-4">{unit.time}</TableCell>
                    <TableCell className="py-2 px-2 flex gap-2">
                        <Button size="icon" variant="ghost">
                            <Pencil size={14} />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDeleteSupport(unit.id)}>
                            <Trash2 size={14} />
                        </Button>
                    </TableCell>
                </TableRow>
            )),
        [supports]
    )

    function setUrl(arg0: string) {
        throw new Error('Function not implemented.')
    }

    return (
        <Card>
            <CardContent className="space-y-6 py-6">
                <div className="flex justify-between items-center mb-2">
                    <label className="font-semibold">INFORMATION ON MEDICAL/RESCUE SUPPORT PROVIDED</label>
                    <Dialog open={showDialog} onOpenChange={setShowDialog}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="bg-blue-100 p-2">
                                <CirclePlus className="mr-2" /> ADD
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="min-w-[50%] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold text-center bg-blue-100 p-3 rounded">
                                    MEDICAL/RESCUE SUPPORT
                                </DialogTitle>
                            </DialogHeader>

                            <div className="space-y-4">
                                <div className='flex flex-col gap-4'>
                                    <label className="font-medium">Medical/Rescue Unit ID</label>
                                    <Input value={unitId} onChange={(e) => setUnitId(e.target.value)} />
                                </div>

                                <div className="flex flex-col gap-4">
                                    <label className="font-medium">Type of Support Provided</label>
                                    <Input value={supportType} onChange={(e) => setSupportType(e.target.value)} />
                                </div>

                                <div className="flex  justify-between ">
                                    <div className='flex flex-col gap-2'>
                                        <label className="font-medium">Personnel Assigned</label>
                                        <Input className='w-100' value={personnel} onChange={(e) => setPersonnel(e.target.value)} />
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <label className="font-medium">Time of Arrival</label>
                                        <div className="flex gap-4 items-center bg-blue-100">
                                            <Input type="time" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} className="w-[100%]" />
                                            {/* <div className="flex border rounded overflow-hidden bg-blue-100 p-1">
                                                {['AM', 'PM'].map((period) => (
                                                    <button
                                                        key={period}
                                                        className={`px-3 py-1 text-sm rounded-sm ${arrivalPeriod === period ? 'bg-white font-bold' : ''}`}
                                                        onClick={() => setArrivalPeriod(period as 'AM' | 'PM')}
                                                    >
                                                        {period}
                                                    </button>
                                                ))}
                                            </div> */}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <label className="font-medium">Location Assigned</label>
                                    <Input value={location} onChange={(e) => setLocation(e.target.value)} />
                                </div>

                                <div className="flex flex-col gap-4">
                                    <label className="font-medium">Remarks/Notes</label>
                                    <Textarea className='w-full' value={notes} onChange={(e) => setNotes(e.target.value)} />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label className="font-medium">Scene Sketch</label>
                                        <Button variant="outline" onClick={handleUpload} className="flex items-center gap-2">
                                            <UploadCloud size={16} /> Upload
                                        </Button>
                                    </div>
                                    <div className="h-1/2 border border-dashed rounded-lg p-6 bg-gray-100 text-center">
                                        <p>
                                            Drag & drop files or <span className="text-blue-600 underline cursor-pointer">Browse</span>
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
                                        </p>
                                        <input
                                            onChange={(v) => {
                                                let files = v.currentTarget.files
                                                if (files) {
                                                    let file = files[0]
                                                    setFile(file)
                                                    // const url = URL.createObjectURL(file)
                                                }
                                            }}
                                            type="file"
                                            className="hidden"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button onClick={handleAddSupport} className="bg-blue-100">Save</Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                <Table className="w-full text-sm border">
                    <TableHeader>
                        <TableRow className="bg-gray-100 border-none">
                            <TableHead className="p-4">Medical/Rescue Unit ID</TableHead>
                            <TableHead className="p-4">Type of Support Provided</TableHead>
                            <TableHead className="p-4">Time of Arrival</TableHead>
                            <TableHead className="p-4">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>{renderMedicalSupportTable}</TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default MedicalRescueSupport
