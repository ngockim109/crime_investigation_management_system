export enum CrimeType {
  AGAINST_PERSONS = 'against_persons',
  AGAINST_PROPERTY = 'against_property',
  WHITE_COLLAR = 'white-collar',
  CYBER_CRIME = 'cyber-crime',
  DRUG_RELATED = 'drug-related',
  PUBLIC_ORDER = 'public-order',
}

export enum SeverityType {
  MINOR = 'minor',
  MODERATE = 'moderate',
  SERIOUS = 'serious',
  CRITICAL = 'critical',
}

export enum ReportStatusType {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum RelationIncidentType {
  VICTIM = 'victim',
  WITNESS = 'witness',
  OFFENDER = 'offender',
  ANONYMOUS = 'anonymous',
}
