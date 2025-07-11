import type { UserFormAdd } from "@/types/user.interface"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import PositionComponent from "@/pages/admin/user/components/Position"
import ActiveComponent from "@/pages/admin/user/components/Active"
import Alertinput from "@/components/alertinput"
import { isUSPhoneNumber } from "@/utils/isphonenumber"
import { userApi } from "@/api/user"
import { toast } from "react-toastify"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "@/App"
import { Calendar } from "@/components/ui/calendar"
import Calendar22 from "@/components/calendar"

const UserAddPage = () => {
    let navigate = useNavigate();
    const mutation = useMutation({

        mutationFn: (user: UserFormAdd) => {
            return userApi.createUser(user)
        },
        onError: () => {
            toast.error("Add user failure")
        },
        onSuccess: () => {
            toast.success("Add user successfully")
            queryClient.invalidateQueries({ queryKey: ["users"] })
            navigate("/admin/user")
        }
    })
    const [user, setUser] = useState<UserFormAdd>({
        date_of_birth: "",
        day_attended: "",
        password: "",
        phone_number: "",
        role_id: "",
        user_name: "",
        zone: "",
        full_name: "",
        status: ""
    })
    const submitUser = async () => {
        for (const key in user) {
            const element = (user as any)[key] as string
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
                Add police officer
            </h3>
            <div className=" mx-auto mt-5">
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
                                <Alertinput
                                    alertKey="user_name"
                                    curkey={alertKey} describe="user name should not empty">
                                    <input onChange={(v) => {

                                        let text = v.currentTarget.value
                                        setUser({ ...user, user_name: text })
                                    }} type="text" value={user.user_name} placeholder="Ex Ac123456" className="w-full bg-white focus:outline-none py-2 px-1" />
                                </Alertinput>

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

                                    }} type="text" value={user.full_name} placeholder="Jame Potter" className="w-full bg-white focus:outline-none py-2 px-1" />

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
                                    <PositionComponent curValue={user.role_id} onChage={(positionValue) => {
                                        setUser({ ...user, role_id: positionValue })

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
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="col-span-1 font-medium">
                            <div className="flex items-center gap-3">
                                <div className="w-max">
                                    <p>Day of birth</p>
                                </div>
                                <div className="flex-1">
                                    <Alertinput
                                        alertKey="date_of_birth"
                                        curkey={alertKey} describe="date_of_birth should not empty">
                                        <Calendar22 disable className=" w-full" onchage={(d) => {
                                            if (d == undefined) {
                                                return
                                            }
                                            setUser({ ...user, date_of_birth: d?.toUTCString() })
                                        }} value={new Date(user.date_of_birth)} />
                                    </Alertinput>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 font-medium">
                            <div className="flex items-center gap-3">
                                <div className="w-max"> Day attended</div>
                                <div className="flex-1">
                                    <Alertinput
                                        alertKey="day_attended"
                                        curkey={alertKey} describe="day attended should not empty">
                                        <Calendar22 className=" w-full" onchage={(d) => {
                                            if (d == undefined) {
                                                return
                                            }
                                            setUser({ ...user, day_attended: d?.toUTCString() })
                                        }} value={new Date(user.day_attended)} />
                                    </Alertinput>
                                </div>
                            </div>
                        </div>

                    </section>
                </div>
                <div className=" float-left mt-3.75">
                    <button onClick={() => submitUser()} className="text-sm px-3.75 py-2 bg-gray-300 hover:bg-gray-200  cursor-pointer rounded-sm">
                        Save
                    </button>
                </div>
            </div>
        </section>
    )
}

export default UserAddPage