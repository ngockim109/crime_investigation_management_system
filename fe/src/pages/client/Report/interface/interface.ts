export interface stepData {
    reporter_fullname: string
    reporter_email: string,
    reporter_phonenumber: string
    address: string
    typeReport: string,
    time_occurrence: string
    description_incident: string
    relationshipIncident: string
    crimeType: string,
    case_location: string
    severity: string
}
export interface relevantParties {
    full_name: string
    attachments_url: string,
    nationality: string
    statement: string
    gender: string
    type_relevant: string


}
export interface initialEvidence {
    type_evidence: string,
    description: string
    attackment: string,
    current_location: string
}





// {
//   "type_crime": "Cyber Crimes",
//   "severity": "Moderate",
//   "time_occurrence": "2025-06-30T14:00:00Z",
//   "case_location": "District 1, Ho Chi Minh City",
//   "relation_incident": "Witness",
//   "description_incident": "A suspected cyber attack at a bank.",
//   "address": "123 Le Loi, District 1",
//   "officer_approve_id": 1,
//   "reporter_fullname": "Nguyen Van A",
//   "reporter_email": "nguyenvana@example.com",
//   "reporter_phonenumber": "0901234567",
//   "relevant_parties": [
//     {
//       "full_name": "Tran Van B",
//       "type_relevant": "witness",
//       "gender": "male",
//       "nationality": "Vietnamese",
//       "statement": "I saw the suspect using a suspicious device.",
//       "attachments_url": "https://example.com/file1.png"
//     },
//     {
//       "full_name": "Le Thi C",
//       "type_relevant": "victim",
//       "gender": "female",
//       "nationality": "Vietnamese",
//       "statement": "My personal data was stolen.",
//       "attachments_url": "https://example.com/file2.png"
//     }
//   ]
// }