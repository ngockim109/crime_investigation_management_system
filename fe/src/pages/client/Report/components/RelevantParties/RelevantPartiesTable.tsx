import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronsUpDown, Trash2 } from "lucide-react"
import { memo, useState } from "react"
import { crimeTypes, RelevantPartiesForm } from "."
import { removeRelevantParties } from "@/redux/reduxReport"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/redux/store"

const RelevantPartiesTable = () => {
    const [add, setAdd] = useState(false)
    const menuCrimeTypes = crimeTypes.map((v) => {
        return <DropdownMenuItem className=" py-3.25 px-6.75 " >{v}</DropdownMenuItem>
    })
    const dispatch = useDispatch()
    const relevantPartie = useSelector((state: RootState) => state.report.relevantPartie)
    return (
        <section className="mb-20.25">
            <div className="max-w-250 mx-auto mb-12.5">
                <div className="flex items-center gap-x-8.25">
                    <hr className="flex-1" />
                    <h2 className="text-[26px] font-semibold">
                        Relevant Parties
                    </h2>
                    <hr className="flex-1" />
                </div>
            </div>
            <div className="max-w-250 mx-auto overflow-x-auto">
                <table className="table-auto w-full mb-7.5">
                    <thead className="h-15 bg-[#EEEEEE]">
                        <tr>
                            <th className="text-center p-4"> ID   </th>
                            <th className="text-center p-4 ">
                                <DropdownMenu >
                                    <DropdownMenuTrigger className="flex w-full justify-center items-center gap-1">
                                        <span>Relevant Role</span>
                                        <ChevronsUpDown className="size-4" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel className="text-center">Relevant Role</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {menuCrimeTypes}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </th>
                            <th className="text-center p-4">Name</th>
                            <th className="text-center p-4">Statement</th>
                            <th className="text-center p-4">Attachments</th>
                            <th className="text-center p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            relevantPartie.map((v, i) => {
                                return <tr>
                                    <td className="p-4 text-center border-1">#{i}</td>
                                    <td className="p-4 text-center border-1">{v.type_relevant}</td>
                                    <td className="p-4 text-center border-1">{v.full_name}</td>
                                    <td className="p-4 text-center border-1">{v.statement}</td>
                                    <td className="p-4 text-center border-1">
                                        <img src={v.attachments_url} alt="" />
                                    </td>
                                    <td className="p-4 text-center border-1 flex justify-center">
                                        <Trash2 onClick={() => {
                                            dispatch(removeRelevantParties(i))
                                        }} className="size-6 cursor-pointer" />
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="max-w-250 mx-auto">
                <div className="flex justify-end">
                    <button onClick={() => {
                        setAdd(true)
                    }} className="uppercase py-2 w-33.5 px-4 hover:bg-[#c7ced9] bg-[#E7EDF6] border">
                        ADD
                    </button>
                </div>
            </div>
            <div className={`${add ? "" : "hidden"}`}>
                <div onClick={() => {
                    setAdd(false)
                }} className="fixed top-0 left-0 z-20 h-screen w-screen bg-[#0002]">

                </div>
                <RelevantPartiesForm />
            </div>
        </section>
    )
}

export default memo(RelevantPartiesTable)