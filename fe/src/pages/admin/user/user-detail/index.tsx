import type { UserFormEdit } from "@/types/user.interface"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import PositionComponent from "@/pages/admin/user/components/Position"
import ActiveComponent from "@/pages/admin/user/components/Active"
import Alertinput from "@/components/alertinput"
import { isUSPhoneNumber } from "@/utils/isphonenumber"
import { useMutation, useQuery } from "@tanstack/react-query"
import { userApi } from "@/api/user"
import { Calendar } from "@/components/ui/calendar"
import { toast } from "react-toastify"
import { queryClient } from "@/App"

const UserDetail = () => {
    let navigate = useNavigate();
    let { user_name } = useParams();
    const mutation = useMutation({
        mutationFn: (user: UserFormEdit) => {
            return userApi.updateUser(user, user_name || "")
        },
        onError: () => {
            toast.error(`Add user ${user_name} failure`)
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"]
            })
            toast.success(`Add user ${user_name} successfully`)
            navigate("/admin/user")

        }
    })
    const [user, setUser] = useState<UserFormEdit>({
        date_of_birth: "",
        day_attended: "",
        password: "",
        phone_number: "",
        position: "",

        zone: "",
        full_name: "",
        status: ""
    })
    const { isLoading, data } = useQuery({
        queryKey: ["users", user_name || ""],
        queryFn: () => userApi.getUserByUsername(user_name),
        staleTime: 1000 * 60 * 5,
    })
    useEffect(() => {
        let g = data?.data
        console.log("fff");

        if (g) {
            setUser({
                date_of_birth: g.date_of_birth,
                day_attended: g.day_attended,
                password: g.password,
                phone_number: g.phone_number,
                position: g.position,

                zone: g.zone,
                full_name: g.full_name,
                status: g.status
            })
        }
        return () => {
        };
    }, [data]);

    const submitUser = async () => {
        console.log("submitUser");

        for (const key in user) {
            const element = (user as any)[key] as string
            if (element == "user_name") {
                continue
            }
            if (element.length == 0) {
                setAlertKey(key)
                setTimeout(() => {
                    setAlertKey("")
                }, 3000);
                return
            }
            if (!isUSPhoneNumber(user.phone_number)) {
                setAlertKey("phone_number")
                setTimeout(() => {
                    setAlertKey("")
                }, 3000);
                return
            }

        }
        try {
            mutation.mutate(user)

        } catch (error) {
            toast.error(`Add user ${user_name} failure`)
        }
    }
    const [alertKey, setAlertKey] = useState("")
    return (
        <section>
            <h3 className="text-center text-4xl  mb-4">
                <div className=" float-left">
                    <Link to={"/admin/user"}
                        className="text-sm px-3.75 py-2 bg-gray-300 hover:bg-gray-200  cursor-pointer rounded-sm">
                        Back
                    </Link>
                </div>
                Edit police officer
            </h3>
            <div className="mx-auto mt-5">

                {
                    !isLoading ?
                        <>

                            <div className="shadow-2xl bg-[#bffbff68] p-5 space-y-3">
                                <section className="  grid grid-cols-1 lg:grid-cols-2 gap-3 rounded-lg space-y-1.5">
                                    <div className="grid grid-cols-1 items-center">
                                        <div className="col-span-1 font-medium">
                                            Phone
                                        </div>
                                        <div className="col-span-1 ">
                                            <Alertinput alertKey="phone_number" curkey={alertKey} describe="phonenumber is not right fotmat">
                                                <input onChange={(v) => {
                                                    let text = v.currentTarget.value
                                                    setUser({ ...user, phone_number: text })
                                                }} type="text" value={user.phone_number} placeholder="Ex 123-456-4566" className="w-full bg-white focus:outline-none py-2 px-1" />
                                            </Alertinput>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 items-center">
                                        <div className="col-span-1 font-medium">
                                            User name
                                        </div>
                                        <div className="col-span-1">
                                            <div className="w-full bg-gray-400 py-2 px-1">
                                                <span className="">{user_name}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 items-center">
                                        <div className="col-span-1 font-medium">
                                            Fullname
                                        </div>
                                        <div className="col-span-1">
                                            <Alertinput
                                                alertKey="full_name"
                                                curkey={alertKey} describe="user name should not empty">
                                                <input onChange={(v) => {
                                                    let text = v.currentTarget.value
                                                    setUser({ ...user, full_name: text })

                                                }} type="text" value={user.full_name}
                                                    placeholder="Jame Potter"
                                                    className="w-full bg-white focus:outline-none py-2 px-1" />

                                            </Alertinput>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 items-center">
                                        <div className="col-span-1 font-medium">
                                            Password
                                        </div>
                                        <div className="col-span-1">
                                            <Alertinput
                                                alertKey="password"
                                                curkey={alertKey} describe="password should not empty">
                                                <input onChange={(v) => {
                                                    let text = v.currentTarget.value
                                                    setUser({ ...user, password: text })

                                                }} type="text" className="w-full bg-white focus:outline-none py-2 px-1" />

                                            </Alertinput>
                                        </div>
                                    </div>
                                </section>
                                <section className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                                    <div className="grid grid-cols-1 items-center">
                                        <div className="col-span-1 font-medium">
                                            Position
                                        </div>
                                        <div className="col-span-1">
                                            <Alertinput
                                                alertKey="position"
                                                curkey={alertKey} describe="position should not empty">
                                                <PositionComponent curValue={user.position} onChage={(positionValue) => {
                                                    setUser({ ...user, position: positionValue })

                                                }} />
                                            </Alertinput>
                                        </div>


                                    </div>

                                    <div className="grid grid-cols-1 items-center">
                                        <div className="col-span-1 font-medium">
                                            Status
                                        </div>
                                        <div className="col-span-1">
                                            <Alertinput
                                                alertKey="status"
                                                curkey={alertKey} describe="active should not empty">
                                                <ActiveComponent curValue={user.status}
                                                    onChage={(activeValue) => {
                                                        setUser({ ...user, status: activeValue })

                                                    }} />
                                            </Alertinput>

                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 items-center">
                                        <div className="col-span-3 font-medium">
                                            Zone
                                        </div>
                                        <div className="col-span-9">
                                            <Alertinput
                                                alertKey="zone"
                                                curkey={alertKey} describe="zone should not empty">
                                                <input onChange={(v) => {
                                                    let text = v.currentTarget.value
                                                    setUser({ ...user, zone: text })
                                                }} type="text" value={user.zone} className="w-full bg-white focus:outline-none py-2 px-1" />

                                            </Alertinput>

                                        </div>
                                    </div>
                                </section>
                                <section className="grid grid-cols-1 lg:grid-cols-2">
                                    <div className="grid grid-cols-1 items-center">
                                        <div className="col-span-1 font-medium">
                                            Day of birth
                                        </div>
                                        <div className="col-span-1">
                                            <Alertinput
                                                alertKey="date_of_birth"
                                                curkey={alertKey} describe="date_of_birth should not empty">
                                                <Calendar
                                                    mode="single"
                                                    selected={new Date(user.date_of_birth)}
                                                    onSelect={(d) => {
                                                        if (d == undefined) {
                                                            return
                                                        }
                                                        setUser({ ...user, date_of_birth: d?.toUTCString() })
                                                    }}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    captionLayout="dropdown"
                                                />
                                            </Alertinput>

                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 items-center">
                                        <div className="col-span-1 font-medium">
                                            Day attended
                                        </div>
                                        <div className="col-span-1">
                                            <Alertinput
                                                alertKey="day_attended"
                                                curkey={alertKey} describe="day_attended should not empty">
                                                <Calendar
                                                    mode="single"
                                                    selected={new Date(user.day_attended)}
                                                    onSelect={(d) => {
                                                        if (d == undefined) {
                                                            return
                                                        }
                                                        setUser({ ...user, day_attended: d?.toUTCString() })
                                                    }}
                                                    captionLayout="dropdown"
                                                />
                                            </Alertinput>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className=" float-left mt-3.75">
                                <button onClick={() => {
                                    submitUser()
                                }} className="text-sm px-3.75 py-2 bg-gray-300 hover:bg-gray-200  cursor-pointer rounded-sm">
                                    Save
                                </button>
                            </div>

                        </> : <>                        </>
                }
            </div>
        </section>
    )
}

export default UserDetail