import type { CaseStatusType } from "@/enum/case.enum"

export interface CaseData {
  caseId: string
  typeOfCrime: string
  levelOfSeverity: string
  date: string
  receivingUnit: string
  location: string
  status: CaseStatusType
}
