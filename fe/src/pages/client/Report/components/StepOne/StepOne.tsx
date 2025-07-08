import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { setData } from "@/redux/reduxReport"
import Alertinput from "@/components/alertinput"
import { useState } from "react"
import { isUSPhoneNumber } from "@/utils/isphonenumber"

const StepOne = (p: { nextStep(n: number): void, cur: number }) => {

    const data = useSelector((state: RootState) => state.report.data)
    const dispath = useDispatch()
    const relationshipIncident = ["Victim", "Witness", "Offender", "Anonymous"]
    const rIcom = relationshipIncident.map((v) => {
        return (
            <>
                <label htmlFor={v} className="flex mt-6.25 items-center space-x-3.75">
                    <input id={v} onChange={() => {
                        dispath(setData({
                            ...data, relation_incident: v
                        }))
                    }} type="radio" name="relationshipIncident" className="size-5" />
                    <p>{v}</p>
                </label>
            </>
        )
    })

    const [alertKey, setAlertKey] = useState("")
    const nextStep2 = () => {
        setTimeout(() => {
            setAlertKey("")
        }, 3000);
        if (data.address.length == 0) {
            setAlertKey("address")
            return
        }
        if (data.reporter_fullname.length == 0) {
            setAlertKey("reporter_fullname")
            return
        }
        if (!isUSPhoneNumber(data.reporter_phonenumber)) {
            setAlertKey("reporter_phonenumber")
            return
        }
        if (data.relation_incident.length == 0) {
            setAlertKey("relation_incident")
            return
        }
        if (data.reporter_email.length == 0) {
            setAlertKey("reporter_email")
            return
        }
        p.nextStep(2)
    }
    return (
        <div className={p.cur == 1 ? "" : "hidden"}>
            <div className="lg:grid lg:grid-cols-2 gap-x-15 mb-25 gap-y-7.5">
                <div className="flex flex-col text-[20px]  space-y-3.25">
                    <label htmlFor="fullname">
                        <p className="">
                            Full name <span className="text-red-500 ">*</span>
                        </p>
                    </label>
                    <div className="w-full lg:max-w-95">
                        <Alertinput
                            alertKey="reporter_fullname" curkey={alertKey}
                            describe="fullname should not empty">
                            <input
                                onChange={(v) => {
                                    let text = v.currentTarget.value
                                    dispath(setData({
                                        ...data, reporter_fullname: text
                                    }))
                                }}
                                type="text"
                                id="fullname"
                                className="w-full px-2 bg-[#EEEEEE] rounded-[8px] h-12.5" />
                        </Alertinput>
                    </div>

                </div>
                <div className="flex flex-col text-[20px] space-y-3.25">
                    <label htmlFor="email">
                        <p className="">
                            Email  <span className="text-red-500 ">*</span>
                        </p>
                    </label>
                    <div className="w-full lg:max-w-95">
                        <Alertinput
                            alertKey="reporter_email" curkey={alertKey}
                            describe="email is not right fotmat">
                            <input
                                onChange={(v) => {
                                    let text = v.currentTarget.value
                                    dispath(setData({
                                        ...data, reporter_email: text
                                    }))
                                }}
                                type="email" value={data.reporter_email} id="email" className="w-full px-2 bg-[#EEEEEE] rounded-[8px] h-12.5" />
                        </Alertinput>
                    </div>

                </div>
                <div className="flex flex-col text-[20px] space-y-3.25">
                    <label htmlFor="phonenumber">
                        <p className="">
                            Phone number  <span className="text-red-500 ">*</span>
                        </p>
                    </label>
                    <div className="w-full lg:max-w-95 ">
                        <Alertinput
                            alertKey="reporter_phonenumber" curkey={alertKey}
                            describe="phonenumber is not right fotmat">
                            <input
                                onChange={(v) => {
                                    let text = v.currentTarget.value
                                    dispath(setData({
                                        ...data, reporter_phonenumber: text
                                    }))
                                }}
                                type="tel"
                                value={data.reporter_phonenumber}
                                placeholder="Ex 123-456-7899"
                                id="phonenumber"
                                className="w-full px-2 bg-[#EEEEEE] rounded-[8px] h-12.5" />
                        </Alertinput>
                    </div>

                </div>
                <div className="flex flex-col text-[20px] space-y-3.25">
                    <label htmlFor="Address">
                        <p className="">
                            Address  <span className="text-red-500 ">*</span>
                        </p>
                    </label>
                    <div className="w-full lg:max-w-95">
                        <Alertinput
                            alertKey="address" curkey={alertKey}
                            describe="address should not empty">
                            <input
                                onChange={(v) => {
                                    let text = v.currentTarget.value
                                    dispath(setData({
                                        ...data, address: text
                                    }))
                                }}
                                type="text" value={data.address} id="Address" className="w-full px-2 bg-[#EEEEEE] rounded-[8px] h-12.5" />

                        </Alertinput>
                    </div>
                </div>
                <div className="flex flex-col text-[20px] mb-4 space-y-3.25">
                    <Alertinput
                        alertKey="relation_incident" curkey={alertKey}
                        describe="relation incident should not empty">
                        <>
                            <label htmlFor="">
                                <p className="">
                                    Relationship to the incident  <span className="text-red-500 ">*</span>
                                </p>
                            </label>
                            <div className="flex flex-col pl-12">
                                {rIcom}
                            </div>
                        </>
                    </Alertinput>

                </div>
            </div>
            <div className="w-full">
                <div className="flex justify-end ">
                    <button onClick={() => nextStep2()}
                        className="bg-black text-white rounded-[8px] cursor-pointer w-40 h-12.5">
                        <p className="text-[16px] font-semibold"> Next</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StepOne