import { useCallback, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
    CirclePlus,
    Pencil,
    Trash2,
    UploadCloud,
} from 'lucide-react'

import { formatUUID } from '@/utils/id'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

interface Measure {
    id: string
    description: string
}

interface FormValues {
    officer: string
    startTime: string
    endTime: string
    methods: string
    area: string
    notes: string
}

const ScenePreservationMeasures = () => {
    const [showDialog, setShowDialog] = useState(false)

    const [measures, setMeasures] = useState([
        {
            id: formatUUID(uuidv4()),
            description: 'Immediate perimeter established using police tape (approx. 30-meter radius)',
        },
        {
            id: formatUUID(uuidv4()),
            description: 'Vehicle stabilized to prevent further movement.',
        },
        {
            id: formatUUID(uuidv4()),
            description: 'Photographic documentation of the scene commenced at 22:26.',
        },
    ])

    const [officer, setOfficer] = useState('Official John Doe')
    const [startTime, setStartTime] = useState('09:32')
    const [endTime, setEndTime] = useState('09:32')
    const [methods, setMethods] = useState('Barricades, Police Tape, Restricted Access, Sealing evidence')
    const [area, setArea] = useState('Security around the house and pedestrian walkway in front of the house')
    const [notes, setNotes] = useState(
        'Due to the steep terrain, additional obstacles should be built on the east side. There are residents nearby so people should be assigned to guard 24/7.'
    )
    const [editingMeasureId, setEditingMeasureId] = useState<string | null>(null)
    const [measureInput, setMeasureInput] = useState('')
    // Handlers
    const handleAddMeasure = useCallback(() => {
        setEditingMeasureId(null)
        setMeasureInput('')
        setShowDialog(true)
    }, [])

    const handleEditMeasure = useCallback((measure: Measure) => {
        setEditingMeasureId(measure.id)
        setMeasureInput(measure.description)
        setShowDialog(true)
    }, [])

    const handleDeleteMeasure = (id: string) => {
        setMeasures(measures.filter((m) => m.id !== id))
    }

    const handleSave = () => {
        // TODO: Save data to backend or global state
        console.log('Saving data...')
        setShowDialog(false)
    }

    const handleCancel = () => {
        // TODO: Reset state or close modal
        setShowDialog(false)
    }

    const renderMeasureTable = useMemo(() => {
        return measures.map((measure, index) => (
            <TableRow key={measure.id}>
                <TableCell className="py-2 px-4">{index + 1}</TableCell>
                <TableCell className="py-2 px-4">{measure.description}</TableCell>
                <TableCell className="py-2 px-4 flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => handleEditMeasure(measure)}>
                        <Pencil size={14} />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDeleteMeasure(measure.id)}>
                        <Trash2 size={14} />
                    </Button>
                </TableCell>
            </TableRow>
        ))
    }, [measures, handleEditMeasure, handleDeleteMeasure])

    return (
        <Card>
            <CardContent>
                <div className="flex justify-between items-center mb-2">
                    <label className="font-semibold">SCENE PRESERVATION MEASURES TAKEN</label>
                    <div className="flex gap-2">
                        <Dialog open={showDialog} onOpenChange={setShowDialog}>
                            <DialogTrigger asChild>
                                <Button className="bg-blue-100" size="sm" variant="outline" onClick={handleAddMeasure}>
                                    <CirclePlus className="mr-1 h-4 w-4" /> ADD
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="min-w-[50%] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle className="text-xl font-bold bg-blue-100 p-3 rounded text-center">
                                        INFORMATION PROTECTION FIELD
                                    </DialogTitle>
                                </DialogHeader>

                                <div className="space-y-4">
                                    <div className="flex flex-col gap-4">
                                        <label className="font-medium">RESPONSIBLE UNIT/OFFICER</label>
                                        <Input value={officer} onChange={(e) => setOfficer(e.target.value)} />
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <label className="font-medium">TIME OF ARRIVAL AT THE SCENE</label>

                                        <div className="flex flex-col gap-4">
                                            <div className="flex justify-between items-center gap-4">
                                                <label className="text-sm font-medium">Start time</label>
                                                <Input type="time" className="w-30 bg-blue-100" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                                            </div>

                                            <div className="flex justify-between items-center gap-4">
                                                <label className="text-sm font-medium">End time</label>
                                                <Input type="time" className="w-30 bg-blue-100" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="font-medium my-4">DESCRIPTION OF SCENE PROTECTION METHODS</label>
                                        <Textarea value={methods} onChange={(e) => setMethods(e.target.value)} />
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="font-medium my-4">AREA COVERED / PERIMETER</label>
                                        <Textarea value={area} onChange={(e) => setArea(e.target.value)} />
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="font-medium my-4">NOTES / SPECIAL INSTRUCTIONS</label>
                                        <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
                                    </div>

                                    <div className="flex flex-col">
                                        <div className="flex justify-between items-center">
                                            <label className="font-medium my-4">ATTACHMENT</label>
                                            <Button variant="outline" className="mb-2 flex items-center gap-2">
                                                <UploadCloud className="w-4 h-4" />
                                                Upload
                                            </Button>
                                        </div>
                                        <div className="border border-dashed rounded-lg p-6 bg-gray-100 text-center">
                                            <p>
                                                Drag & drop files or{' '}
                                                <span className="text-blue-600 underline cursor-pointer">Browse</span>
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between mt-6">
                                        <Button type="button" variant="ghost" onClick={() => setShowDialog(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" className="bg-blue-100">
                                            {editingMeasureId ? 'Update' : 'Save'}
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <Table className="w-full text-sm border">
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead className="p-4">#</TableHead>
                            <TableHead className="p-4">Preservation Measures</TableHead>
                            <TableHead className="p-4">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>{renderMeasureTable}</TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default ScenePreservationMeasures
