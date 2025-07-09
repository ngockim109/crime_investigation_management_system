import type { MedicalSupport } from "@/types/medical-support.interface"
import type { DataPreservationMeasure, PreservationMeasure } from "@/types/scene-preservation.interface"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import moment from "moment";

function convertTimeToDate(timeString: string): Date | null {
  if (!timeString) return null;

  // Parse time với moment và chuyển thành Date
  return moment(timeString, 'h:mm A').toDate();
}

interface InitialResponseState {
  dispatching_time: string
  arrival_time: Date | null
  preliminary_assessment: string
  case_id: string
  preservation_measures: DataPreservationMeasure[]
  medical_supports: MedicalSupport[]
}

const initialState: InitialResponseState = {
  dispatching_time: "",
  arrival_time: null,
  preliminary_assessment: "",
  case_id: "",
  preservation_measures: [],
  medical_supports: [],
}

const reduxInitialResponse = createSlice({
  name: "initialResponse",
  initialState,
  reducers: {
    setInitialResponse: (
      state,
      action: PayloadAction<InitialResponseState>
    ) => {
      return action.payload
    },
    updateDispatchingTime: (state, action: PayloadAction<string>) => {
      state.dispatching_time = action.payload
    },
    updateArrivalTime: (state, action: PayloadAction<string>) => {
      state.arrival_time = convertTimeToDate(action.payload)
    },
    updatePreliminaryAssessment: (state, action: PayloadAction<string>) => {
      state.preliminary_assessment = action.payload
    },
    updateCaseId: (state, action: PayloadAction<string>) => {
      state.case_id = action.payload
    },
    addPreservationMeasure: (
      state,
      action: PayloadAction<PreservationMeasure>
    ) => {
      state.preservation_measures.push(action.payload)
    },
    removePreservationMeasure: (state, action: PayloadAction<number>) => {
      state.preservation_measures.splice(action.payload, 1)
    },
    addMedicalSupport: (state, action: PayloadAction<MedicalSupport>) => {
      state.medical_supports.push(action.payload)
    },
    removeMedicalSupport: (state, action: PayloadAction<number>) => {
      state.medical_supports.splice(action.payload, 1)
    },
    resetInitialResponse: () => initialState,
  },
})

export const {
  setInitialResponse,
  updateDispatchingTime,
  updateArrivalTime,
  updatePreliminaryAssessment,
  updateCaseId,
  addPreservationMeasure,
  removePreservationMeasure,
  addMedicalSupport,
  removeMedicalSupport,
  resetInitialResponse,
} = reduxInitialResponse.actions

export default reduxInitialResponse.reducer
