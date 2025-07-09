import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ACTIVE = [
    "Inactivate", "Activate"
];

const ActiveComponent = (p: { onChage(activeValue: string): void, curValue: string }) => {

    const selectPosition = ACTIVE.map((v) => {
        return <SelectItem className="text-[14px] !w-full py-3.25 px-6.75 !bg-white" value={v}>{v}</SelectItem>
    })

    return (
        <Select onValueChange={(v) => {
            p.onChage(v)
        }} >
            <SelectTrigger className="!w-full  py-3.25 !h-12.5 px-6.75 text-[14px] rounded-[8px] !bg-white">
                <SelectValue placeholder={p.curValue == "" ? "Select an Activate" : p.curValue} />
            </SelectTrigger>
            <SelectContent>
                {selectPosition}
            </SelectContent>
        </Select>

    )
}

export default ActiveComponent