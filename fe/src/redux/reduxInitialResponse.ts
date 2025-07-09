import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { MedicalSupport } from '@/types/medical-support.interface'
import type { PreservationMeasure } from '@/types/scene-preservation.interface'

interface InitialResponseState {
  dispatching_time: string
  arrival_time: string
  preliminary_assessment: string
  case_id: string
  medical_supports: MedicalSupport[]
  preservation_measures: PreservationMeasure[]
}

const initialState: InitialResponseState = {
  dispatching_time: '',
  arrival_time: '',
  preliminary_assessment: '',
  case_id: '',
  medical_supports: [],
  preservation_measures: []
}

const initialResponseSlice = createSlice({
  name: 'initialResponse',
  initialState,
  reducers: {
    setInitialResponseField: (
      state,
      action: PayloadAction<Partial<Omit<InitialResponseState, 'medical_supports' | 'preservation_measures'>>>
    ) => {
      Object.assign(state, action.payload)
    },
    addMedicalSupport: (state, action: PayloadAction<MedicalSupport>) => {
      const existsIndex = state.medical_supports.findIndex(
        s => s.medical_unit_id === action.payload.medical_unit_id
      )
      if (existsIndex !== -1) {
        state.medical_supports[existsIndex] = action.payload
      } else {
        state.medical_supports.push(action.payload)
      }
    },
    addPreservationMeasure: (state, action: PayloadAction<PreservationMeasure>) => {
      const existsIndex = state.preservation_measures.findIndex(
        m => m.preservation_measures_id === action.payload.preservation_measures_id
      )
      if (existsIndex !== -1) {
        state.preservation_measures[existsIndex] = action.payload
      } else {
        state.preservation_measures.push(action.payload)
      }
    },
    deleteMedicalSupport: (state, action: PayloadAction<string>) => {
      state.medical_supports = state.medical_supports.filter(m => m.medical_unit_id !== action.payload)
    },
    deletePreservationMeasure: (state, action: PayloadAction<string>) => {
      state.preservation_measures = state.preservation_measures.filter(p => p.preservation_measures_id !== action.payload)
    },
    resetInitialResponse: () => initialState,

    setMedicalSupports: (state, action: PayloadAction<MedicalSupport[]>) => {
      state.medical_supports = action.payload
    },
    setPreservationMeasures: (state, action: PayloadAction<PreservationMeasure[]>) => {
      state.preservation_measures = action.payload
    },

  }
})

export const {
  setInitialResponseField,
  addMedicalSupport,
  addPreservationMeasure,
  deleteMedicalSupport,
  deletePreservationMeasure,
  resetInitialResponse,
  setMedicalSupports,
  setPreservationMeasures
} = initialResponseSlice.actions

export default initialResponseSlice.reducer
