const BASE_PREFIX = "/admin"
const BASE_CASE_PREFIX = `${BASE_PREFIX}/case/:caseId`

export const ROUTES = {
  RESPONSE_MANAGEMENT: `${BASE_CASE_PREFIX}/response-information/response-management`,
  DISPATCH_TIME: `${BASE_CASE_PREFIX}/response-information/dispatch-time`,
  ARRIVAL_TIME: `${BASE_CASE_PREFIX}/response-information/arrival-time`,
  ASSIGNED_OFFICERS: `${BASE_CASE_PREFIX}/response-information/assigned-officers`,
  PRELIMINARY_ASSESSMENT: `${BASE_CASE_PREFIX}/response-information/preliminary-assessment`,
  PRESERVATION_MEASURES: `${BASE_CASE_PREFIX}/response-information/preservation-measures`,
  MEDICAL_RESCUE_INFO: `${BASE_CASE_PREFIX}/response-information/medical-rescue-info`,

  SCENE_MANAGEMENT: `${BASE_CASE_PREFIX}/scene-information/scene-management`,
  INITIAL_STATEMENTS: `${BASE_CASE_PREFIX}/scene-information/initial-statements`,
  IMAGES_VIDEOS: `${BASE_CASE_PREFIX}/scene-information/scene-medias`,
  PHYSICAL_EVIDENCE: `${BASE_CASE_PREFIX}/scene-information/preliminary-physical-evidence`,
  INITIAL_STATEMENTS_PARITES: `${BASE_CASE_PREFIX}/scene-information/initial-statements/parties`,

  REPORT_SUMMARY: `${BASE_CASE_PREFIX}/report-summary/summary`,
}

export const withRouteParams = {
  add: (baseRoute: string) => `${baseRoute}/add`,
  update: (baseRoute: string, id: string | number = ":id") =>
    `${baseRoute}/update/${id}`,
  detail: (baseRoute: string, id: string | number = ":id") =>
    `${baseRoute}/${id}`,
}
