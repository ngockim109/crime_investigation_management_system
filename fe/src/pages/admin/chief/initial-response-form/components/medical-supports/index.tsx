import { useState, useMemo } from 'react'
import { Pencil, Trash2, UploadCloud, CirclePlus } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import FileForm from '@/pages/client/report/components/File/FileForm'
import Attachments from '@/pages/client/report/components/Attachments'

import { toast } from 'react-toastify'
import { uploadFileApi } from '@/api/upload'
import moment from 'moment-timezone'

import type { MedicalSupport } from '@/types/medical-support.interface'
import type { RootState } from '@/redux/store'
import { addMedicalSupport, deleteMedicalSupport } from '@/redux/reduxInitialResponse'
import { medicalSupportApi } from '@/api/medical-support'
import { MedicalType } from '@/enum/medical.enum'
import { fromISOToDisplayTime, toUSATimeISOString } from '@/utils/date'

type Props = {
  initialResponseId?: string
  refetch: () => void
}

const medicalSupportOptions = [
  { label: 'Medical Emergency', value: MedicalType.MEDICAL_EMERGENCY },
  { label: 'Patrol Officer', value: MedicalType.PATROL_OFFICER },
  { label: 'Detective', value: MedicalType.DETECTIVE },
]

const MedicalRescueSupport = ({ refetch, initialResponseId }: Props) => {
  const dispatch = useDispatch()
  const supports = useSelector((state: RootState) => state.initialResponse.medical_supports)

  const [showDialog, setShowDialog] = useState(false)
  const [file, setFile] = useState<File | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const initialFormState: MedicalSupport = {
    medical_supports_id: '',
    medical_unit_id: '',
    support_type: MedicalType.MEDICAL_EMERGENCY,
    personnel_assigned: '',
    time_of_arrival: '',
    location_assigned: '',
    remarks: '',
    created_by: 'user_patrol',
    scene_sketch_file: [],
  }

  const [dataForm, setDataForm] = useState<MedicalSupport>(initialFormState)

  const resetForm = () => {
    setDataForm(initialFormState)
    setFile(undefined)
  }

  const handleAddMedicalSupport = async () => {
    const isNew = dataForm.medical_supports_id === '';

    if (!dataForm.time_of_arrival) {
      toast.error('Please enter time of arrival');
      return;
    }


    const formattedTime = toUSATimeISOString(dataForm.time_of_arrival)
    if (!formattedTime) return;

    const finalForm = {
      ...dataForm,
      medical_supports_id: isNew ? uuidv4() : dataForm.medical_supports_id,
      time_of_arrival: formattedTime,
    };

    try {
      if (initialResponseId) {
        const { medical_supports_id, ...data } = finalForm;
        await medicalSupportApi.createMedicalSupport({
          ...data,
          initial_responses_id: initialResponseId,
        });

        toast.success(isNew ? 'Support created successfully (API)' : 'Support updated successfully (API)');
        refetch?.();
      } else {
        dispatch(addMedicalSupport(finalForm));
        const exists = supports.some(s => s.medical_supports_id === finalForm.medical_supports_id);
        toast.success(exists ? 'Support updated (local)' : 'Support added (local)');
      }

      setShowDialog(false);
      resetForm();
    } catch (err) {
      toast.error('Failed to send support info');
      console.error(err);
    }
  };

  const handleUpdateMedicalSupport = async () => {
    try {
      const formattedTime = toUSATimeISOString(dataForm.time_of_arrival)

      if (!formattedTime) return;

      const finalForm = {
        ...dataForm,
        time_of_arrival: formattedTime,
      };

      const res = await medicalSupportApi.updateMedicalSupport(
        dataForm.medical_supports_id,
        finalForm
      );

      if (res?.data) {
        toast.success("Support updated successfully");
        refetch?.();
        setShowDialog(false);
        resetForm();
      }
    } catch (error) {
      toast.error("Failed to update support info");
      console.error(error);
    }
  };




  const handleDeleteSupport = async (medical_unit_id: string) => {
    console.log(medical_unit_id)
    try {
      if (initialResponseId) {
        await medicalSupportApi.deleteMedicalSupport(medical_unit_id)
        toast.success('Deleted successfully (API)')
      } else {
        dispatch(deleteMedicalSupport(medical_unit_id))
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

    const data = new FormData()
    data.set('folder', 'relevant')
    data.append('files', file)

    setLoading(true)
    uploadFileApi
      .uploadFileCloudMulti(data)
      .then((v) => {
        setDataForm({
          ...dataForm,
          scene_sketch_file: [
            ...dataForm.scene_sketch_file,
            { ...v.data[0], original_name: file.name },
          ],
        })
      })
      .finally(() => {
        setLoading(false)
        setFile(undefined)
      })
  }

  const renderMedicalSupportTable = useMemo(
    () =>
      supports.map((unit) => (
        <TableRow key={unit.medical_unit_id} className="border-none">
          <TableCell className="py-2 px-4">{unit.medical_unit_id}</TableCell>
          <TableCell className="py-2 px-4">{unit.support_type}</TableCell>
          <TableCell className="py-2 px-4">
            {moment(fromISOToDisplayTime(unit.time_of_arrival), "HH:mm").format("hh:mm A")}
          </TableCell>
          <TableCell className="py-2 px-2 flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                setDataForm({
                  ...unit,
                  time_of_arrival: fromISOToDisplayTime(unit.time_of_arrival),
                })
                setShowDialog(true)
              }}
            >
              <Pencil size={14} />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setDeleteId(unit.medical_supports_id)}
            >
              <Trash2 size={14} />
            </Button>
          </TableCell>
        </TableRow >
      )),
    [supports]
  )

  return (
    <Card>
      <CardContent className="space-y-6 py-6">
        <div className="flex justify-between items-center mb-2">
          <label className="font-semibold">
            INFORMATION ON MEDICAL/RESCUE SUPPORT PROVIDED
          </label>
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-blue-100 p-2"
                onClick={resetForm}
              >
                <CirclePlus className="mr-2" /> ADD
              </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[50%] max-h-screen overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-center bg-blue-100 p-3 rounded">
                  MEDICAL/RESCUE SUPPORT
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex flex-col gap-4">
                  <label className="font-medium">Medical/Rescue Unit ID</label>
                  <Input
                    value={dataForm.medical_unit_id}
                    onChange={(e) =>
                      setDataForm({ ...dataForm, medical_unit_id: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <label className="font-medium">Type of Support Provided</label>
                  <select
                    className="p-2 border rounded bg-white"
                    value={dataForm.support_type}
                    onChange={(e) =>
                      setDataForm({ ...dataForm, support_type: e.target.value as MedicalType })
                    }
                  >
                    <option value="" disabled>Select a type</option>
                    {medicalSupportOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col gap-2">
                    <label className="font-medium">Personnel Assigned</label>
                    <Input
                      value={dataForm.personnel_assigned}
                      onChange={(e) =>
                        setDataForm({ ...dataForm, personnel_assigned: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-medium">Time of Arrival</label>
                    <Input
                      type="time"
                      value={dataForm.time_of_arrival}
                      onChange={(e) =>
                        setDataForm({ ...dataForm, time_of_arrival: e.target.value })
                      }
                      className="w-32 bg-blue-100"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <label className="font-medium">Location Assigned</label>
                  <Input
                    value={dataForm.location_assigned}
                    onChange={(e) =>
                      setDataForm({ ...dataForm, location_assigned: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <label className="font-medium">Remarks/Notes</label>
                  <Textarea
                    value={dataForm.remarks}
                    onChange={(e) =>
                      setDataForm({ ...dataForm, remarks: e.target.value })
                    }
                    placeholder="Enter any additional information or notes here"
                    className="h-24"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="font-medium">Scene Sketch</label>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={uploadHandle}
                    >
                      <UploadCloud size={16} /> Upload
                    </Button>
                  </div>
                  <div className="h-1/2 border border-dashed rounded-lg p-6 bg-gray-100 text-center">
                    {dataForm.scene_sketch_file.length > 0 && (
                      <>
                        <h2 className="text-[14px] mb-2">Uploaded:</h2>
                        <div className="flex flex-wrap">
                          {dataForm.scene_sketch_file.map((v, i) => (
                            <FileForm
                              key={i}
                              data={v}
                              rm={() =>
                                setDataForm({
                                  ...dataForm,
                                  scene_sketch_file: dataForm.scene_sketch_file.filter(
                                    (_, index) => index !== i
                                  ),
                                })
                              }
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <Attachments
                    key={dataForm.scene_sketch_file.length}
                    idimage="RelevantPartiesForm"
                    onchange={(file) => setFile(file)}
                  />
                </div>
                <div className="flex justify-between mt-6">
                  <Button type="button" variant="ghost" onClick={() => setShowDialog(false)}>
                    Cancel
                  </Button>

                  <div className="flex gap-2">
                    {dataForm.medical_supports_id && (
                      <Button
                        className="bg-yellow-400 hover:bg-yellow-500 text-white"
                        onClick={handleUpdateMedicalSupport}
                      >
                        Update
                      </Button>
                    )}

                    <Button
                      className="bg-blue-100"
                      onClick={handleAddMedicalSupport}
                      disabled={!!dataForm.medical_supports_id}
                    >
                      Save
                    </Button>
                  </div>
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
                  handleDeleteSupport(deleteId);
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

export default MedicalRescueSupport
