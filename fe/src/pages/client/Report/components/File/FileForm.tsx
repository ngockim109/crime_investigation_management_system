import type { attached_file } from "@/types/evidence.interface"
import { X } from "lucide-react"
import { memo } from "react"

const FileForm = (p: { data: attached_file; rm(): void }) => {
  return (
    <>
      {p.data ? (
        <div className="basis-1/2 shrink-0 h-30 pb-2 pr-4.25 grow-0">
          <div className="bg-[#EEEEEE] rounded-2xl flex gap-2 items-center w-full p-4 h-full">
            <img
              src={p.data.file_url}
              className="h-full object-contain w-auto"
              alt=""
            />
            <div className="flex-1">
              <p className="text-[14px]">{p.data.original_name}</p>
            </div>
            <button
              className="text-black cursor-pointer hover:text-blue-500"
              onClick={() => {
                p.rm()
              }}
            >
              <X />
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default memo(FileForm)
