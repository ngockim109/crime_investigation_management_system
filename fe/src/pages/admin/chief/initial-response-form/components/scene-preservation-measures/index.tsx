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
import { useDispatch } from 'react-redux'
import type { PreservationMeasure } from '@/types/scene-preservation.interface'
import { addPreservationMeasure } from '@/redux/reduxInitialResponse'
import { toast } from 'react-toastify'
import { uploadFileApi } from '@/api/upload'
import FileForm from '@/pages/client/report/components/File/FileForm'
import Attachments from '@/pages/client/report/components/Attachments'


const ScenePreservationMeasures = () => {
    const [showDialog, setShowDialog] = useState(false)
    const [measures, setMeasures] = useState<PreservationMeasure[]>([])
    const [file, setFile] = useState<File | undefined>(undefined)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const initialFormState: PreservationMeasure = {
        preservation_measures_id: '',
        responsible_officer: 'user_chief',
        arrival_start_time: '',
        arrival_end_time: '',
        protection_methods: '',
        area_covered: '',
        special_instructions: '',
        attached_file: [],
    }

    const resetForm = () => {
        setDataForm(initialFormState)
        setFile(undefined)
    }


    const [dataForm, setDataForm] = useState<PreservationMeasure>(initialFormState)

    const handleAddPreservationMeasure = () => {
        try {
            const isNew = dataForm.preservation_measures_id === ''
            const finalForm = isNew
                ? { ...dataForm, preservation_measures_id: uuidv4() }
                : dataForm

            if (!isNew) {
                // Edit mode
                const updated = measures.map(m =>
                    m.preservation_measures_id === finalForm.preservation_measures_id ? finalForm : m
                )
                setMeasures(updated)
            } else {
                // Add mode
                setMeasures(prev => [...prev, finalForm])
            }

            dispatch(addPreservationMeasure(finalForm))
            toast.success(isNew ? "Added successfully" : "Updated successfully")
            setShowDialog(false)
            resetForm()
        } catch (err) {
            toast.error("Failed to save")
            console.error(err)
        }
    }

    const handleDeletePreservationMeasure = useCallback((id: string) => {
        setMeasures((prev) => prev.filter((measure) => measure.preservation_measures_id !== id))
        toast.success("Measures information deleted successfully")
    }, [])

    const uploadHandle = () => {
        if (file == undefined) {
            return
        }
        if (loading) {
            return
        }
        let data = new FormData()
        data.set("folder", "relevant")
        data.append("files", file)
        setLoading(true)
        uploadFileApi.uploadFileCloudMulti(data)
            .then((v) => {
                setDataForm({
                    ...dataForm, attached_file:
                        [...dataForm.attached_file, { ...v.data[0], original_name: file.name }]
                })
            })
            .finally(() => {
                setLoading(false)
                setFile(undefined)
            })
    }

    const renderMeasureTable = useMemo(() => {
        return measures.map((measure, index) => (
            <TableRow key={measure.preservation_measures_id}>
                <TableCell className="py-2 px-4">{index + 1}</TableCell>
                <TableCell className="py-2 px-4">{measure.area_covered}</TableCell>
                <TableCell className="py-2 px-4 flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => {
                        setDataForm(measure)
                        setShowDialog(true)
                    }}>
                        <Pencil size={14} />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDeletePreservationMeasure(measure.preservation_measures_id)}>
                        <Trash2 size={14} />
                    </Button>
                </TableCell>
            </TableRow>
        ))
    }, [measures])

    return (
        <Card>
            <CardContent>
                <div className="flex justify-between items-center mb-2">
                    <label className="font-semibold">SCENE PRESERVATION MEASURES TAKEN</label>
                    <div className="flex gap-2">
                        <Dialog open={showDialog} onOpenChange={setShowDialog}>
                            <DialogTrigger asChild>
                                <Button className="bg-blue-100" size="sm" variant="outline" onClick={() => resetForm()} >
                                    <CirclePlus className="mr-1 h-4 w-4" /> ADD
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="min-w-[50%] max-h-screen overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle className="text-xl font-bold bg-blue-100 p-3 rounded text-center">
                                        INFORMATION PROTECTION FIELD
                                    </DialogTitle>
                                </DialogHeader>

                                <div className="space-y-4">
                                    <div className="flex flex-col gap-4">
                                        <label className="font-medium">RESPONSIBLE UNIT/OFFICER</label>
                                        <Input
                                            type="text"
                                            value={dataForm.responsible_officer}
                                            onChange={(e) => setDataForm({ ...dataForm, responsible_officer: e.target.value })}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <label className="font-medium">TIME OF ARRIVAL AT THE SCENE</label>

                                        <div className="flex flex-col gap-4">
                                            <div className="flex justify-between items-center gap-4">
                                                <label className="text-sm font-medium">Start time</label>
                                                <Input type="time" className="w-30 bg-blue-100" value={dataForm.arrival_start_time} onChange={(e) => setDataForm({ ...dataForm, arrival_start_time: e.target.value })} />
                                            </div>

                                            <div className="flex justify-between items-center gap-4">
                                                <label className="text-sm font-medium">End time</label>
                                                <Input type="time" className="w-30 bg-blue-100" value={dataForm.arrival_end_time} onChange={(e) => setDataForm({ ...dataForm, arrival_end_time: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="font-medium my-4">DESCRIPTION OF SCENE PROTECTION METHODS</label>
                                        <Textarea
                                            value={dataForm.protection_methods}
                                            onChange={(e) => setDataForm({ ...dataForm, protection_methods: e.target.value })}
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="font-medium my-4">AREA COVERED / PERIMETER</label>
                                        <Input
                                            type="text"
                                            value={dataForm.area_covered}
                                            onChange={(e) => setDataForm({ ...dataForm, area_covered: e.target.value })}
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="font-medium my-4">NOTES / SPECIAL INSTRUCTIONS</label>
                                        <Textarea
                                            value={dataForm.special_instructions}
                                            onChange={(e) => setDataForm({ ...dataForm, special_instructions: e.target.value })}
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <div className="flex justify-between items-center">
                                            <label className="font-medium my-4">ATTACHMENT</label>
                                            <Button variant="outline" className="mb-2 flex items-center gap-2" onClick={() => { uploadHandle() }}>
                                                <UploadCloud className="w-4 h-4" />
                                                Upload
                                            </Button>
                                        </div>
                                        <div className="border border-dashed rounded-lg p-6 bg-gray-100 text-center">
                                            {dataForm.attached_file.length > 0 && (
                                                <>
                                                    <h2 className="text-[14px] mb-2">Uploaded:</h2>
                                                    <div className="flex flex-wrap">
                                                        {dataForm.attached_file.map((v, i) => (
                                                            <FileForm
                                                                key={i}
                                                                data={v}
                                                                rm={() => setDataForm({
                                                                    ...dataForm,
                                                                    attached_file: dataForm.attached_file.filter((_, index) => index !== i)
                                                                })}
                                                            />
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <Attachments key={dataForm.attached_file.length} idimage="RelevantPartiesForm" onchange={(file) => {
                                        setFile(file)
                                    }} />
                                    <div className="flex justify-between mt-6">
                                        <Button type="button" variant="ghost" onClick={() => setShowDialog(false)}>
                                            Cancel
                                        </Button>
                                        <Button className="bg-blue-100" onClick={handleAddPreservationMeasure}>
                                            Save
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

export default ScenePreservationMeasures;

