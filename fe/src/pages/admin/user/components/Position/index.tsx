import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const POSITION = [
  'patrol_officer',
  'review_officer',
  'investigator',
  'chief_officer',
  'forensic_specialist',
  'financial_analyst'
];

const PositionComponent = (p: { onChage(positionValue: string): void, curValue: string }) => {

  const selectPosition = POSITION.map((v) => {
    return <SelectItem className="text-[14px] !w-full py-3.25 px-6.75 !bg-white" value={v}>{v}</SelectItem>
  })
  
  return (
    <Select onValueChange={(v) => {
      p.onChage(v)
    }}  >
      <SelectTrigger className="!w-full  py-3.25 !h-12.5 px-6.75 text-[14px] rounded-[8px] !bg-white">
        <SelectValue placeholder={p.curValue == "" ? "Select an position" : p.curValue} />
      </SelectTrigger>
      <SelectContent>
        {selectPosition}
      </SelectContent>
    </Select>

  )
}

export default PositionComponent