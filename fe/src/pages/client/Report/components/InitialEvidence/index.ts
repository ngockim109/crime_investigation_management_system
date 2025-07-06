export { default } from "./InitialEvidenceTable"
import InitialEvidenceFormC from "./InitialEvidenceForm"


export const severities = [
    { key: 'MINOR', value: 'minor' },
    { key: 'MODERATE', value: 'moderate' },
    { key: 'SERIOUS', value: 'serious' },
    { key: 'CRITICAL', value: 'critical' },
];
export const evidenceType = [
    'physical-evidence',
    'biological-evidence',
    'trace-evidence',
    'documentary-evidence',
    'digital-evidence',
];


export const InitialEvidenceForm = InitialEvidenceFormC