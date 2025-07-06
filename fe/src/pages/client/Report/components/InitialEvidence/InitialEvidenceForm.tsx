import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Fragment, memo, useState } from "react"
import FileForm from "@/pages/client/report/components/File";
import Attachments from "@/pages/client/report/components/Attachments";
import { useDispatch } from "react-redux";
import { addInitialEvidence } from "@/redux/reduxReport";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import type { Evidence } from "@/types/evidence.interface";
import { uploadFileApi } from "@/api/upload";
import { toast } from "react-toastify";
import { evidenceType } from ".";

const InitialEvidenceForm = () => {

    const selectEvidenceType = evidenceType.map((v) => {
        return <SelectItem className="text-[20px] py-3.25 px-6.75 " value={v}>{v}</SelectItem>
    })
    const [open, setOpen] = useState(false)
    const [data, setDataForm] = useState<Evidence>(
        {
            attached_file: [],
            current_location: "",
            description: "",
            type_evidence: ""
        }
    )
    const dispatch = useDispatch()
    const [file, setFile] = useState<File>()
    const [loading, setLoading] = useState(false)
    const uploadHandle = () => {
        if (file == undefined) {
            return
        }
        if (loading) {
            return
        }
        let dataForm = new FormData()
        dataForm.set("folder", "relevant")
        dataForm.append("files", file)
        setLoading(true)
        uploadFileApi.uploadFileCloudMulti(dataForm)
            .then((v) => {
                setDataForm({
                    ...data, attached_file:
                        [...data.attached_file, { ...v.data[0], original_name: file.name}]
                })
                toast.success(
                    <div>
                        <h2>Notification</h2>
                        <p>Successful</p>
                    </div>);
            })
            .finally(() => {
                setLoading(false)
                setFile(undefined)
            })
    }
    return (
        <>
            <div className="fixed top-0 left-1/2 z-40  -translate-x-1/2 p-1 ">
                <div className="bg-white overflow-y-auto h-screen w-250 rounded-4xl p-17.5">
                    <h2 className="text-center text-[28px] font-semibold leading-8.5 mb-1.75">
                        Initial Evidence
                    </h2>
                    <p className="text-[11px] italic text-center leading-3.5">This form is used to document the initial evidence connected to the incident.</p>
                    <div className="mt-12.5 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-15  gap-y-7.5">
                        <div className="flex flex-col text-[20px]  space-y-3.25">
                            <label htmlFor="fullname">
                                <p className="">
                                    Type of Evidence  <span className="text-red-500 ">*</span>
                                </p>
                            </label>
                            <Select onValueChange={(v) => {
                                setDataForm({
                                    ...data, type_evidence: v
                                })
                            }} defaultValue={data.type_evidence} >
                                <SelectTrigger className="w-full lg:w-95 py-3.25 px-6.75 !h-12.5 text-[20px] rounded-[8px] bg-[#EEEEEE]">
                                    <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent>
                                    {selectEvidenceType}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col text-[20px]  space-y-3.25">
                            <label htmlFor="Nationality">
                                <p className="">
                                    Nationality
                                </p>
                            </label>
                            <input onChange={(v) => {
                                setDataForm({
                                    ...data, current_location: v.currentTarget.value
                                })
                            }} type="text" id="Nationality" placeholder="E.g., American"
                                className="max-w-95 px-2 bg-[#EEEEEE] rounded-[8px] h-12.5" />
                        </div>
                        <div className="flex col-span-2 flex-col text-[20px]  space-y-3.25">
                            <label htmlFor="DescriptionEvidence">
                                <p className="">
                                    Evidence Description
                                </p>
                            </label>
                            <textarea onChange={(v) => {
                                setDataForm({
                                    ...data, description: v.currentTarget.value
                                })
                            }} name="" id="DescriptionEvidence"
                                rows={4}
                                placeholder="Provide a clear and detailed description of what happened, including dates, times, locations, and people involved."
                                className="bg-[#eee] py-2 px-4 rounded-sm"></textarea>
                        </div>
                        <div className="flex col-span-2 flex-col text-[20px]  space-y-3.25">
                            <Attachments key={data.attached_file.length} idimage="InitialEvidenceForm" onchange={(file) => {
                                setFile(file)
                            }} />
                        </div>
                    </div>
                    <div className="mt-5.25 flex">
                        <button
                            onClick={() => {
                                uploadHandle()
                            }}
                            className={`${loading ? "opacity-25" : ""} w-25 h-10 hover:bg-[#e8e9ead7] bg-[#E8E9EA]`}>
                            Upload file
                        </button>
                        <div className="ml-3">
                            <p> {loading ? "Đang tải..." : ""}</p>
                            <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24">
                                <div className="size-4 rounded-full border-2 border-black">

                                </div>
                            </svg>
                        </div>
                    </div>
                    <div className="mt-10.25">
                        <div className="mt-10.25">
                            {
                                data.attached_file.length > 0 ?
                                    <Fragment>
                                        <div className="mb-3.25">
                                            <h2 className="text-[14px]">Uploaded:</h2>
                                        </div>
                                        <div className="flex flex-wrap">
                                            {data.attached_file.map((v, i) => {
                                                return <FileForm data={v} rm={() => {
                                                    setDataForm({
                                                        ...data, attached_file: data.attached_file.filter((_, ati) => {
                                                            return ati != i
                                                        })
                                                    })
                                                }} />
                                            })}
                                        </div>
                                    </Fragment> : <></>
                            }
                        </div>
                    </div>
                    <div className="mt-20 flex justify-end space-x-3.75">
                        <button className="w-40 rounded-[8px] cursor-pointer text-[16px] font-semibold h-12.5 text-black bg-[#D9D9D9] py-2.5 px-3.75">
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
                                        dispatch(addInitialEvidence(data))
                                        toast.success(
                                            <div>
                                                <h2>Notification</h2>
                                                <p>Successful</p>
                                            </div>);
                                    }}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </div>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </>
    )
}

export default memo(InitialEvidenceForm)