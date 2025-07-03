import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import RelevantPartiesTable, { crimeTypes } from "@/pages/client/Report/components/RelevantParties"
import InitialEvidenceTable, { severity } from "@/pages/client/Report/components/InitialEvidence"
import type { RootState } from "@/redux/store"

import { setData } from "@/redux/reduxReport"
import { useDispatch, useSelector } from "react-redux"

const StepTwo = (p: { nextStep(n: number): void, cur: number }) => {

    const selectCrimeTypes = crimeTypes.map((v) => {
        return <SelectItem className="text-[20px] py-3.25 px-6.75 " value={v}>{v}</SelectItem>
    })
    const data = useSelector((state: RootState) => state.report.data)
    const dispath = useDispatch()
    const selectSeverity = severity.map((v) => {
        return <SelectItem className="text-[20px] py-3.25 px-6.75 " value={v}>{v}</SelectItem>
    })
    return (
        <div className={p.cur == 2 ? "max-lg:px-2" : "hidden"}>
            <div className="max-w-207.5 mt-22 lg:mx-auto">
                <div className="lg:grid grid-cols-2 lg:gap-x-15 mb-20 gap-y-7.5">
                    <div className="flex flex-col text-[20px]  space-y-3.25 ">
                        <label htmlFor="fullname">
                            <p className="">
                                Type of crime  <span className="text-red-500 ">*</span>
                            </p>
                        </label>
                        <Select onValueChange={(v) => {
                            dispath(setData({ ...data, crimeType: v }))
                        }} defaultValue={data.crimeType} >
                            <SelectTrigger className="w-full lg:w-95 py-3.25 !h-12.5 px-6.75 text-[20px] rounded-[8px] bg-[#EEEEEE]">
                                <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                                {selectCrimeTypes}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col text-[20px]  space-y-3.25">
                        <label htmlFor="fullname">
                            <p className="">
                                Severity   <span className="text-red-500 ">*</span>
                            </p>
                        </label>
                        <Select onValueChange={(v) => {
                            dispath(setData({
                                ...data, severity: v
                            }))
                        }} defaultValue={""} >
                            <SelectTrigger className="w-full lg:w-95 py-3.25 !h-12.5 px-6.75 text-[20px] rounded-[8px] bg-[#EEEEEE]">
                                <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                                {selectSeverity}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex col-span-2 flex-col text-[20px]  space-y-3.25">
                        <label htmlFor="fullname">
                            <p className="">
                                Datetime of occurrence    <span className="text-red-500 ">*</span>
                            </p>
                        </label>
                        <div className="w-full py-3.25 px-6.75 text-[20px] rounded-[8px] bg-[#EEEEEE]">
                            <input
                                onChange={(v) => {
                                    let d = v.currentTarget.value
                                    dispath(setData({
                                        ...data, time_occurrence: d
                                    }))
                                }} type="datetime-local" value={data.time_occurrence} placeholder="choose"
                                 className="w-full hover:bg-[#c7ced9]  bg-[#E7EDF6] border-1 border-[#9E9E9E] py-2 px-4 rounded-sm" />
                        </div>
                    </div>
                    <div className="flex col-span-2 flex-col text-[20px]  space-y-3.25">
                        <label htmlFor="address">
                            <p className="">
                                Detailed address  <span className="text-red-500 ">*</span>
                            </p>
                        </label>
                        <input
                            onChange={(v) => {
                                let t = v.currentTarget.value
                                dispath(setData({
                                    ...data, case_location: t
                                }))
                            }}
                            type="text" id="address" value={data.case_location} className="bg-[#eee] h-12.5 py-2 px-4 rounded-sm" />
                    </div>
                    <div className="flex col-span-2 flex-col text-[20px]  space-y-3.25">
                        <label htmlFor="Description">
                            <p className="">
                                Description of the incident  <span className="text-red-500 ">*</span>
                            </p>
                        </label>
                        <textarea onChange={(v) => {
                            let text = v.currentTarget.value
                            dispath(setData({ ...data, description_incident: text }))
                        }} name=""
                            value={data.description_incident}
                            rows={4} placeholder="Briefly describe what happened, including key facts such as time, location, and main events." id="Description" className="bg-[#eee] py-2 px-4 rounded-sm"></textarea>
                    </div>
                </div>
            </div>
            <RelevantPartiesTable />
            <InitialEvidenceTable />

            <div className="px-28 flex justify-end mb-56">
                <div className="flex gap-10">
                    <button onClick={() => {
                        p.nextStep(1)
                    }} className="w-40 h-12.5 rounded-[8px] cursor-pointer bg-[#D9D9D9] text-black">Back</button>
                    <button className="w-40 h-12.5 rounded-[8px] cursor-pointer bg-black text-white">Submit</button>
                </div>
            </div>
        </div>

    )
}

export default StepTwo

