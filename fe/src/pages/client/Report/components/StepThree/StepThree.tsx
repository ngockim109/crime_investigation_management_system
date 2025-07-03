import { memo } from "react"

const StepThree = (p: { nextStep(n: number): void, cur: number }) => {


    return (
        <div className={p.cur == 3 ? "max-lg:px-2" : "hidden"}>

        </div>

    )
}

export default memo(StepThree)

