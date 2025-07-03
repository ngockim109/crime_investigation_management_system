import { Fragment, memo, useState } from "react"
import step_three from "@/assets/images/step_three.png"
import { Eye } from "lucide-react"
import ReportDetail from "../ReportDeilPage/ReportDetail"

const StepThree = (p: { nextStep(n: number): void, cur: number }) => {

    const [s, sS] = useState(false)
    return (
        <Fragment>
            <div className={p.cur == 3 ? " pt-11 " : "hidden"}>
                <div className="w-max mx-auto ">
                    <img src={step_three} className="w-30 h-auto" alt="" srcSet="" />
                </div>
                <p className="text-center mt-3 text-[14px]">Your report will be reviewed within 5–10 working days. <br />
                    Please check the status regularly for updates. <br />Thank you for your submission.</p>
                <div className="mt-10 overflow-x-auto">
                    <table className="w-250  mx-auto">
                        <thead className="table-auto ">
                            <tr className="bg-[#EEEEEE]">
                                <th className="p-4"> ReportID</th>
                                <th className="p-4">Provider</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Time</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-center">
                                <td>#1</td>
                                <td>abcd@gmail.com</td>
                                <td>12/24/2025</td>
                                <td>20 : 00</td>
                                <td className="p-3">
                                    <p className="w-full py-2 px-3 rounded-4xl bg-[#FFEDD9]">Pending</p>
                                </td>
                                <td>
                                    <button onClick={() => {
                                        sS(true)
                                    }} className="cursor-pointer">
                                        <Eye />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {
                s ?
                    <><div onClick={() => {
                        sS(false)
                    }} className="fixed top-0 left-0 w-screen h-screen bg-[#00000039] z-50"></div>
                        <div className="fixed overflow-y-auto h-screen top-0 left-1/2 -translate-x-1/2 z-60">
                            <ReportDetail />
                        </div>
                    </> : <></>
            }
        </Fragment>

    )
}

export default memo(StepThree)

