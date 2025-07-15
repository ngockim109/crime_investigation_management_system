import { useCallback, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
    CirclePlus,
    Pencil,
    Trash2,
    UploadCloud,
} from 'lucide-react'

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
import { useDispatch, useSelector } from 'react-redux'
import type { PreservationMeasure } from '@/types/scene-preservation.interface'
import {
    addPreservationMeasure,
    deleteMedicalSupport,
    deletePreservationMeasure,
} from '@/redux/reduxInitialResponse'
import { toast } from 'react-toastify'
import { uploadFileApi } from '@/api/upload'
import FileForm from '@/pages/client/report/components/File/FileForm'
import Attachments from '@/pages/client/report/components/Attachments'
import moment from 'moment'
import type { RootState } from '@/redux/store'
import { preservationMeasureApi } from '@/api/preservation-measure'
import { useAppSelector } from '@/redux/hook'

type Props = {
    initialResponseId?: string
    refetch: () => void
}


const ScenePreservationMeasures = ({ refetch, initialResponseId }: Props) => {
    const dispatch = useDispatch()
    const measures = useSelector((state: RootState) => state.initialResponse.preservation_measures)
    const userName = useAppSelector(state => state.account.user.user_name);
    const [showDialog, setShowDialog] = useState(false)
    const [file, setFile] = useState<File | undefined>(undefined)
    const [loading, setLoading] = useState(false)
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const initialFormState: PreservationMeasure = {
        preservation_measures_id: '',
        responsible_officer: userName,
        arrival_start_time: '',
        arrival_end_time: '',
        protection_methods: '',
        area_covered: '',
        special_instructions: '',
        attached_file: [],
    }

    const [dataForm, setDataForm] = useState<PreservationMeasure>(initialFormState)

    const resetForm = () => {
        setDataForm(initialFormState)
        setFile(undefined)
    }

    const handleAddPreservationMeasure = async () => {
        const isNew = dataForm.preservation_measures_id === '';

        const finalForm: PreservationMeasure = {
            ...dataForm,
            preservation_measures_id: isNew ? uuidv4() : dataForm.preservation_measures_id,
            arrival_start_time: moment(dataForm.arrival_start_time, 'HH:mm').format('HH:mm:ss'),
            arrival_end_time: moment(dataForm.arrival_end_time, 'HH:mm').format('HH:mm:ss'),
        };

        try {
            if (initialResponseId) {
                const { preservation_measures_id, ...createPayload } = finalForm;
                await preservationMeasureApi.createPreservationMeasure({
                    ...createPayload,
                    initial_responses_id: initialResponseId,
                });

                toast.success(isNew ? 'Added successfully (API)' : 'Updated successfully (API)');

                refetch?.();
            } else {
                dispatch(addPreservationMeasure(finalForm));
                toast.success(isNew ? 'Added successfully (local)' : 'Updated successfully (local)');
            }

            setShowDialog(false);
            resetForm();
        } catch (err) {
            toast.error('Failed to save');
            console.error(err);
        }
    };

    const handleUpdatePreservationMeasure = async () => {
        try {
            const finalForm: PreservationMeasure = {
                ...dataForm,
                arrival_start_time: moment(dataForm.arrival_start_time, 'HH:mm').format('HH:mm:ss'),
                arrival_end_time: moment(dataForm.arrival_end_time, 'HH:mm').format('HH:mm:ss'),
            };

            const response = await preservationMeasureApi.updatePreservationMeasure(
                dataForm.preservation_measures_id,
                finalForm
            );

            if (response?.data) {
                refetch?.();
                toast.success('Updated successfully');
            } else {
                throw new Error('No data returned from update API');
            }

            setShowDialog(false);
            resetForm();
        } catch (error) {
            console.error('Update preservation measure failed:', error);
            toast.error('Update failed');
        }
    };

    const handleDeletePreservationMeasure = async (preservation_measures_id: string) => {
        try {
            if (initialResponseId) {
                await preservationMeasureApi.deletePreservationMeasure(preservation_measures_id)
                toast.success('Deleted successfully (API)')
            } else {
                dispatch(deleteMedicalSupport(preservation_measures_id))
                toast.success('Deleted successfully (Local)')
            }

            refetch?.()
        } catch (error) {
            console.error('Deletion failed:', error)
            toast.error('Deletion failed')
        }
    }



    const uploadHandle = () => {
        if (!file || loading) return

        let data = new FormData()
        data.set('folder', 'relevant')
        data.append('files', file)

        setLoading(true)
        uploadFileApi.uploadFileCloudMulti(data)
            .then((v) => {
                setDataForm({
                    ...dataForm,
                    attached_file: [
                        ...dataForm.attached_file,
                        { ...v.data[0], original_name: file.name }
                    ]
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
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                            setDataForm({
                                ...measure,
                                arrival_start_time: moment(measure.arrival_start_time, 'HH:mm:ss').format('HH:mm'),
                                arrival_end_time: moment(measure.arrival_end_time, 'HH:mm:ss').format('HH:mm'),
                            })
                            setShowDialog(true)
                        }}
                    >
                        <Pencil size={14} />
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setDeleteId(measure.preservation_measures_id)}
                    >
                        <Trash2 size={14} />
                    </Button>
                </TableCell>
            </TableRow>
        ))
    }, [measures, handleDeletePreservationMeasure])

    return (
        <Card>
            <CardContent>
                <div className="flex justify-between items-center mb-2">
                    <label className="font-semibold">SCENE PRESERVATION MEASURES TAKEN</label>
                    <div className="flex gap-2">
                        <Dialog open={showDialog} onOpenChange={setShowDialog}>
                            <DialogTrigger asChild>
                                <Button className="bg-blue-100" size="sm" variant="outline" onClick={resetForm}>
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
                                            value={dataForm.responsible_officer}
                                             readOnly
                                        />
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <label className="font-medium">TIME OF ARRIVAL AT THE SCENE</label>
                                        <div className="flex flex-col gap-4">
                                            <div className="flex justify-between items-center gap-4">
                                                <label className="text-sm font-medium">Start time</label>
                                                <Input
                                                    type="time"
                                                    className="w-30 bg-blue-100"
                                                    value={dataForm.arrival_start_time}
                                                    onChange={(e) => setDataForm({ ...dataForm, arrival_start_time: e.target.value })}
                                                />
                                            </div>

                                            <div className="flex justify-between items-center gap-4">
                                                <label className="text-sm font-medium">End time</label>
                                                <Input
                                                    type="time"
                                                    className="w-30 bg-blue-100"
                                                    value={dataForm.arrival_end_time}
                                                    onChange={(e) => setDataForm({ ...dataForm, arrival_end_time: e.target.value })}
                                                />
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
                                            <Button variant="outline" className="mb-2 flex items-center gap-2" onClick={uploadHandle}>
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
                                                                rm={() =>
                                                                    setDataForm({
                                                                        ...dataForm,
                                                                        attached_file: dataForm.attached_file.filter((_, index) => index !== i),
                                                                    })
                                                                }
                                                            />
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <Attachments
                                        key={dataForm.attached_file.length}
                                        idimage="RelevantPartiesForm"
                                        onchange={(file) => setFile(file)}
                                    />

                                    <div className="flex justify-between mt-6">
                                        <Button type="button" variant="ghost" onClick={() => setShowDialog(false)}>
                                            Cancel
                                        </Button>

                                        <div className="flex gap-2">
                                            {dataForm.preservation_measures_id && (
                                                <Button
                                                    className="bg-yellow-400 hover:bg-yellow-500 text-white"
                                                    onClick={handleUpdatePreservationMeasure}
                                                >
                                                    Update
                                                </Button>
                                            )}

                                            <Button
                                                className="bg-blue-100"
                                                onClick={handleAddPreservationMeasure}
                                                disabled={!!dataForm.preservation_measures_id}
                                            >
                                                Save
                                            </Button>
                                        </div>
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
            <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to delete this support item?</DialogTitle>
                    </DialogHeader>
                    <div className="text-sm text-muted-foreground mb-4">
                        This action cannot be undone. Are you sure you want to proceed?
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                if (deleteId) {
                                    handleDeletePreservationMeasure(deleteId);
                                    setDeleteId(null);
                                }
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </Card>
    )
}

export default ScenePreservationMeasures
