
import { ChevronDown, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

export const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true)



    return (
        <aside
            className={
                "transition-all duration-300 bg-blue-100 border-r border-blue-200 flex flex-col w-80 h-full "
            }
        >

            <nav className="flex-1">
                <button
                    className="flex items-center gap-2 w-full cursor-pointer px-4 py-2 font-semibold text-lg text-gray-900 bg-blue-200 rounded"
                >
                    {sidebarOpen ? (
                        <>
                            <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                            <span>Initial Response</span>
                        </>
                    ) : (
                        <ChevronRight className="h-5 w-5 transition-transform duration-200" />
                    )}
                </button>
                <ul className="space-y-2 text-sm my-4">
                    <li className="py-1 pl-10 hover:bg-blue-200 rounded cursor-pointer">
                        Time of dispatching forces
                    </li>
                    <li className="py-1 pl-10 hover:bg-blue-200 rounded cursor-pointer">
                        Time of arrival
                    </li>
                    <li className="py-1 pl-10 hover:bg-blue-200 rounded cursor-pointer">
                        Assigned officers
                    </li>
                    <li className="py-1 pl-10 hover:bg-blue-200 rounded cursor-pointer">
                        Preliminary assessment
                    </li>
                    <li className="py-1 pl-10 hover:bg-blue-200 rounded cursor-pointer">
                        Scene preservation measures
                    </li>
                    <li className="py-1 pl-10 hover:bg-blue-200 rounded cursor-pointer">
                        Medical/rescue support
                    </li>
                </ul>
                <div className="border-t border-blue-200 my-4" />
                <button
                    className="font-semibold text-lg flex items-center gap-2 px-4 py-2 w-full hover:bg-blue-200 rounded cursor-pointer"
                >
                    <ChevronRight className="h-4 w-4" />
                    <span>Scene Information</span>
                </button>
                <button
                    className="font-semibold text-lg flex items-center gap-2 px-4 py-2 w-full hover:bg-blue-200 rounded cursor-pointer"
                >
                    <ChevronRight className="h-4 w-4" />
                    <span>Report Case</span>
                </button>
            </nav>
        </aside>
    )
}


