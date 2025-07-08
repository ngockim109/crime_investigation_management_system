import type { UserFormAdd } from "@/types/user.interface"
import { useState } from "react"
import { Link } from "react-router-dom"
import PositionComponent from "@/pages/admin/user/components/Position"
import ActiveComponent from "@/pages/admin/user/components/Active"
import Alertinput from "@/components/alertinput"
import { isUSPhoneNumber } from "@/utils/isphonenumber"

const UserAddPage = () => {
    const [user, setUser] = useState<UserFormAdd>({
        date_of_birth: "",
        day_attended: "",
        password: "",
        phone_number: "",
        position: "",
        user_name: "",
        zone: "",
        name: "",
        active: ""
    })
    const submitUser = () => {
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
            <div className="w-150 mx-auto mt-5">
                <div className="p-5 bg-[#BFFBFF] rounded-lg space-y-1.5">
                    <div className="grid grid-cols-12 items-center">
                        <div className="col-span-3 font-medium">
                            Phone
                        </div>
                        <div className="col-span-9">
                            <Alertinput alertKey="phone_number" curkey={alertKey} describe="phonenumber is not right fotmat">
                                <input onChange={(v) => {
                                    let text = v.currentTarget.value
                                    setUser({ ...user, phone_number: text })
                                }} type="text" placeholder="Ex 123-456-4566" className="w-full bg-white focus:outline-none py-2 px-1" />
                            </Alertinput>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 items-center">
                        <div className="col-span-3 font-medium">
                            User name
                        </div>
                        <div className="col-span-9">
                            <Alertinput
                                alertKey="user_name"
                                curkey={alertKey} describe="user name should not empty">
                                <input onChange={(v) => {

                                    let text = v.currentTarget.value
                                    setUser({ ...user, user_name: text })
                                }} type="text" placeholder="Ex Ac123456" className="w-full bg-white focus:outline-none py-2 px-1" />
                            </Alertinput>

                        </div>
                    </div>
                    <div className="grid grid-cols-12 items-center">
                        <div className="col-span-3 font-medium">
                            Name
                        </div>
                        <div className="col-span-9">
                            <Alertinput
                                alertKey="name"
                                curkey={alertKey} describe="user name should not empty">
                                <input onChange={(v) => {
                                    let text = v.currentTarget.value
                                    setUser({ ...user, name: text })

                                }} type="text" placeholder="Jame Potter" className="w-full bg-white focus:outline-none py-2 px-1" />

                            </Alertinput>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 items-center">
                        <div className="col-span-3 font-medium">
                            Position
                        </div>
                        <div className="col-span-9">
                            <Alertinput
                                alertKey="position"
                                curkey={alertKey} describe="position should not empty">
                                <PositionComponent curValue={user.position} onChage={(positionValue) => {
                                    setUser({ ...user, position: positionValue })

                                }} />
                            </Alertinput>
                        </div>


                    </div>
                    <div className="grid grid-cols-12 items-center">
                        <div className="col-span-3 font-medium">
                            Day of birth
                        </div>
                        <div className="col-span-9">
                            <Alertinput
                                alertKey="date_of_birth"
                                curkey={alertKey} describe="date_of_birth should not empty">
                                <input onChange={(v) => {
                                    let text = v.currentTarget.value
                                    setUser({ ...user, date_of_birth: text })

                                }} type="date" className="w-full bg-white focus:outline-none py-2 px-1" />
                            </Alertinput>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 items-center">
                        <div className="col-span-3 font-medium">
                            Day attended
                        </div>
                        <div className="col-span-9">
                            <Alertinput
                                alertKey="day_attended"
                                curkey={alertKey} describe="day_attended should not empty">
                                <input onChange={(v) => {
                                    let text = v.currentTarget.value
                                    setUser({ ...user, day_attended: text })

                                }} type="date" className="w-full bg-white focus:outline-none py-2 px-1" />

                            </Alertinput>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 items-center">
                        <div className="col-span-3 font-medium">
                            Password
                        </div>
                        <div className="col-span-9">
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


                    <div className="grid grid-cols-12 items-center">
                        <div className="col-span-3 font-medium">
                            Status
                        </div>
                        <div className="col-span-9">
                            <Alertinput
                                alertKey="active"
                                curkey={alertKey} describe="active should not empty">
                                <ActiveComponent curValue={user.active}
                                    onChage={(activeValue) => {
                                        setUser({ ...user, active: activeValue })

                                    }} />
                            </Alertinput>

                        </div>
                    </div>
                    <div className="grid grid-cols-12 items-center">
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
                                }} type="text" className="w-full bg-white focus:outline-none py-2 px-1" />

                            </Alertinput>

                        </div>
                    </div>
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