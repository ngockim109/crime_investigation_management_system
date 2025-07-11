import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const POSITION = [
  'patrol_officer',
  'review_officer',
  'investigator',
  'chief_officer',
  'forensic_specialist',
  'financial_analyst'
];

const roles = [
  { role_id: "e93689c7-413c-461e-9ecb-b51014f883f2", description: "censor" },
  { role_id: "b8acaaa2-cb30-45bb-a8a1-185de3c7567b", description: "investigator" },
  { role_id: "dceb0bb0-9e64-404b-b4ec-b23677a10172", description: "police_chief" },
  { role_id: "5931334b-aaaf-4f2e-bf28-745d5a44f31b", description: "forensic_officer" },
  { role_id: "cf80dacd-4893-4169-a004-dbf094a71a1f", description: "financial_investigator" },
];

const PositionComponent = (p: { onChage(positionValue: string): void, curValue: string, all?: boolean }) => {

  const selectPosition = roles.map((v) => {
    return <SelectItem className="text-[14px] !w-full py-3.25 px-6.75 !bg-white" value={v.role_id}>{v.description}</SelectItem>
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