import type { initialEvidence, relevantParties, stepData } from "@/pages/client/Report/interface/interface"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface ReportState {
    data: stepData,
    relevantPartie: relevantParties[],
    initialEvidence: initialEvidence[]
}

const initialState: ReportState = {
    data: {
        relationshipIncident: "",
        crimeType: "",
        address: "",
        case_location: "",
        description_incident: "",
        reporter_email: "",
        reporter_fullname: "",
        reporter_phonenumber: "",
        severity: "",
        time_occurrence: "",
        typeReport: ""
    },
    initialEvidence: [],
    relevantPartie: []
}

const reduxReport = createSlice({
    name: "report",
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<stepData>) => {
            state.data = action.payload
        },
        addInitialEvidence: (state, action: PayloadAction<initialEvidence>) => {
            state.initialEvidence.push(action.payload)
        },
        removeInitialEvidence: (state, action: PayloadAction<number>) => {
            state.initialEvidence = state.initialEvidence.filter((_, i) => {
                return i != action.payload
            })
        },
        addRelevantParties: (state, action: PayloadAction<relevantParties>) => {
            state.relevantPartie.push(action.payload)
        },
        removeRelevantParties: (state, action: PayloadAction<number>) => {
            state.relevantPartie = state.relevantPartie.filter((_, i) => {
                return i != action.payload
            })
        }
    },
})

export const {
    addInitialEvidence,
    addRelevantParties,
    removeInitialEvidence,
    removeRelevantParties,
    setData } = reduxReport.actions
export default reduxReport.reducer
