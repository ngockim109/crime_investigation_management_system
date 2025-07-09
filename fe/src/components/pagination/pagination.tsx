
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import type { JSX } from "react"

interface PaginationPropsC {
    handleChange: (page: number) => void
    curpage: number
    totalPages: number
}

const PanitionC = ({ handleChange, curpage, totalPages }: PaginationPropsC) => {

    const pre: JSX.Element[] = []
    const next: JSX.Element[] = []

    const className = "hover:bg-blue-400 hover:text-white size-9 flex justify-center items-center bg-[#eee] cursor-pointer "
    const active = "size-9 bg-blue-400 text-white cursor-pointer "
    for (let i = curpage - 1; i > 0 && i > curpage - 6; i--) {
        pre.push(<button onClick={() => handleChange(i)} className={className}>
            {i}
        </button>)
    }

    for (let i = curpage + 1; i < curpage + 6 && i < totalPages + 1; i++) {
        next.push(<button onClick={() => handleChange(i)} className={className}>
            {i}
        </button>)
    }
    return (
        <div className="mt-5">
            <div className="flex items-center space-x-0.5">
                {curpage > 1 ? <button onClick={() => handleChange(curpage - 1)}
                    className={className}>
                    <ChevronLeft />
                </button> : <></>}
                {curpage - 10 > 0 ? <button onClick={() => handleChange(curpage - 6)}
                    className={className}>
                    <ChevronsLeft />
                </button> : <></>}
                {pre.reverse()}
                <button className={active}>
                    {curpage}
                </button>
                {next}
                {curpage + 10 <= totalPages ?
                    <button onClick={() => handleChange(curpage - 6)}
                        className={className}>
                        <ChevronsRight />
                    </button> : <></>}

                {curpage < totalPages - 1 ? <button onClick={() => handleChange(curpage + 1)}
                    className={className}>
                    <ChevronRight />
                </button> : <></>}
            </div>
        </div >
    )
}

export default PanitionC