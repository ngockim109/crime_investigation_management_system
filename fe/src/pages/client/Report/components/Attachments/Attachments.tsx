import { CloudUpload } from "lucide-react"
import { memo, useState } from "react"

const Attachments = (p: {
  onchange(data: File, url: string): void
  idimage: string
}) => {
  const [url, setUrl] = useState("")
  return (
    <>
      <p className="">Attachments</p>
      <div className="h-80.5 col-span-2 bg-[#EEEEEE] flex justify-center w-full py-5.75 ">
        <label htmlFor={p.idimage}>
          <div className="h-68.75 w-full lg:w-106 bg-white flex justify-center items-center rounded-2xl  border border-dashed border-black">
            <div>
              {url == "" ? (
                <>
                  <div>
                    <CloudUpload className="size-16 mx-auto" />
                  </div>
                  <p className="text-[16px] font-bold mt-3.75 text-center">
                    Drag & drop files or{" "}
                    <span className="text-blue-400">Browse</span>
                  </p>
                  <p className="leading-4.5 text-[12px] mt-1 text-center">
                    Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word,
                    PPT
                  </p>
                </>
              ) : (
                <>
                  <img src={url} className="w-auto h-68.75" alt="" srcSet="" />
                </>
              )}
            </div>
            <input
              onChange={(v) => {
                const files = v.currentTarget.files
                if (files) {
                  const file = files[0]
                  setUrl(URL.createObjectURL(file))
                  const url = URL.createObjectURL(file)
                  p.onchange(file, url)
                }
              }}
              type="file"
              className="hidden"
              id={p.idimage}
            />
          </div>
        </label>
      </div>
    </>
  )
}

export default memo(Attachments)
