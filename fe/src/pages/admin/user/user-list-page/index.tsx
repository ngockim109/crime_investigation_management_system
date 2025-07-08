import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Funnel } from "lucide-react"
import { Link } from "react-router-dom"
import PositionComponent from "../components/Position"

const UserListPage = () => {
    return (
        <section>
            <div>
                <h3 className="text-center text-4xl mb-4">List of police officers
                    <div className=" float-right">
                        <Link to={"/admin/user/add"} className=" px-3.75 text-sm py-2 bg-gray-300 hover:bg-gray-200 text-white cursor-pointer rounded-sm">Add police</Link>
                    </div>
                </h3>

            </div>
            <div className="py-3.5">
                <div className="flex text-sm space-x-4 items-center">
                    <Funnel size={14}/>
                    <div className="w-60">
                        <PositionComponent curValue="" onChage={(positionValue) => {
                            positionValue
                        }} />
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <Table className="bg-white ">
                    <TableHeader>
                        <TableRow className="bg-blue-200 font-semibold border-blue-200 hover:bg-blue-200">
                            <TableHead className="text-center rounded-tl-md">
                                Number
                            </TableHead>
                            <TableHead >User name</TableHead>
                            <TableHead >Name</TableHead>
                            <TableHead >Position</TableHead>
                            <TableHead >Note</TableHead>
                            <TableHead className=" rounded-tr-md">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow
                            className={`${2 % 2 === 0 ? "bg-white" : "bg-blue-50"
                                } hover:bg-blue-100 border-0 rounded-md`}
                        >
                            <TableCell
                                className={`py-3 text-center }`}
                            >
                                {1 + 1}
                            </TableCell>
                            <TableCell className=" py-3">

                            </TableCell>
                            <TableCell className=" py-3">

                            </TableCell>
                            <TableCell className=" py-3">

                            </TableCell>
                            <TableCell className=" py-3">

                            </TableCell>
                            <TableCell
                                className={`py-3 `}
                            >
                                <Link
                                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                    to={`/admin/user/${1}`}
                                >
                                    <Eye className="h-4 w-4 mr-1" />
                                    View detail
                                </Link>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}

export default UserListPage