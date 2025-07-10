// types/medical-support.interface.ts

export interface FileAttachment {
  file_url: string
  original_name: string
  public_id: string
  resource_type: string
}

export interface MedicalSupport {
  medical_supports_id: string
  medical_unit_id: string
  support_type: string
  personnel_assigned: string
  time_of_arrival: string
  location_assigned: string
  remarks: string
  created_by: string
  scene_sketch_file: FileAttachment[]
}

export interface DataCreateMedicalSupport {
  medical_unit_id: string
  support_type: string
  personnel_assigned: string
  time_of_arrival: string
  location_assigned: string
  remarks: string
  scene_sketch_file: FileAttachment[]
  initial_responses_id: string
}


export interface DataMedicalSupport {
  medical_unit_id: string
  support_type: string
  personnel_assigned: string
  time_of_arrival: string
  location_assigned: string
  remarks: string
  scene_sketch_file: FileAttachment[]
}