import { IMedicalSupportDetailDto } from "./medical-support.interface";
import { IPreservationMeasureDetailDto } from "./preservation-measure.interface";

export interface InitialResponseDetail {
  initial_responses_id: string;
  dispatching_time: Date;
  arrival_time: Date;
  preliminary_assessment: string;
  case_id: string;
  preservation_measures: IPreservationMeasureDetailDto[],
  medical_supports: IMedicalSupportDetailDto[]
}
