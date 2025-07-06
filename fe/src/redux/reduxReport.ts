
import type { Evidence } from "@/types/evidence.interface"
import type { Party } from "@/types/party.interface"
import type { ReportData } from "@/types/report.interface"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface ReportState {
    data: ReportData,
    parties: Party[],
    evidences: Evidence[]
}

const initialState: ReportState = {
    data: {
        address: "",
        case_location: "",
        crime_type: "",
        description: "",
        relation_incident: "",
        reporter_email: "",
        reporter_fullname: "",
        reporter_phonenumber: "",
        severity: "",
        time_occurrence: "",

    },
    evidences: [],
    parties: []
}

const reduxReport = createSlice({
    name: "report",
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<ReportData>) => {
            state.data = action.payload
        },
        addInitialEvidence: (state, action: PayloadAction<Evidence>) => {
            state.evidences.push(action.payload)
        },
        removeInitialEvidence: (state, action: PayloadAction<number>) => {
            state.evidences = state.evidences.filter((_, i) => {
                return i != action.payload
            })
        },
        addRelevantParties: (state, action: PayloadAction<Party>) => {
            state.parties.push(action.payload)
        },
        removeRelevantParties: (state, action: PayloadAction<number>) => {
            state.parties = state.parties.filter((_, i) => {
                return i != action.payload
            })
        },
        resetForm: (state) => {
            state.data = {
                address: "",
                case_location: "",
                crime_type: "",
                description: "",
                relation_incident: "",
                reporter_email: state.data.reporter_email,
                reporter_fullname: "",
                reporter_phonenumber: "",
                severity: "",
                time_occurrence: "",
            }
            state.parties = []
            state.evidences = []
        }
    },
})

export const {
    addInitialEvidence,
    addRelevantParties,
    removeInitialEvidence,
    removeRelevantParties,
    setData, resetForm } = reduxReport.actions
export default reduxReport.reducer
