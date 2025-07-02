import { memo } from "react"

const Step = (p: { cur: number, onclick(n: number): void }) => {
    return <section className="max-w-142.25  mx-auto">
        <div className="flex  items-center">
            <button onClick={() => {
                p.onclick(1)
            }} className=" relative items-center">
                <div className={`${p.cur == 1 ? "bg-black text-white" : "bg-white text-black"} size-15.5 cursor-pointer rounded-full border-1 border-black flex justify-center items-center`}>
                    <p className="text-2xl ">
                        1
                    </p>
                </div>
                <p className="text-[20px] absolute text-center -bottom-10 left-0 font-semibold">
                    Step 1
                </p>
            </button>
            <hr className="flex-1" />
            <button onClick={() => {
                p.onclick(2)
            }} className="relative items-center">
                <div className={`${p.cur == 2 ? "bg-black text-white" : "bg-white text-black"} size-15.5 cursor-pointer rounded-full border-1 border-black flex justify-center items-center`}>
                    <p className="text-2xl ">
                        2
                    </p>
                </div>
                <p className="text-[20px] absolute text-center -bottom-10 left-0  font-semibold">
                    Step 2
                </p>
            </button>
            <hr className="flex-1" />
            <div className="relative items-center">
                <div className="size-15.5 cursor-pointer rounded-full border-1 border-black flex justify-center items-center">
                    <p className="text-2xl ">
                        3
                    </p>
                </div>
                <p className="text-[20px] absolute text-center -bottom-10 left-0  font-semibold">
                    Step 3
                </p>
            </div>
        </div>
    </section>
}

export default memo(Step)