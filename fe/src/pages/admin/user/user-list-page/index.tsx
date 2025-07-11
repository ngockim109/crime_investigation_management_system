import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Funnel, Search, Trash } from "lucide-react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { userApi } from "@/api/user"
import { useQuery } from "@tanstack/react-query"
import PanitionC from "@/components/pagination/pagination"
import PositionComponent from "../components/Position"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const UserListPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const current = parseInt(searchParams.get("currentPage") || 1 + "")
    const position = searchParams.get("position") || ""
    const [full_name, setFullname] = useState("")
    const navi = useNavigate()
    const { isPending, isError, data, error } = useQuery({
        queryKey: ["users", [{ current: current, position: position }]],
        queryFn: () => userApi.getAllUsersFilters({ currentPage: current, position: position }),
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
            <div className="py-3.5">
                <section className="flex text-sm space-x-4 items-center">
                    <Funnel size={14} />
                    <div className="w-60">
                        <PositionComponent curValue={position} onChage={(positionValue) => {
                            navigate(`/admin/user?position=${positionValue}`)
                        }} />
                    </div>
                    <Button onClick={() => {
                        navigate(`/admin/user`)
                    }} type="button" variant="outline">
                        <Trash></Trash>
                    </Button>
                </section>
                <section>
                    <div className="flex w-full mt-3 max-w-sm items-center gap-2">
                        <Input
                            onChange={(v) => {
                                const text = v.currentTarget.value
                                setFullname(text)
                            }}
                            type="text"
                            placeholder="fullname" />
                        <Button onClick={() => {
                            navigate(`/admin/user?full_name=${full_name}`)
                        }} type="submit" variant="outline">
                            <Search></Search>
                        </Button>
                    </div>
                </section>
            </div>
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
                            <TableHead >PhoneNumber</TableHead>
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
                                            {user?.user_name}
                                        </TableCell>
                                        <TableCell className=" py-3">
                                            {user?.full_name}
                                        </TableCell>
                                        <TableCell className=" py-3">
                                            {user.role?.description}
                                        </TableCell>
                                        <TableCell className=" py-3">
                                            {user?.phone_number}
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