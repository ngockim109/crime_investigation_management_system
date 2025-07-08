import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import RelevantPartiesTable, { crime_types } from "@/pages/client/report/components/RelevantParties"
import InitialEvidenceTable, { severities } from "@/pages/client/report/components/InitialEvidence"
import type { RootState } from "@/redux/store"
import { resetForm, setData } from "@/redux/reduxReport"
import { useDispatch, useSelector } from "react-redux"
import { reportsApi } from "@/api/reports"
import { toast } from "react-toastify"
import { useState } from "react"
import Alertinput from "@/components/alertinput"

const StepTwo = (p: { nextStep(n: number): void, cur: number }) => {

    const selectCrimeTypes = crime_types.map((v) => {
        return <SelectItem className="text-[20px] py-3.25 px-6.75 " value={v.value}>{v.value}</SelectItem>
    })
    const data = useSelector((state: RootState) => state.report.data)
    const report = useSelector((state: RootState) => state.report)
    const dispath = useDispatch()
    const selectSeverity = severities.map((v) => {
        return <SelectItem className="text-[20px] py-3.25 px-6.75 " value={v.value}>{v.value}</SelectItem>
    })
    const [alertKey, setAlertKey] = useState("")

    const submitReprt = async () => {

        for (const key in data) {
            const element = (data as any)[key] as any;
            if (element.length == 0) {
                setAlertKey(key)
                setTimeout(() => {
                    setAlertKey("")
                }, 3000);
                return
            }

        }
        let f = {
            ...report.data,
            evidences: report.evidences,
            parties: report.parties
        }

        try {
            await reportsApi.createReport(f)
            toast.success("Submitted Form Successfully");
            dispath(resetForm())
            p.nextStep(3)
        } catch (error) {
            toast.error("Error Form ")
        }
    }
    return (
        <div className={p.cur == 2 ? "max-lg:px-2" : "hidden"}>
            <div className="max-w-207.5 mt-22 mx-auto">
                <div className="lg:grid grid-cols-2 lg:gap-x-15 mb-20 gap-y-7.5">
                    <div className="flex flex-col text-[20px]  space-y-3.25 ">
                        <label htmlFor="fullname">
                            <p className="">
                                Type of crime  <span className="text-red-500 ">*</span>
                            </p>
                        </label>
                        <div className="w-full lg:w-95">
                            <Alertinput
                                alertKey="crime_type" curkey={alertKey}
                                describe="crime type should not empty">
                                <Select onValueChange={(v) => {
                                    dispath(setData({ ...data, crime_type: v }))
                                }} defaultValue={data.crime_type} >
                                    <SelectTrigger className="w-full py-3.25 !h-12.5 px-6.75 text-[20px] rounded-[8px] bg-[#EEEEEE]">
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {selectCrimeTypes}
                                    </SelectContent>
                                </Select>
                            </Alertinput>

                        </div>
                    </div>
                    <div className="flex flex-col text-[20px]  space-y-3.25">
                        <label htmlFor="severity">
                            <p className="">
                                Severity   <span className="text-red-500 ">*</span>
                            </p>
                        </label>
                        <Alertinput
                            alertKey="severity" curkey={alertKey}
                            describe="severity should not empty">
                            <Select onValueChange={(v) => {
                                dispath(setData({
                                    ...data, severity: v
                                }))
                            }} defaultValue={data.severity} >
                                <SelectTrigger className="w-full lg:w-95 py-3.25 !h-12.5 px-6.75 text-[20px] rounded-[8px] bg-[#EEEEEE]">
                                    <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent>
                                    {selectSeverity}
                                </SelectContent>
                            </Select>
                        </Alertinput>
                    </div>
                    <div className="flex col-span-2 flex-col text-[20px]  space-y-3.25">
                        <label htmlFor="fullname">
                            <p className="">
                                Datetime of occurrence    <span className="text-red-500 ">*</span>
                            </p>
                        </label>
                        <div className="w-full py-3.25 px-6.75 text-[20px] rounded-[8px] bg-[#EEEEEE]">
                            <Alertinput
                                alertKey="time_occurrence" curkey={alertKey}
                                describe="time occurrence should not empty">
                                <input
                                    onChange={(v) => {
                                        let d = v.currentTarget.value
                                        dispath(setData({
                                            ...data, time_occurrence: d
                                        }))
                                    }} type="datetime-local" value={data.time_occurrence} placeholder="choose"
                                    className="w-full hover:bg-[#c7ced9]  bg-[#E7EDF6] border-1 border-[#9E9E9E] py-2 px-4 rounded-sm" />

                            </Alertinput>
                        </div>
                    </div>
                    <div className="flex col-span-2 flex-col text-[20px]  space-y-3.25">
                        <label htmlFor="address">
                            <p className="">
                                Detailed address  <span className="text-red-500 ">*</span>
                            </p>
                        </label>
                        <div className="">
                            <Alertinput
                                alertKey="case_location" curkey={alertKey}
                                describe="case location should not empty">
                                <input
                                    onChange={(v) => {
                                        let t = v.currentTarget.value
                                        dispath(setData({
                                            ...data, case_location: t
                                        }))
                                    }}
                                    type="text" id="case_location" value={data.case_location}
                                    className="bg-[#eee] h-12.5 w-full py-2 px-4 rounded-sm" />
                            </Alertinput>
                        </div>

                    </div>
                    <div className="flex col-span-2 flex-col text-[20px]  space-y-3.25">
                        <label htmlFor="Description">
                            <p className="">
                                Description of the incident  <span className="text-red-500 ">*</span>
                            </p>
                        </label>
                        <div className="">
                            <Alertinput
                                alertKey="description" curkey={alertKey}
                                describe="description should not empty">
                                <textarea onChange={(v) => {
                                    let text = v.currentTarget.value
                                    dispath(setData({ ...data, description: text }))
                                }} name=""
                                    value={data.description}
                                    rows={4} placeholder="Briefly describe what happened, including key facts such as time, location, and main events." id="Description"
                                    className="bg-[#eee] w-full py-2 px-4 rounded-sm"></textarea>
                            </Alertinput>
                        </div>

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
                    <button
                        onClick={() => submitReprt()}
                        className="w-40 h-12.5 rounded-[8px] cursor-pointer bg-black text-white">
                        Submit
                    </button>
                </div>
            </div>
        </div>

    )
}

export default StepTwo

