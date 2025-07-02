import StepOne from "@/pages/client/Report/components/StepOne"
import { useState } from "react"
import StepTwo from "@/pages/client/Report/components/StepTwo"
import Step from "@/pages/client/Layout/Step"

const ReportPage = () => {
    const [step, setStep] = useState(1)
    return <>
        <div className="px-10">
            <div>
                <ul className="text-[16px] font-normal flex gap-2 text-gray-400">
                    <li>Home</li>
                    <li>{">"}</li>
                    <li>Report</li>
                    <li>{">"}</li>
                    <li>Step {step}</li>
                </ul>
            </div>
        </div>
        <section className="mb-20">
            <h2 className="uppercase text-2xl text-center font-bold">
                CRIME REPORT
            </h2>
        </section>
        <Step onclick={(n) => {
            setStep(n)
        }} cur={step}/>
        <section className="max-w-207.5 mt-22 mx-auto">
            <div className="flex items-center h-8 mb-16 gap-5.25">
                <hr className="flex-1" />
                <p className="text-[26px] font-semibold">
                    Reporter Information
                </p>
                <hr className="flex-1" />
            </div>
            <StepOne cur={step} nextStep={(n) => {
                setStep(n)
            }} />
        </section>
        <StepTwo cur={step} nextStep={(n) => {
            setStep(n)
        }} />
    </>
}

export default ReportPage