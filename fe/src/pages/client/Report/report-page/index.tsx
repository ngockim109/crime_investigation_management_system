import StepOne from "@/pages/client/report/components/StepOne"
import { useState } from "react"
import StepTwo from "@/pages/client/report/components/StepTwo"
import { NavLink } from "react-router-dom"
import StepThree from "../components/StepThree"
import Step from "../../Layout/Step"

const ReportPage = () => {
  const [step, setStep] = useState(1)
  return (
    <>
      <div className="px-10 hidden">
        <div>
          <ul className="text-[16px] font-normal flex gap-2 text-gray-400">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>{">"}</li>
            <li>Report</li>
            <li>{">"}</li>
            <li>Step {step}</li>
          </ul>
        </div>
      </div>
      <section className="mb-20 ">
        <h2 className="uppercase text-2xl text-center font-bold">
          CRIME REPORT
        </h2>
      </section>
      <Step
        onclick={(n) => {
          setStep(n)
        }}
        cur={step}
      />
      <section className="max-w-207.5 mt-22 mx-auto">
        <div className="flex items-center justify-center h-8 mb-16 gap-5.25">
          <hr className="flex-1 max-lg:!hidden" />
          <p className="text-2xl text-center lg:text-[26px] font-semibold">
            Reporter Information
          </p>
          <hr className="flex-1 max-lg:!hidden" />
        </div>
        <StepOne
          cur={step}
          nextStep={(n) => {
            setStep(n)
          }}
        />
      </section>
      <StepTwo
        cur={step}
        nextStep={(n) => {
          setStep(n)
        }}
      />
      <StepThree
        cur={step}
        nextStep={(n) => {
          setStep(n)
        }}
      />
    </>
  )
}

export default ReportPage
