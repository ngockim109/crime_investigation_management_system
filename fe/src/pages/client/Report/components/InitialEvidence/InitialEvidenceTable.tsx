import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronsUpDown, Trash2 } from "lucide-react"
import { memo, useState } from "react"
import { InitialEvidenceForm, severity } from "."
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import {  removeInitialEvidence } from "@/redux/reduxReport"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

const InitialEvidenceTable = () => {
    const menuSeverity = severity.map((v) => {
        return <DropdownMenuItem className=" py-3.25 px-6.75 " >{v}</DropdownMenuItem>
    })
    const [add, setAdd] = useState(false)
    const initialEvidence = useSelector((state: RootState) => state.report.initialEvidence)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [i, sI] = useState(0)
    return (
        <section className="mb-33.5">
            <div className="max-w-250 mx-auto mb-12.5">
                <div className="flex items-center gap-x-8.25">
                    <hr className="flex-1" />
                    <h2 className="text-[26px] font-semibold">
                        Initial Evidence
                    </h2>
                    <hr className="flex-1" />
                </div>
            </div>
            <div className="max-w-250 mx-auto overflow-x-auto">
                <table className="table-auto w-full mb-7.5">
                    <thead className="h-15 bg-[#EEEEEE]">
                        <tr>
                            <th className="text-center p-4"> ID   </th>
                            <th className="text-center p-4">
                                <DropdownMenu >
                                    <DropdownMenuTrigger className="flex w-full justify-center items-center gap-1">
                                        <span>Types of Evidence</span>
                                        <ChevronsUpDown className="size-4" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel className="text-center">Types of Evidence</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {menuSeverity}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </th>
                            <th className="text-center p-4">Location</th>
                            <th className="text-center p-4">Description</th>
                            <th className="text-center p-4">Attachments</th>
                            <th className="text-center p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            initialEvidence.map((v, i) => {
                                return <tr>
                                    <td className="p-4 text-center border-1">#{i}</td>
                                    <td className="p-4 text-center border-1">{v.type_evidence}</td>
                                    <td className="p-4 text-center border-1">{v.current_location}</td>
                                    <td className="p-4 text-center border-1">{v.description}</td>
                                    <td className="p-4 text-center border-1">
                                        <img src={v.attackment} alt="" />
                                    </td>
                                    <td className="p-4 text-center border-1 flex justify-center">
                                        <Trash2 onClick={() => {
                                            sI(i)
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
                    }} className="uppercase cursor-pointer py-2 w-33.5 px-4  hover:bg-[#c7ced9] bg-[#E7EDF6] border">
                        ADD
                    </button>
                </div>
            </div>
            <div className={`${add ? "" : "hidden"}`}>
                <div onClick={() => {
                    setAdd(false)
                }} className="fixed top-0 left-0 z-20 h-screen w-screen bg-[#0002]">

                </div>
                <InitialEvidenceForm />
            </div>
            <AlertDialog open={open} onOpenChange={(o) => setOpen(o)}>
                <AlertDialogContent asChild className="bg-white text-black">
                    <div className="">
                        <AlertDialogHeader >
                            <AlertDialogTitle asChild >
                                <p className="text-3xl mb-4">Delete</p>
                            </AlertDialogTitle>
                            <div>
                                <AlertDialogDescription asChild>
                                    <p>  <AlertDialogDescription asChild >
                                        <p className="mt-4">
                                            2. I accept full legal responsibility for any false or misleading information submitted.
                                        </p>
                                    </AlertDialogDescription></p>
                                </AlertDialogDescription>
                            </div>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => {
                                dispatch(removeInitialEvidence(i))
                            }}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </section>
    )
}

export default memo(InitialEvidenceTable)