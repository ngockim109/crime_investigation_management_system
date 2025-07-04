import { FileChartColumnIncreasing, X } from "lucide-react"
import { memo } from "react"

const FileForm = () => {
    return <>
        <div className="basis-1/2 shrink-0 h-18  pr-4.25 grow-0">
            <div className="bg-[#EEEEEE] flex gap-2 items-center w-full p-4 h-full">
                <FileChartColumnIncreasing />
                <div className="flex-1">
                    <p className="text-[14px]">File Title.pdf</p>
                    <p className="text-[12px]">313 KB . 31 Aug, 2022</p>
                </div>
                <X />
            </div>
        </div>
    </>
}

export default memo(FileForm)