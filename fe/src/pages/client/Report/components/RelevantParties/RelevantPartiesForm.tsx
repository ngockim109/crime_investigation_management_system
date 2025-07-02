import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { memo, useState } from "react"
import FileForm from "../File"
import Attachments from "../Attachments"
import type { relevantParties } from "../../interface/interface"
import { useDispatch } from "react-redux"
import { addRelevantParties } from "@/redux/reduxReport"

const RelevantPartiesForm = () => {
    const relationship = ["Victim", "Witness", "Suspect", "Accomplice"]
    const selectRelationship = relationship.map((v) => {
        return <SelectItem className="text-[20px] py-3.25 px-6.75 " value={v}>{v}</SelectItem>
    })

    const gender = ["Male", "Female", "Unknown"]
    const selectGender = gender.map((v) => {
        return <SelectItem className="text-[20px] py-3.25 px-6.75 " value={v}>{v}</SelectItem>
    })

    const [dataForm, setDataForm] = useState<relevantParties>({
        attachments_url: "",
        full_name: "",
        gender: "",
        nationality: "",
        statement: "",
        type_relevant: "",
    })
    const dispath = useDispatch();
    return (
        <>
            <div className="fixed top-0 left-1/2 z-40  -translate-x-1/2 p-1 ">
                <div className="bg-white overflow-y-auto h-screen w-250 rounded-4xl p-17.5">
                    <h2 className="text-center text-[28px] font-semibold leading-8.5 mb-1.75">
                        Relevant Parties
                    </h2>
                    <p className="text-[11px] italic text-center leading-3.5">This form is used to document the roles and identities of all parties connected to the incident.</p>
                    <div className="mt-12.5 grid grid-cols-2 gap-x-15  gap-y-7.5">
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
                            }} type="text" id="fullname" placeholder="E.g., John Michael Doe" className="w-95 px-2 bg-[#EEEEEE] rounded-[8px] h-12.5" />
                        </div>
                        <div className="flex flex-col text-[20px]  space-y-3.25">
                            <label htmlFor="fullname">
                                <p className="">
                                    Relationship to the incident  <span className="text-red-500 ">*</span>
                                </p>

                            </label>
                            <Select onValueChange={(v) => {
                                setDataForm({
                                    ...dataForm, type_relevant: v
                                })
                            }} defaultValue={""} >
                                <SelectTrigger className="w-95 py-3.25 px-6.75 !h-12.5 text-[20px] rounded-[8px] bg-[#EEEEEE]">
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
                            }} defaultValue={""} >
                                <SelectTrigger className="w-95  !h-12.5 text-[20px] rounded-[8px] bg-[#EEEEEE]">
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
                                placeholder="E.g., American" className="w-95 px-2 bg-[#EEEEEE] rounded-[8px] h-12.5" />
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
                            <Attachments idimage="RelevantPartiesForm" onchange={(d, url) => {
                                d
                                setDataForm({
                                    ...dataForm, attachments_url: url
                                })
                            }} />
                        </div>
                    </div>
                    <div className="mt-5.25">
                        <button className="w-25 h-10 bg-[#E8E9EA]">
                            Upload file
                        </button>
                    </div>
                    <div className="mt-10.25">
                        <div className="mb-3.25">
                            <h2 className="text-[14px]">Uploaded:</h2>
                        </div>
                        <div className="flex flex-wrap">
                            <FileForm />
                            <FileForm />
                        </div>
                    </div>
                    <div className="mt-20 flex justify-end space-x-3.75">
                        <button className="w-40 rounded-[8px] cursor-pointer text-[16px] font-semibold h-12.5 text-black bg-[#D9D9D9] py-2.5 px-3.75">
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                dispath(addRelevantParties(dataForm))
                            }}
                            className="w-40 rounded-[8px] cursor-pointer text-[16px] font-semibold text-white h-12.5 bg-black py-2.5 px-3.75">
                            Create
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default memo(RelevantPartiesForm)