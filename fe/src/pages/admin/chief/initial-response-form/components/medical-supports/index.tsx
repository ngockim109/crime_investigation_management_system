import { useState, useMemo } from 'react'
import { Pencil, Trash2, UploadCloud, CirclePlus } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

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
import moment from 'moment'

import type { MedicalSupport } from '@/types/medical-support.interface'
import type { RootState } from '@/redux/store'
import { addMedicalSupport, deleteMedicalSupport } from '@/redux/reduxInitialResponse'

const MedicalRescueSupport = () => {
  const dispatch = useDispatch()
  const supports = useSelector((state: RootState) => state.initialResponse.medical_supports)

  const [showDialog, setShowDialog] = useState(false)
  const [file, setFile] = useState<File | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  const initialFormState: MedicalSupport = {
    medical_unit_id: '',
    support_type: '',
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

  const handleAddSupport = () => {
    try {
      const formattedTime = moment(dataForm.time_of_arrival, 'HH:mm').format('HH:mm:ss')
      const newData = {
        ...dataForm,
        time_of_arrival: formattedTime,
      }

      dispatch(addMedicalSupport(newData))

      const exists = supports.some(s => s.medical_unit_id === newData.medical_unit_id)
      toast.success(exists ? 'Support information updated successfully' : 'Support information sent successfully')

      setShowDialog(false)
      resetForm()
    } catch (err) {
      toast.error('Failed to send support info')
      console.error(err)
    }
  }

  const handleDeleteSupport = (medical_unit_id: string) => {
    dispatch(deleteMedicalSupport(medical_unit_id))
    toast.success('Deleted support successfully')
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
            {moment(unit.time_of_arrival, 'HH:mm:ss').format('HH:mm')}
          </TableCell>
          <TableCell className="py-2 px-2 flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                setDataForm({
                  ...unit,
                  time_of_arrival: moment(unit.time_of_arrival, 'HH:mm:ss').format('HH:mm'),
                })
                setShowDialog(true)
              }}
            >
              <Pencil size={14} />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleDeleteSupport(unit.medical_unit_id)}
            >
              <Trash2 size={14} />
            </Button>
          </TableCell>
        </TableRow>
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
                  <Input
                    value={dataForm.support_type}
                    onChange={(e) =>
                      setDataForm({ ...dataForm, support_type: e.target.value })
                    }
                  />
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
                <div className="flex justify-end pt-4">
                  <Button onClick={handleAddSupport} className="bg-blue-100">
                    Save
                  </Button>
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
