export enum CrimeType {
  THEFT = 'theft',
  ASSAULT = 'assault',
  FRAUD = 'fraud',
  VANDALISM = 'vandalism',
  HARASSMENT = 'harassment',
  WHITE_COLLAR = 'white-collar',
  CYBER_CRIME = 'cyber-crime',
  DRUG_RELATED = 'drug-related',
  PUBLIC_ORDER = 'public-order',
  OTHER = 'other',
}

export enum Severity {
  MINOR = 'minor',
  MODERATE = 'moderate',
  SERIOUS = 'serious',
  CRITICAL = 'critical',
}

export enum ReportStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum RelationIncident {
  VICTIM = 'Victim',
  WITNESS = 'Witness',
  OFFENDER = 'Offender',
  ANONYMOUS = 'Anonymous',
}
