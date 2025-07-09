import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye } from "lucide-react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { userApi } from "@/api/user"
import { useQuery } from "@tanstack/react-query"
import PanitionC from "@/components/pagination/pagination"

const UserListPage = () => {
    const [searchParams] = useSearchParams();
    const current = parseInt(searchParams.get("current") || 1 + "")
    const navi = useNavigate()
    const { isPending, isError, data, error } = useQuery({
        queryKey: ["users", [{ current: current, pageSize: 20 }]],
        queryFn: () => userApi.getAllUser({ current: current, pageSize: 20, position: "" }),
        staleTime: 1000 * 60 * 5
    })
    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }
    const userlist = data.data.result
    const panition = data.data.meta

    return (
        <section>
            <div>
                <h3 className="text-center text-4xl mb-4">List of police officers
                    <div className=" float-right">
                        <Link to={"/admin/user/add"} className=" px-3.75 text-sm py-2 bg-gray-300 hover:bg-gray-200 text-white cursor-pointer rounded-sm">Add police</Link>
                    </div>
                </h3>

            </div>
            {/* <div className="py-3.5">
                <div className="flex text-sm space-x-4 items-center">
                    <Funnel size={14} />
                    <div className="w-60">
                        <PositionComponent curValue="" onChage={(positionValue) => {
                            positionValue
                        }} />
                    </div>
                </div>
            </div> */}
            <div className="overflow-x-auto">
                <Table className="bg-white ">
                    <TableHeader>
                        <TableRow className="bg-blue-200 font-semibold border-blue-200 hover:bg-blue-200">
                            <TableHead className="text-center rounded-tl-md">
                                Number
                            </TableHead>
                            <TableHead >User name</TableHead>
                            <TableHead >FullName</TableHead>
                            <TableHead >Position</TableHead>
                            <TableHead >Phonenumber</TableHead>
                            <TableHead >Note</TableHead>
                            <TableHead className=" rounded-tr-md">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            userlist.map((user, i) => {
                                return (
                                    <TableRow
                                        className={`${2 % 2 === 0 ? "bg-white" : "bg-blue-50"
                                            } hover:bg-blue-100 border-0 rounded-md`}
                                    >
                                        <TableCell
                                            className={`py-3 text-center }`}
                                        >
                                            {i + 1}
                                        </TableCell>
                                        <TableCell className=" py-3">
                                            {user.user_name}
                                        </TableCell>
                                        <TableCell className=" py-3">
                                            {user.full_name}
                                        </TableCell>
                                        <TableCell className=" py-3">
                                            {user.position}
                                        </TableCell>
                                        <TableCell className=" py-3">
                                            {user.phone_number}
                                        </TableCell>
                                        <TableCell className=" py-3">

                                        </TableCell>
                                        <TableCell
                                            className={`py-3 `}
                                        >
                                            <Link
                                                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                                to={`/admin/user/${user.user_name}`}
                                            >
                                                <Eye className="h-4 w-4 mr-1" />
                                                View detail
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </div>
            <div>
                <PanitionC curpage={panition.current} totalPages={panition.total / 100}
                    handleChange={(n) => {
                        navi(`/admin/user?current=${n}`)
                    }} />
            </div>
        </section>
    )
}

export default UserListPage