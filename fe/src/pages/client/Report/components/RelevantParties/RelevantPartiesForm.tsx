import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Fragment, memo, useState } from "react"
import FileForm from "../File"
import Attachments from "../Attachments"
import { useDispatch } from "react-redux"
import { addRelevantParties } from "@/redux/reduxReport"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Party } from "@/types/party.interface"
import { uploadFileApi } from "@/api/upload"
import { toast } from "react-toastify"

const RelevantPartiesForm = (p: { onclick(): void }) => {
  const relationship = ["victim", "witness", "suspect", "accomplice"]
  const selectRelationship = relationship.map((v) => {
    return (
      <SelectItem className="text-[20px] py-3.25 px-6.75 " value={v}>
        {v}
      </SelectItem>
    )
  })

  const gender = ["male", "female", "unknown"]
  const selectGender = gender.map((v) => {
    return (
      <SelectItem className="text-[20px] py-3.25 px-6.75 " value={v}>
        {v}
      </SelectItem>
    )
  })

    const [dataForm, setDataForm] = useState<Party>({
        attached_file: [],
        full_name: "",
        gender: "",
        nationality: "",

        statement: "",
        party_type: ""
    })
    const dispath = useDispatch();
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState<File>()
    const [loading, setLoading] = useState(false)
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
    return (
        <>
            <div className="fixed top-0 left-1/2 z-40  -translate-x-1/2 p-1 ">
                <div className="bg-white overflow-y-auto h-[96vh] lg:w-250 rounded-4xl p-17.5">
                    <h2 className="text-center text-[28px] font-semibold leading-8.5 mb-1.75">
                        Relevant Parties
                    </h2>
                    <p className="text-[11px] italic text-center leading-3.5">This form is used to document the roles and identities of all parties connected to the incident.</p>
                    <div className="mt-12.5 lg:grid grid-cols-1 lg:grid-cols-2 lg:gap-x-15  gap-y-7.5">
                        <div className="flex flex-col text-[20px]  space-y-3.25">
                            <label htmlFor="fullname">
                                <p className="">
                                    Full name
                                </p>
                            </label>
                            <input onChange={(v) => {
                                let t = v.currentTarget.value
                                setDataForm({
                                    ...dataForm, full_name: t
                                })
                            }} type="text" id="fullname" placeholder="E.g., John Michael Doe" className="max-w-95 px-2 bg-[#EEEEEE] rounded-[8px] h-12.5" />
                        </div>
                        <div className="flex flex-col text-[20px]  space-y-3.25">
                            <label htmlFor="fullname">
                                <p className="">
                                    Relationship to the incident  <span className="text-red-500 ">*</span>
                                </p>

                            </label>
                            <Select onValueChange={(v) => {
                                setDataForm({
                                    ...dataForm, party_type: v
                                })
                            }} defaultValue={dataForm.party_type} >
                                <SelectTrigger className="w-full lg:w-95 py-3.25 px-6.75 !h-12.5 text-[20px] rounded-[8px] bg-[#EEEEEE]">
                                    <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent>
                                    {selectRelationship}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col text-[20px]  space-y-3.25">
                            <label htmlFor="fullname">
                                <p className="">
                                    Gender
                                </p>
                            </label>
                            <Select onValueChange={(v) => {
                                setDataForm({
                                    ...dataForm, gender: v
                                })
                            }} defaultValue={dataForm.gender} >
                                <SelectTrigger className="w-full lg:w-95  !h-12.5 text-[20px] rounded-[8px] bg-[#EEEEEE]">
                                    <SelectValue className="" placeholder="Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    {selectGender}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col text-[20px]  space-y-3.25">
                            <label htmlFor="Nationality">
                                <p className="">
                                    Nationality
                                </p>
                            </label>
                            <input
                                onChange={(v) => {
                                    setDataForm({
                                        ...dataForm, nationality: v.currentTarget.value
                                    })
                                }}
                                type="text"
                                id="Nationality"
                                value={dataForm.nationality}
                                placeholder="E.g., American" className="max-w-95 px-2 bg-[#EEEEEE] rounded-[8px] h-12.5" />
                        </div>
                        <div className="flex col-span-2 flex-col text-[20px]  space-y-3.25">
                            <label htmlFor="Description">
                                <p className="">
                                    Statement / Description
                                </p>
                            </label>
                            <textarea name="" onChange={(v) => {
                                let t = v.currentTarget.value
                                setDataForm({
                                    ...dataForm, statement: t
                                })
                            }} rows={4} placeholder="Provide a clear and detailed description of what happened, including dates, times, locations, and people involved." id="Description" className="bg-[#eee] py-2 px-4 rounded-sm"></textarea>
                        </div>
                        <div className="flex col-span-2 flex-col text-[20px]  space-y-3.25">
                            <Attachments key={dataForm.attached_file.length} idimage="RelevantPartiesForm" onchange={(file) => {
                                setFile(file)
                            }} />
                        </div>
                    </div>
                    <div className="mt-5.25 flex space-x-3.5 items-center">
                        <button
                            onClick={() => {
                                uploadHandle()
                            }}
                            className={`${loading || file == undefined ? "opacity-25" : ""} w-25 h-10 hover:bg-[#e8e9ead7] bg-[#E8E9EA]`}>
                            Upload file
                        </button>
                        <div className="ml-3">
                            <p> {loading ? "Uploading" : ""}</p>
                        </div>
                    </div>
                    <div className="mt-10.25">
                        {
                            dataForm.attached_file.length > 0 ?
                                <Fragment>
                                    <div className="mb-3.25">
                                        <h2 className="text-[14px]">Uploaded:</h2>
                                    </div>
                                    <div className="flex flex-wrap">
                                        {dataForm.attached_file.map((v, i) => {
                                            return <FileForm data={v} rm={() => {
                                                setDataForm({
                                                    ...dataForm, attached_file: dataForm.attached_file.filter((_, ati) => {
                                                        return ati != i
                                                    })
                                                })
                                            }} />
                                        })}
                                    </div>
                                </Fragment> : <></>
                        }
                    </div>
                    <div className="mt-20 flex justify-end space-x-3.75">
                        <button onClick={() => p.onclick()}
                            className="w-40 rounded-[8px] cursor-pointer text-[16px] font-semibold h-12.5 text-black hover:bg-[#d9d9d9cd] bg-[#D9D9D9] py-2.5 px-3.75">
                            Cancel
                        </button>
                        <button

                            onClick={() => {
                                setOpen(true)

                            }}
                            className="w-40 rounded-[8px] cursor-pointer text-[16px] font-semibold text-white h-12.5 bg-black py-2.5 px-3.75">
                            Create
                        </button>
                    </div>
                </div>

            </div>
            <AlertDialog open={open} onOpenChange={(o) => setOpen(o)}>
                <AlertDialogContent asChild className="bg-white text-black">
                    <div className="">
                        <AlertDialogHeader >
                            <AlertDialogTitle asChild >
                                <p className="text-3xl mb-4">Declaration & Confirmation</p>
                            </AlertDialogTitle>
                            <div>
                                <AlertDialogDescription asChild>
                                    <p> 1. I hereby declare that all the information provided in this report is true and accurate to the best of my knowledge.</p>
                                </AlertDialogDescription>
                                <AlertDialogDescription asChild >
                                    <p className="mt-4">
                                        2. I accept full legal responsibility for any false or misleading information submitted.
                                    </p>
                                </AlertDialogDescription>
                            </div>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => {
                                dispath(addRelevantParties(dataForm))
                                toast.success("Successfully")
                                p.onclick()
                            }}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default memo(RelevantPartiesForm)
