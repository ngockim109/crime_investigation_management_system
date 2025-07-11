import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { setData } from "@/redux/reduxReport"

const StepOne = (p: { nextStep(n: number): void; cur: number }) => {
  const data = useSelector((state: RootState) => state.report.data)
  const dispath = useDispatch()
  const relationshipIncident = ["Victim", "Witness", "Offender", "Anonymous"]
  const rIcom = relationshipIncident.map((v) => {
    return (
      <>
        <label htmlFor={v} className="flex mt-6.25 items-center space-x-3.75">
          <input
            id={v}
            onChange={() => {
              dispath(
                setData({
                  ...data,
                  relation_incident: v,
                })
              )
            }}
            type="radio"
            name="relationshipIncident"
            className="size-5"
          />
          <p>{v}</p>
        </label>
      </>
    )
  })

  return (
    <div className={p.cur == 1 ? "" : "hidden"}>
      <div className="lg:grid lg:grid-cols-2 gap-x-15 mb-25 gap-y-7.5">
        <div className="flex flex-col text-[20px]  space-y-3.25">
          <label htmlFor="fullname">
            <p className="">
              Full name <span className="text-red-500 ">*</span>
            </p>
          </label>
          <input
            onChange={(v) => {
              const text = v.currentTarget.value
              dispath(
                setData({
                  ...data,
                  reporter_fullname: text,
                })
              )
            }}
            type="text"
            id="fullname"
            className="max-w-95 px-2 bg-[#EEEEEE] rounded-[8px] h-12.5"
          />
        </div>
        <div className="flex flex-col text-[20px] space-y-3.25">
          <label htmlFor="email">
            <p className="">
              Email <span className="text-red-500 ">*</span>
            </p>
          </label>
          <input
            onChange={(v) => {
              const text = v.currentTarget.value
              dispath(
                setData({
                  ...data,
                  reporter_email: text,
                })
              )
            }}
            type="email"
            value={data.reporter_email}
            id="email"
            className="max-w-95 px-2 bg-[#EEEEEE] rounded-[8px] h-12.5"
          />
        </div>
        <div className="flex flex-col text-[20px] space-y-3.25">
          <label htmlFor="phonenumber">
            <p className="">
              Phone number <span className="text-red-500 ">*</span>
            </p>
          </label>
          <input
            onChange={(v) => {
              const text = v.currentTarget.value
              dispath(
                setData({
                  ...data,
                  reporter_phonenumber: text,
                })
              )
            }}
            type="tel"
            value={data.reporter_phonenumber}
            id="phonenumber"
            className="max-w-95 px-2 bg-[#EEEEEE] rounded-[8px] h-12.5"
          />
        </div>
        <div className="flex flex-col text-[20px] space-y-3.25">
          <label htmlFor="Address">
            <p className="">
              Address <span className="text-red-500 ">*</span>
            </p>
          </label>
          <input
            onChange={(v) => {
              const text = v.currentTarget.value
              dispath(
                setData({
                  ...data,
                  address: text,
                })
              )
            }}
            type="text"
            value={data.address}
            id="Address"
            className="max-w-95 px-2 bg-[#EEEEEE] rounded-[8px] h-12.5"
          />
        </div>
        <div className="flex flex-col text-[20px] mb-4 space-y-3.25">
          <label htmlFor="">
            <p className="">
              Relationship to the incident{" "}
              <span className="text-red-500 ">*</span>
            </p>
          </label>
          <div className="flex flex-col pl-12">{rIcom}</div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-end ">
          <button
            onClick={() => {
              p.nextStep(2)
            }}
            className="bg-black text-white rounded-[8px] cursor-pointer w-40 h-12.5"
          >
            <p className="text-[16px] font-semibold"> Next</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default StepOne
